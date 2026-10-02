"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type PassportActionState = { error: string | null; message?: string | null };

// ── Spirit Tasting actions ────────────────────────────────────────────

export async function addSpiritToPassport(
  spiritId: string,
  status: "tried" | "want_to_try" | "favourite" = "tried"
): Promise<PassportActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const { error } = await supabase
    .from("spirit_tastings")
    .upsert(
      { user_id: user.id, spirit_id: spiritId, status },
      { onConflict: "user_id,spirit_id" }
    );

  if (error) return { error: error.message };
  revalidatePath("/passport");
  return { error: null, message: "Added to your Passport!" };
}

export async function updateSpiritTasting(
  spiritId: string,
  patch: {
    status?: string;
    rating?: number | null;
    notes?: string | null;
    date_tried?: string | null;
    location?: string | null;
  }
): Promise<PassportActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const { error } = await supabase
    .from("spirit_tastings")
    .update(patch)
    .eq("user_id", user.id)
    .eq("spirit_id", spiritId);

  if (error) return { error: error.message };
  revalidatePath("/passport");
  return { error: null, message: "Tasting updated." };
}

export async function removeSpiritFromPassport(
  spiritId: string
): Promise<PassportActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const { error } = await supabase
    .from("spirit_tastings")
    .delete()
    .eq("user_id", user.id)
    .eq("spirit_id", spiritId);

  if (error) return { error: error.message };
  revalidatePath("/passport");
  return { error: null, message: "Removed from your Passport." };
}

// ── Profile actions ───────────────────────────────────────────────────

export async function updatePassportProfile(
  _prevState: PassportActionState,
  formData: FormData
): Promise<PassportActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const displayName = String(formData.get("displayName") || "").trim();
  const bio = String(formData.get("bio") || "").trim();
  const homeRegion = String(formData.get("homeRegion") || "").trim();
  const isPublic = formData.get("isPublic") === "on";
  const selectedTitle = String(formData.get("selectedTitle") || "").trim();

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName || null,
      bio: bio || null,
      home_region: homeRegion || null,
      is_public: isPublic,
      selected_title: selectedTitle || null,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/passport");
  revalidatePath("/account");
  return { error: null, message: "Profile updated." };
}

// ── Badge actions ─────────────────────────────────────────────────────

export async function awardBadge(
  badgeId: string
): Promise<PassportActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in." };

  const { error } = await supabase
    .from("user_badges")
    .upsert(
      { user_id: user.id, badge_id: badgeId },
      { onConflict: "user_id,badge_id" }
    );

  if (error) return { error: error.message };
  return { error: null, message: "Badge earned!" };
}
