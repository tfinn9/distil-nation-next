import type { MetadataRoute } from "next";
import { distilleries, reviews, episodes as fallbackEpisodes } from "@/data/mock";
import { getSpreakerEpisodes } from "@/data/spreaker";
import { getAllKbArticles } from "@/lib/kb";
import { getAllNewsArticles } from "@/lib/news";

const BASE_URL = "https://www.distilnation.nz";

const STATIC_PATHS = ["", "/episodes", "/distilleries", "/learn", "/reviews", "/news", "/about", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const spreakerEpisodes = await getSpreakerEpisodes();
  const episodeSlugs = new Set<string>();
  [...spreakerEpisodes, ...fallbackEpisodes].forEach((episode) => episodeSlugs.add(episode.slug));

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === "" ? `${BASE_URL}/` : `${BASE_URL}${path}/`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const distilleryRoutes: MetadataRoute.Sitemap = distilleries.map((distillery) => ({
    url: `${BASE_URL}/distilleries/${distillery.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const episodeRoutes: MetadataRoute.Sitemap = Array.from(episodeSlugs).map((slug) => ({
    url: `${BASE_URL}/episodes/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const reviewRoutes: MetadataRoute.Sitemap = reviews.map((review) => ({
    url: `${BASE_URL}/reviews/${review.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const learnRoutes: MetadataRoute.Sitemap = getAllKbArticles().map((article) => ({
    url: `${BASE_URL}/learn/${article.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = getAllNewsArticles().map((article) => ({
    url: `${BASE_URL}/news/${article.slug}/`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...distilleryRoutes, ...episodeRoutes, ...reviewRoutes, ...learnRoutes, ...newsRoutes];
}
