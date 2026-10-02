"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ── Helpers ───────────────────────────────────────────────────────────

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") redirect("/");
  return supabase;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Spirits ───────────────────────────────────────────────────────────

export async function createSpirit(formData: FormData) {
  const supabase = await requireAdmin();

  const name = formData.get("name") as string;
  const slug = slugify(name);
  const distillery_slug = formData.get("distillery_slug") as string;
  const category = formData.get("category") as string;
  const subcategory = (formData.get("subcategory") as string) || null;
  const abvRaw = formData.get("abv") as string;
  const abv = abvRaw ? parseFloat(abvRaw) : null;
  const region = (formData.get("region") as string) || null;
  const description = (formData.get("description") as string) || null;
  const release_status = (formData.get("release_status") as string) || "core_range";
  const official_url = (formData.get("official_url") as string) || null;
  const age_statement = (formData.get("age_statement") as string) || null;
  const cask_info = (formData.get("cask_info") as string) || null;
  const releaseYearRaw = formData.get("release_year") as string;
  const release_year = releaseYearRaw ? parseInt(releaseYearRaw) : null;

  const { error } = await supabase.from("spirits").insert({
    slug,
    name,
    distillery_slug,
    category,
    subcategory,
    abv,
    region,
    description,
    release_status,
    official_url,
    age_statement,
    cask_info,
    release_year,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/spirits");
  revalidatePath("/spirits");
  redirect("/admin/spirits");
}

export async function updateSpirit(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const name = formData.get("name") as string;
  const slug = slugify(name);
  const distillery_slug = formData.get("distillery_slug") as string;
  const category = formData.get("category") as string;
  const subcategory = (formData.get("subcategory") as string) || null;
  const abvRaw = formData.get("abv") as string;
  const abv = abvRaw ? parseFloat(abvRaw) : null;
  const region = (formData.get("region") as string) || null;
  const description = (formData.get("description") as string) || null;
  const release_status = (formData.get("release_status") as string) || "core_range";
  const official_url = (formData.get("official_url") as string) || null;
  const age_statement = (formData.get("age_statement") as string) || null;
  const cask_info = (formData.get("cask_info") as string) || null;
  const releaseYearRaw = formData.get("release_year") as string;
  const release_year = releaseYearRaw ? parseInt(releaseYearRaw) : null;

  const { error } = await supabase.from("spirits").update({
    slug,
    name,
    distillery_slug,
    category,
    subcategory,
    abv,
    region,
    description,
    release_status,
    official_url,
    age_statement,
    cask_info,
    release_year,
  }).eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/spirits");
  revalidatePath("/spirits");
  redirect("/admin/spirits");
}

export async function deleteSpirit(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("spirits").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/spirits");
  revalidatePath("/spirits");
}

// ── Badges ────────────────────────────────────────────────────────────

export async function createBadge(formData: FormData) {
  const supabase = await requireAdmin();

  const name = formData.get("name") as string;
  const slug = slugify(name);
  const description = formData.get("description") as string;
  const category = (formData.get("category") as string) || "general";
  const criteriaRaw = formData.get("criteria") as string;
  const grants_title = formData.get("grants_title") === "on";
  const title_text = (formData.get("title_text") as string) || null;
  const sortRaw = formData.get("sort_order") as string;
  const sort_order = sortRaw ? parseInt(sortRaw) : 0;
  const is_active = formData.get("is_active") !== "off";

  let criteria: Record<string, unknown> = {};
  try {
    criteria = JSON.parse(criteriaRaw || "{}");
  } catch {
    throw new Error("Invalid JSON in criteria field");
  }

  const { error } = await supabase.from("badges").insert({
    slug,
    name,
    description,
    category,
    criteria,
    grants_title,
    title_text: grants_title ? title_text : null,
    sort_order,
    is_active,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/badges");
  revalidatePath("/passport/badges");
  redirect("/admin/badges");
}

export async function updateBadge(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const name = formData.get("name") as string;
  const slug = slugify(name);
  const description = formData.get("description") as string;
  const category = (formData.get("category") as string) || "general";
  const criteriaRaw = formData.get("criteria") as string;
  const grants_title = formData.get("grants_title") === "on";
  const title_text = (formData.get("title_text") as string) || null;
  const sortRaw = formData.get("sort_order") as string;
  const sort_order = sortRaw ? parseInt(sortRaw) : 0;
  const is_active = formData.get("is_active") !== "off";

  let criteria: Record<string, unknown> = {};
  try {
    criteria = JSON.parse(criteriaRaw || "{}");
  } catch {
    throw new Error("Invalid JSON in criteria field");
  }

  const { error } = await supabase.from("badges").update({
    slug,
    name,
    description,
    category,
    criteria,
    grants_title,
    title_text: grants_title ? title_text : null,
    sort_order,
    is_active,
  }).eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/badges");
  revalidatePath("/passport/badges");
  redirect("/admin/badges");
}

export async function deleteBadge(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("badges").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/badges");
  revalidatePath("/passport/badges");
}

// ── Quests ────────────────────────────────────────────────────────────

export async function createQuest(formData: FormData) {
  const supabase = await requireAdmin();

  const name = formData.get("name") as string;
  const slug = slugify(name);
  const description = formData.get("description") as string;
  const quest_type = (formData.get("quest_type") as string) || "evergreen";
  const criteriaRaw = formData.get("criteria") as string;
  const reward_badge_id = (formData.get("reward_badge_id") as string) || null;
  const start_date = (formData.get("start_date") as string) || null;
  const end_date = (formData.get("end_date") as string) || null;
  const sortRaw = formData.get("sort_order") as string;
  const sort_order = sortRaw ? parseInt(sortRaw) : 0;
  const is_active = formData.get("is_active") !== "off";

  let criteria: Record<string, unknown> = {};
  try {
    criteria = JSON.parse(criteriaRaw || "{}");
  } catch {
    throw new Error("Invalid JSON in criteria field");
  }

  const { error } = await supabase.from("quests").insert({
    slug,
    name,
    description,
    quest_type,
    criteria,
    reward_badge_id: reward_badge_id || null,
    start_date: start_date || null,
    end_date: end_date || null,
    sort_order,
    is_active,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/quests");
  revalidatePath("/passport/quests");
  redirect("/admin/quests");
}

export async function updateQuest(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const name = formData.get("name") as string;
  const slug = slugify(name);
  const description = formData.get("description") as string;
  const quest_type = (formData.get("quest_type") as string) || "evergreen";
  const criteriaRaw = formData.get("criteria") as string;
  const reward_badge_id = (formData.get("reward_badge_id") as string) || null;
  const start_date = (formData.get("start_date") as string) || null;
  const end_date = (formData.get("end_date") as string) || null;
  const sortRaw = formData.get("sort_order") as string;
  const sort_order = sortRaw ? parseInt(sortRaw) : 0;
  const is_active = formData.get("is_active") !== "off";

  let criteria: Record<string, unknown> = {};
  try {
    criteria = JSON.parse(criteriaRaw || "{}");
  } catch {
    throw new Error("Invalid JSON in criteria field");
  }

  const { error } = await supabase.from("quests").update({
    slug,
    name,
    description,
    quest_type,
    criteria,
    reward_badge_id: reward_badge_id || null,
    start_date: start_date || null,
    end_date: end_date || null,
    sort_order,
    is_active,
  }).eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/quests");
  revalidatePath("/passport/quests");
  redirect("/admin/quests");
}

export async function deleteQuest(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("quests").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/quests");
  revalidatePath("/passport/quests");
}
