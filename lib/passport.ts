import type { Distillery } from "@/types";
import type {
  PassportEntry,
  Spirit,
  SpiritTasting,
  Badge,
} from "@/types/passport";

// ── Stats ─────────────────────────────────────────────────────────────

export interface PassportStats {
  distilleriesVisited: number;
  spiritsTried: number;
  regionsExplored: string[];
  categoriesExplored: string[];
  favouriteSpirits: number;
  favouriteDistilleries: number;
  totalRatings: number;
}

export function getPassportStats(
  entries: PassportEntry[],
  tastings: SpiritTasting[],
  spirits: Spirit[],
  distilleries: Distillery[]
): PassportStats {
  const visited = entries.filter((e) => e.statuses.includes("visited"));
  const visitedSlugs = new Set(visited.map((e) => e.distillery_slug));

  const tried = tastings.filter((t) => t.status === "tried" || t.status === "favourite");
  const triedSpiritIds = new Set(tried.map((t) => t.spirit_id));

  const regions = new Set<string>();
  visitedSlugs.forEach((slug) => {
    const d = distilleries.find((dd) => dd.slug === slug);
    if (d) regions.add(d.region);
  });

  const categories = new Set<string>();
  tried.forEach((t) => {
    const s = spirits.find((ss) => ss.id === t.spirit_id);
    if (s) categories.add(s.category);
  });

  return {
    distilleriesVisited: visitedSlugs.size,
    spiritsTried: triedSpiritIds.size,
    regionsExplored: Array.from(regions),
    categoriesExplored: Array.from(categories),
    favouriteSpirits: tastings.filter((t) => t.status === "favourite").length,
    favouriteDistilleries: entries.filter((e) => e.statuses.includes("favorite")).length,
    totalRatings: tastings.filter((t) => t.rating).length,
  };
}

// ── Distillery Progress ───────────────────────────────────────────────

export function getDistilleryProgress(
  distillerySlug: string,
  tastings: SpiritTasting[],
  spirits: Spirit[]
) {
  const distillerySpirits = spirits.filter((s) => s.distillery_slug === distillerySlug);
  const total = distillerySpirits.length;
  const triedIds = new Set(
    tastings
      .filter((t) => t.status === "tried" || t.status === "favourite")
      .map((t) => t.spirit_id)
  );
  const tried = distillerySpirits.filter((s) => triedIds.has(s.id)).length;
  return { tried, total, percentage: total > 0 ? Math.round((tried / total) * 100) : 0 };
}

// ── Badge Criteria Check ──────────────────────────────────────────────

export function checkBadgeCriteria(
  badge: Badge,
  entries: PassportEntry[],
  tastings: SpiritTasting[],
  spirits: Spirit[],
  distilleries: Distillery[],
  homeRegion?: string | null
): { earned: boolean; progress: number; total: number } {
  const c = badge.criteria;
  const type = c.type as string;

  const visited = entries.filter((e) => e.statuses.includes("visited"));
  const tried = tastings.filter((t) => t.status === "tried" || t.status === "favourite");

  switch (type) {
    case "spirits_tried": {
      const count = (c.count as number) || 1;
      return { earned: tried.length >= count, progress: Math.min(tried.length, count), total: count };
    }
    case "distilleries_visited": {
      const count = (c.count as number) || 1;
      return { earned: visited.length >= count, progress: Math.min(visited.length, count), total: count };
    }
    case "region_visited": {
      const region = c.region as string;
      const count = (c.count as number) || 1;
      const regionVisited = visited.filter((e) => {
        const d = distilleries.find((dd) => dd.slug === e.distillery_slug);
        return d?.region === region;
      });
      return { earned: regionVisited.length >= count, progress: Math.min(regionVisited.length, count), total: count };
    }
    case "both_islands": {
      const islands = new Set<string>();
      visited.forEach((e) => {
        const d = distilleries.find((dd) => dd.slug === e.distillery_slug);
        if (d) islands.add(d.island);
      });
      const progress = islands.size;
      return { earned: islands.has("North") && islands.has("South"), progress, total: 2 };
    }
    case "categories_explored": {
      const required = (c.categories as string[]) || [];
      const triedCategories = new Set<string>();
      tried.forEach((t) => {
        const s = spirits.find((ss) => ss.id === t.spirit_id);
        if (s) triedCategories.add(s.category);
      });
      const met = required.filter((cat) => triedCategories.has(cat)).length;
      return { earned: met >= required.length, progress: met, total: required.length };
    }
    case "category_from_distilleries": {
      const category = c.category as string;
      const count = (c.count as number) || 1;
      const distilleriesForCategory = new Set<string>();
      tried.forEach((t) => {
        const s = spirits.find((ss) => ss.id === t.spirit_id);
        if (s && s.category === category) distilleriesForCategory.add(s.distillery_slug);
      });
      return {
        earned: distilleriesForCategory.size >= count,
        progress: Math.min(distilleriesForCategory.size, count),
        total: count,
      };
    }
    case "distillery_superfan": {
      const count = (c.count as number) || 3;
      const byDistillery: Record<string, number> = {};
      tried.forEach((t) => {
        const s = spirits.find((ss) => ss.id === t.spirit_id);
        if (s) byDistillery[s.distillery_slug] = (byDistillery[s.distillery_slug] || 0) + 1;
      });
      const maxCount = Math.max(0, ...Object.values(byDistillery));
      return { earned: maxCount >= count, progress: Math.min(maxCount, count), total: count };
    }
    case "manual":
      return { earned: false, progress: 0, total: 1 };
    default:
      return { earned: false, progress: 0, total: 1 };
  }
}

