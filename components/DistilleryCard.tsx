"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Distillery } from "@/types";
import { MapPin } from "lucide-react";

export function DistilleryCard({ distillery }: { distillery: Distillery }) {
  const [src] = useState(distillery.heroImage);
  const [hasError, setHasError] = useState(!src);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white p-6 flex items-center justify-center">
        {hasError ? (
          <span className="font-heading text-xl font-semibold text-center text-gray-900">
            {distillery.name}
          </span>
        ) : (
          <img
            src={src}
            alt={`${distillery.name} logo`}
            onError={() => setHasError(true)}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 text-copper" />
          <span>{distillery.region}</span>
        </div>
        <h3 className="font-heading text-2xl font-semibold text-offwhite mb-2">
          {distillery.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {distillery.spiritTypes.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="bg-forest/20 text-forest-foreground border-0 text-xs"
            >
              {type}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
          {distillery.description}
        </p>
        <Link
          href={`/distilleries/${distillery.slug}/`}
          className="inline-flex items-center text-sm font-medium text-gold hover:text-gold/80 transition-colors"
        >
          View distillery
          <span className="ml-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
