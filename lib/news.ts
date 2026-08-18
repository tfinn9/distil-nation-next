import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  image?: string;
  content: string;
}

let cache: NewsArticle[] | null = null;

export function getAllNewsArticles(): NewsArticle[] {
  if (cache) return cache;

  const files = fs.existsSync(NEWS_DIR)
    ? fs.readdirSync(NEWS_DIR).filter((name) => name.endsWith(".md"))
    : [];

  cache = files
    .flatMap((file) => {
      try {
        const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf-8");
        const { data, content } = matter(raw);
        return [
          {
            slug: (data.slug as string) ?? path.basename(file, ".md"),
            title: (data.title as string) ?? "Untitled",
            excerpt: (data.excerpt as string) ?? "",
            date: (data.date as string) ?? new Date().toISOString().slice(0, 10),
            author: data.author as string | undefined,
            image: data.image as string | undefined,
            content: content.trim(),
          },
        ];
      } catch (error) {
        console.error(`Skipping unparsable news article ${file}:`, error);
        return [];
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return cache;
}

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return getAllNewsArticles().find((article) => article.slug === slug);
}
