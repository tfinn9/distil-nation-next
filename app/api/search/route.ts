import { NextRequest, NextResponse } from "next/server";
import { distilleries } from "@/data/mock";
import { spirits as seedSpirits } from "@/data/spirits";
import { getAllKbArticles } from "@/lib/kb";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase().trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: { type: string; title: string; href: string; subtitle?: string }[] = [];

  // Search distilleries
  distilleries
    .filter((d) => d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q))
    .slice(0, 5)
    .forEach((d) => {
      results.push({
        type: "distillery",
        title: d.name,
        href: `/distilleries/${d.slug}/`,
        subtitle: d.region,
      });
    });

  // Search spirits
  seedSpirits
    .filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
    .slice(0, 5)
    .forEach((s) => {
      results.push({
        type: "spirit",
        title: s.name,
        href: `/spirits/${s.slug}/`,
        subtitle: s.category,
      });
    });

  // Search articles
  const articles = getAllKbArticles();
  articles
    .filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((a) => {
      results.push({
        type: "article",
        title: a.title,
        href: `/learn/${a.slug}/`,
        subtitle: a.category,
      });
    });

  return NextResponse.json({ results: results.slice(0, 12) });
}
