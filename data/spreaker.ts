import { Episode } from "@/types";

const SHOW_ID = 5937481;
const API_URL = `https://api.spreaker.com/v2/shows/${SHOW_ID}/episodes?limit=100`;

function formatDuration(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && value > 0) {
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    if (h > 0) {
      return `${h}h ${m}m`;
    }
    return `${m} min`;
  }
  return "45 min";
}

function stripHtml(html: string): string {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export async function getSpreakerEpisodes(): Promise<Episode[]> {
  try {
    const res = await fetch(API_URL, { cache: "force-cache" });
    if (!res.ok) throw new Error(`Spreaker API ${res.status}`);
    const json = await res.json();
    const items: any[] = json?.response?.items ?? [];

    return items.map((item, index) => {
      const id = String(item.episode_id ?? index);
      const title = item.title ?? "Untitled episode";
      const rawDesc = item.description || item.short_description || "";
      const summary = stripHtml(rawDesc);

      return {
        slug: `spreaker-${id}`,
        episodeNumber: String(item.episode_number ?? items.length - index).padStart(2, "0"),
        title,
        guest: "Tom & Cameron",
        summary: summary.length > 180 ? `${summary.slice(0, 180)}…` : summary,
        duration: "",
        spreaker: item.site_url || `https://www.spreaker.com/episode/${id}`,
        thumbnail:
          item.image_original_url ||
          item.image_url ||
          item.cover_image_url ||
          "https://placehold.co/800x450/202020/F6F4EF?text=Episode",
        spiritType: "Spirits",
        region: "New Zealand",
      };
    });
  } catch (error) {
    console.error("Failed to load Spreaker episodes:", error);
    return [];
  }
}
