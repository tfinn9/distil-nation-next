"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "hello@distil-nation.co.nz";

async function sendNotificationEmail(submission: {
  spirit_name: string;
  distillery_name: string | null;
  category: string | null;
  submitted_email: string | null;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("RESEND_API_KEY not set — skipping email notification");
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Distil-Nation <notifications@distil-nation.co.nz>",
      to: ADMIN_EMAIL,
      subject: `New spirit submission: ${submission.spirit_name}`,
      html: `
        <h2>New Spirit Submission</h2>
        <p>A user has submitted a new spirit for review.</p>
        <table style="border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Spirit Name:</td><td>${submission.spirit_name}</td></tr>
          ${submission.distillery_name ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Distillery:</td><td>${submission.distillery_name}</td></tr>` : ""}
          ${submission.category ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Category:</td><td>${submission.category}</td></tr>` : ""}
          ${submission.submitted_email ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Submitted by:</td><td>${submission.submitted_email}</td></tr>` : ""}
        </table>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://distil-nation.co.nz"}/admin/submissions">Review submission</a></p>
      `,
    });
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }
}

export async function submitSpirit(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const spirit_name = formData.get("spirit_name") as string;
  const distillery_name = (formData.get("distillery_name") as string) || null;
  const category = (formData.get("category") as string) || null;
  const subcategory = (formData.get("subcategory") as string) || null;
  const abvRaw = formData.get("abv") as string;
  const abv = abvRaw ? parseFloat(abvRaw) : null;
  const region = (formData.get("region") as string) || null;
  const description = (formData.get("description") as string) || null;
  const official_url = (formData.get("official_url") as string) || null;
  const notes = (formData.get("notes") as string) || null;
  const submitted_email = (formData.get("email") as string) || user?.email || null;

  if (!spirit_name?.trim()) throw new Error("Spirit name is required");

  const { error } = await supabase.from("spirit_submissions").insert({
    submitted_by: user?.id || null,
    submitted_email,
    spirit_name: spirit_name.trim(),
    distillery_name,
    category,
    subcategory,
    abv,
    region,
    description,
    official_url,
    notes,
  });

  if (error) throw new Error(error.message);

  // Send email notification
  await sendNotificationEmail({ spirit_name, distillery_name, category, submitted_email });

  revalidatePath("/admin/submissions");
  redirect("/submit-spirit/thanks");
}

export async function approveSubmission(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") redirect("/");

  const { data: submission } = await supabase
    .from("spirit_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (!submission) throw new Error("Submission not found");

  // Create the spirit
  const slug = submission.spirit_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const distillery_slug = submission.distillery_name
    ? submission.distillery_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    : "unknown";

  await supabase.from("spirits").insert({
    slug,
    name: submission.spirit_name,
    distillery_slug,
    category: submission.category || "Other",
    subcategory: submission.subcategory,
    abv: submission.abv,
    region: submission.region,
    description: submission.description,
    official_url: submission.official_url,
    release_status: "core_range",
  });

  // Mark as approved
  await supabase
    .from("spirit_submissions")
    .update({ status: "approved", reviewed_by: user.id, reviewed_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin/submissions");
  revalidatePath("/spirits");
}

export async function rejectSubmission(id: string, review_notes?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") redirect("/");

  await supabase
    .from("spirit_submissions")
    .update({
      status: "rejected",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      review_notes: review_notes || null,
    })
    .eq("id", id);

  revalidatePath("/admin/submissions");
}