// ── Super Fan Detection ───────────────────────────────────────────────

export function getDistillerySuperFans(
  tastings: SpiritTasting[],
  spirits: Spirit[],
  threshold = 3
): string[] {
  const tried = tastings.filter((t) => t.status === "tried" || t.status === "favourite");
  const byDistillery: Record<string, number> = {};
  tried.forEach((t) => {
    const s = spirits.find((ss) => ss.id === t.spirit_id);
    if (s) byDistillery[s.distillery_slug] = (byDistillery[s.distillery_slug] || 0) + 1;
  });
  return Object.entries(byDistillery)
    .filter(([, count]) => count >= threshold)
    .map(([slug]) => slug);
}

// ── Region Progress ───────────────────────────────────────────────────

export function getRegionProgress(
  entries: PassportEntry[],
  distilleries: Distillery[]
): Record<string, { visited: number; total: number }> {
  const regions: Record<string, { visited: number; total: number }> = {};
  const visitedSlugs = new Set(
    entries.filter((e) => e.statuses.includes("visited")).map((e) => e.distillery_slug)
  );

  distilleries.forEach((d) => {
    if (!regions[d.region]) regions[d.region] = { visited: 0, total: 0 };
    regions[d.region].total++;
    if (visitedSlugs.has(d.slug)) regions[d.region].visited++;
  });

  return regions;
}

// ── Discovery Suggestions ─────────────────────────────────────────────

export function getDiscoverySuggestions(
  entries: PassportEntry[],
  tastings: SpiritTasting[],
  spirits: Spirit[],
  distilleries: Distillery[],
  limit = 5
): { message: string; link?: string }[] {
  const suggestions: { message: string; link?: string }[] = [];
  const tried = tastings.filter((t) => t.status === "tried" || t.status === "favourite");
  const visited = entries.filter((e) => e.statuses.includes("visited"));

  if (tried.length === 0 && visited.length === 0) {
    suggestions.push({
      message: "Start your passport by logging your first NZ spirit.",
      link: "/spirits/",
    });
    return suggestions;
  }

  // Near-superfan distilleries
  const byDistillery: Record<string, number> = {};
  tried.forEach((t) => {
    const s = spirits.find((ss) => ss.id === t.spirit_id);
    if (s) byDistillery[s.distillery_slug] = (byDistillery[s.distillery_slug] || 0) + 1;
  });
  Object.entries(byDistillery).forEach(([slug, count]) => {
    if (count === 2) {
      const d = distilleries.find((dd) => dd.slug === slug);
      if (d) {
        suggestions.push({
          message: `You're one spirit away from becoming a ${d.name} Super Fan.`,
          link: `/distilleries/${slug}/`,
        });
      }
    }
  });

  // Near-complete regions
  const regionProgress = getRegionProgress(entries, distilleries);
  Object.entries(regionProgress).forEach(([region, { visited: v, total }]) => {
    if (total > 0 && v > 0 && v < total && total - v <= 3) {
      suggestions.push({
        message: `Only ${total - v} distiller${total - v === 1 ? "y" : "ies"} left to complete ${region}.`,
        link: "/distilleries/",
      });
    }
  });

  // Suggest unexplored categories
  const triedCategories = new Set<string>();
  tried.forEach((t) => {
    const s = spirits.find((ss) => ss.id === t.spirit_id);
    if (s) triedCategories.add(s.category);
  });
  const allCategories = ["Gin", "Whisky", "Rum", "Vodka", "Liqueur"];
  allCategories.forEach((cat) => {
    if (!triedCategories.has(cat)) {
      suggestions.push({
        message: `You haven't tried any NZ ${cat.toLowerCase()} yet.`,
        link: `/spirits/?category=${cat}`,
      });
    }
  });

  // Unvisited regions with distilleries
  const visitedSlugs = new Set(visited.map((e) => e.distillery_slug));
  const regionsWithUnvisited: Record<string, number> = {};
  distilleries.forEach((d) => {
    if (!visitedSlugs.has(d.slug)) {
      regionsWithUnvisited[d.region] = (regionsWithUnvisited[d.region] || 0) + 1;
    }
  });
  Object.entries(regionsWithUnvisited)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .forEach(([region, count]) => {
      suggestions.push({
        message: `Travelling to ${region}? You have ${count} unvisited distiller${count === 1 ? "y" : "ies"} there.`,
        link: "/distilleries/",
      });
    });

  return suggestions.slice(0, limit);
}
