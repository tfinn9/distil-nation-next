import fs from "fs";
import path from "path";
import matter from "gray-matter";

const KB_DIR = path.join(process.cwd(), "content", "kb");

export interface KbArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  status?: string;
  content: string;
}

function walk(dir: string): string[] {
  let results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "RESEARCH-NEEDED.md") {
      results.push(fullPath);
    }
  }
  return results;
}

let cache: KbArticle[] | null = null;

export function getAllKbArticles(): KbArticle[] {
  if (cache) return cache;

  const files = fs.existsSync(KB_DIR) ? walk(KB_DIR) : [];

  cache = files
    .flatMap((file) => {
      try {
        const raw = fs.readFileSync(file, "utf-8");
        const { data, content } = matter(raw);
        return [
          {
            slug: (data.slug as string) ?? path.basename(file, ".md"),
            title: (data.title as string) ?? "Untitled",
            category: (data.category as string) ?? "General",
            excerpt: (data.excerpt as string) ?? "",
            readTime: (data.readTime as string) ?? "3 min",
            status: data.status as string | undefined,
            content: content.trim(),
          },
        ];
      } catch (error) {
        console.error(`Skipping unparsable KB article ${file}:`, error);
        return [];
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return cache;
}

export function getKbArticleBySlug(slug: string): KbArticle | undefined {
  return getAllKbArticles().find((article) => article.slug === slug);
}

export function getKbCategories(): string[] {
  const articles = getAllKbArticles();
  return Array.from(new Set(articles.map((a) => a.category))).sort();
}
