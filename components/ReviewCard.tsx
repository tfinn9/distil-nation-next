"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Review } from "@/types";
import { Star } from "lucide-react";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={review.image}
          alt={review.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent h-24" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-gold/20 text-gold border-0">
            {review.spiritType}
          </Badge>
          <div className="flex items-center gap-1 text-gold">
            <Star className="h-4 w-4 fill-gold" />
            <span className="font-semibold text-sm">{review.rating}</span>
          </div>
        </div>
        <h3 className="font-heading text-xl font-semibold text-offwhite mb-1">
          {review.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{review.distillery}</p>
        <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
          {review.palate || review.nose}
        </p>
        <Link
          href={`/reviews/${review.slug}/`}
          className="mt-4 text-sm font-medium text-copper hover:text-copper/80 transition-colors"
        >
          Full review →
        </Link>
      </div>
    </motion.div>
  );
}
