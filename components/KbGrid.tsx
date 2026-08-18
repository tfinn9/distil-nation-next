"use client";

import { useMemo, useState } from "react";
import { KbArticleCard } from "./KbArticleCard";
import type { KbArticle } from "@/lib/kb";

export function KbGrid({
  articles,
  categories,
}: {
  articles: KbArticle[];
  categories: string[];
}) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (category === "All" || a.category === category) &&
        (!query ||
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query))
    );
  }, [articles, category, search]);

  const pillClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "border-gold bg-gold/10 text-gold"
        : "border-border text-muted-foreground hover:border-gold/40"
    }`;

  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles…"
          className="w-full max-w-md rounded-lg border border-border bg-card px-4 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setCategory("All")} className={pillClass(category === "All")}>
            All
          </button>
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={pillClass(category === c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        Showing {filtered.length} article{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-card border border-border p-12 text-center">
          <p className="text-muted-foreground">No articles match your search.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <KbArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </>
  );
}
