import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    { data: tastings },
    { data: passportEntries },
    { data: badges },
    { data: userBadges },
    { data: quests },
    { data: userQuests },
  ] = await Promise.all([
    supabase.from("spirit_tastings").select("*").eq("user_id", user.id),
    supabase.from("passport_entries").select("*").eq("user_id", user.id),
    supabase.from("badges").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("user_badges").select("*, badge:badges(*)").eq("user_id", user.id),
    supabase.from("quests").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("user_quests").select("*").eq("user_id", user.id),
  ]);

  return NextResponse.json({
    tastings: tastings ?? [],
    passportEntries: passportEntries ?? [],
    badges: badges ?? [],
    userBadges: userBadges ?? [],
    quests: quests ?? [],
    userQuests: userQuests ?? [],
  });
}
