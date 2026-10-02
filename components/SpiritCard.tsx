"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wine,
  GlassWater,
  Flame,
  Droplets,
  Coffee,
  HelpCircle,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Spirit, ReleaseStatus } from "@/types/passport";
import { RELEASE_STATUS_LABELS } from "@/types/passport";

const CATEGORY_ICONS = {
  Gin: Wine,
  Whisky: GlassWater,
  Rum: Flame,
  Vodka: Droplets,
  Liqueur: Coffee,
  Other: HelpCircle,
} as const;

const CATEGORY_STYLES: Record<
  Spirit["category"],
  { badge: string; icon: string }
> = {
  Gin: { badge: "bg-forest text-offwhite", icon: "text-forest" },
  Whisky: { badge: "bg-copper text-offwhite", icon: "text-copper" },
  Rum: { badge: "bg-gold text-charcoal", icon: "text-gold" },
  Vodka: { badge: "bg-blue-500/20 text-blue-200", icon: "text-blue-400" },
  Liqueur: { badge: "bg-purple-500/20 text-purple-200", icon: "text-purple-400" },
  Other: { badge: "bg-muted text-muted-foreground", icon: "text-muted-foreground" },
};

function titleCaseSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

interface SpiritCardProps {
  spirit: Spirit;
  unlocked?: boolean;
  compact?: boolean;
  small?: boolean;
}

export function SpiritCard({
  spirit,
  unlocked = false,
  compact = false,
  small = false,
}: SpiritCardProps) {
  const isCompact = compact || small;
  const CategoryIcon = CATEGORY_ICONS[spirit.category] ?? HelpCircle;
  const categoryStyle = CATEGORY_STYLES[spirit.category];
  const distilleryName = titleCaseSlug(spirit.distillery_slug);

  return (
    <Link
      href={`/spirits/${spirit.slug}/`}
      className={cn("group block w-full", isCompact ? "max-w-[180px]" : "max-w-[260px]")}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold/50",
          !unlocked && "opacity-90"
        )}
      >
        {/* Image / placeholder area */}
        <div
          className={cn(
            "relative flex-[2] overflow-hidden bg-gradient-to-b from-muted/60 to-card",
            !unlocked && "grayscale"
          )}
        >
          {spirit.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={spirit.image_url}
              alt={spirit.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <CategoryIcon
                className={cn(
                  "transition-transform duration-500 group-hover:scale-110",
                  isCompact ? "h-12 w-12" : "h-16 w-16",
                  categoryStyle.icon,
                  !unlocked && "opacity-40"
                )}
                strokeWidth={1.2}
              />
            </div>
          )}

          {/* Locked overlay */}
          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/40 backdrop-blur-[2px]">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-lg",
                  isCompact ? "h-10 w-10" : "h-14 w-14"
                )}
              >
                <HelpCircle className={isCompact ? "h-5 w-5" : "h-7 w-7"} />
              </div>
            </div>
          )}

          {/* Category badge */}
          {unlocked && (
            <span
              className={cn(
                "absolute top-3 left-3 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                isCompact && "top-2 left-2 px-1.5 py-0.5 text-[9px]",
                categoryStyle.badge
              )}
            >
              {spirit.category}
            </span>
          )}

          {/* ABV badge */}
          {unlocked && spirit.abv !== null && (
            <span
              className={cn(
                "absolute right-3 bottom-3 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-medium text-offwhite backdrop-blur-sm",
                isCompact && "right-2 bottom-2 text-[9px]"
              )}
            >
              {spirit.abv}% ABV
            </span>
          )}
        </div>

        {/* Content */}
        <div
          className={cn(
            "flex flex-1 flex-col justify-between p-4",
            isCompact && "p-3"
          )}
        >
          <div className="space-y-1.5">
            <h3
              className={cn(
                "font-heading font-bold leading-tight text-offwhite transition-colors group-hover:text-gold",
                isCompact ? "text-base" : "text-lg",
                !unlocked && "text-muted-foreground"
              )}
            >
              {spirit.name}
            </h3>

            {unlocked && (
              <>
                <p
                  className={cn(
                    "text-copper",
                    isCompact ? "text-xs" : "text-sm"
                  )}
                >
                  {distilleryName}
                </p>

                {spirit.region && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-muted-foreground",
                      isCompact ? "text-[10px]" : "text-xs"
                    )}
                  >
                    <MapPin className={isCompact ? "h-3 w-3" : "h-3.5 w-3.5"} />
                    <span>{spirit.region}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span
                    className={cn(
                      "rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-medium text-gold",
                      isCompact && "px-1.5 text-[9px]"
                    )}
                  >
                    {RELEASE_STATUS_LABELS[spirit.release_status as ReleaseStatus]}
                  </span>
                </div>
              </>
            )}
          </div>

          <span
            className={cn(
              "mt-2 block text-center font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60",
              isCompact && "text-[9px]"
            )}
          >
            Distil-Nation
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
