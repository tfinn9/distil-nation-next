"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Distillery } from "@/types";
import type { PassportEntry } from "@/types/passport";
import { MapPin, Martini, Heart, CheckCircle2, Star } from "lucide-react";

export function DistilleryCard({
  distillery,
  passport,
}: {
  distillery: Distillery;
  passport?: PassportEntry;
}) {
  const [src] = useState(distillery.heroImage);
  const [hasError, setHasError] = useState(!src);

  const statuses = passport?.statuses ?? [];
  const isFavorite = statuses.includes("favorite");
  const isVisited = statuses.includes("visited") || statuses.includes("tour_completed");

  return (
    <Link href={`/distilleries/${distillery.slug}/`} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative flex h-full flex-col gap-3 rounded-2xl bg-card border border-border p-5 hover:border-gold/50 transition-colors"
      >
        {isFavorite && (
          <Heart className="absolute top-4 right-4 h-4 w-4 fill-gold text-gold" aria-label="Favourite" />
        )}

        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-white border border-border flex items-center justify-center">
            {hasError ? (
              <span className="text-[10px] font-heading font-semibold text-center text-gray-900 leading-none px-0.5">
                {distillery.name.slice(0, 3).toUpperCase()}
              </span>
            ) : (
              <img
                src={src}
                alt={`${distillery.name} logo`}
                onError={() => setHasError(true)}
                className="h-full w-full object-contain p-1.5"
              />
            )}
          </div>
          <h3 className="font-heading text-lg font-semibold text-offwhite leading-snug group-hover:text-gold transition-colors pr-5">
            {distillery.name}
          </h3>
          {!distillery.isActive && (
            <span className="ml-auto flex-shrink-0 rounded-full bg-muted/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              Closed
            </span>
          )}
        </div>

        {(isVisited || passport?.rating) && (
          <div className="flex items-center gap-3 -mt-1">
            {isVisited && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-forest">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Visited
              </span>
            )}
            {passport?.rating && (
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-gold">
                <Star className="h-3.5 w-3.5 fill-gold" />
                {passport.rating}/5
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-copper flex-shrink-0" />
          <span>{distillery.region}</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Martini className="h-3.5 w-3.5 text-copper flex-shrink-0" />
          <span>{distillery.spiritTypes.join(" • ")}</span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {distillery.description}
        </p>

        <span className="mt-auto inline-flex items-center text-sm font-medium text-gold group-hover:text-gold/80 transition-colors">
          View profile
          <span className="ml-1">→</span>
        </span>
      </motion.div>
    </Link>
  );
}
