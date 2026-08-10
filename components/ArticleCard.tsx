"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/types";
import { Clock } from "lucide-react";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Badge variant="secondary" className="bg-copper/20 text-copper border-0">
            {article.category}
          </Badge>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>
        <h3 className="font-heading text-xl font-semibold text-offwhite mb-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
          {article.excerpt}
        </p>
        <Link
          href={`/learn/${article.slug}/`}
          className="text-sm font-medium text-gold hover:text-gold/80 transition-colors"
        >
          Read more →
        </Link>
      </div>
    </motion.div>
  );
}
