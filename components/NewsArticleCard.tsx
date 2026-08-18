"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { formatNewsDate } from "@/lib/format-date";

export function NewsArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}/`} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group flex h-full flex-col gap-3 rounded-2xl bg-card border border-border p-5 hover:border-gold/50 transition-colors"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3" />
          {formatNewsDate(article.date)}
        </div>
        <h3 className="font-heading text-lg font-semibold text-offwhite leading-snug group-hover:text-gold transition-colors">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center text-sm font-medium text-gold group-hover:text-gold/80 transition-colors">
          Read more
          <span className="ml-1">→</span>
        </span>
      </motion.div>
    </Link>
  );
}
