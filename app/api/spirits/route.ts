import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { spirits as seedSpirits } from "@/data/spirits";

export async function GET() {
  const supabase = await createClient();

  // Try fetching from DB first; fall back to seed data
  const { data: dbSpirits, error } = await supabase
    .from("spirits")
    .select("*")
    .order("name");

  if (!error && dbSpirits && dbSpirits.length > 0) {
    return NextResponse.json(dbSpirits);
  }

  // Fallback to static seed data
  return NextResponse.json(seedSpirits);
}
