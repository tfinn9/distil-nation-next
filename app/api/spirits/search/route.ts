import { NextRequest, NextResponse } from "next/server";
import { spirits as seedSpirits } from "@/data/spirits";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase();
  if (!q || q.length < 2) {
    return NextResponse.json({ spirits: [] });
  }

  // Search static seed data for matching spirits
  const matched = seedSpirits
    .filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.slug.includes(q.replace(/\s+/g, "-"))
    )
    .slice(0, 8)
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      distillery_slug: s.distillery_slug,
      category: s.category,
    }));

  return NextResponse.json({ spirits: matched });
}
