"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Distillery } from "@/types";
import { MapPin, Martini } from "lucide-react";

export function DistilleryCard({ distillery }: { distillery: Distillery }) {
  const [src] = useState(distillery.heroImage);
  const [hasError, setHasError] = useState(!src);

  return (
    <Link href={`/distilleries/${distillery.slug}/`} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group flex h-full flex-col gap-3 rounded-2xl bg-card border border-border p-5 hover:border-gold/50 transition-colors"
      >
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
          <h3 className="font-heading text-lg font-semibold text-offwhite leading-snug group-hover:text-gold transition-colors">
            {distillery.name}
          </h3>
          {!distillery.isActive && (
            <span className="ml-auto flex-shrink-0 rounded-full bg-muted/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              Closed
            </span>
          )}
        </div>

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
