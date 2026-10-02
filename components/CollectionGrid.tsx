"use client";

import { useState } from "react";
import { SpiritCard } from "@/components/SpiritCard";
import type { Spirit, SpiritTasting } from "@/types/passport";
import { SPIRIT_CATEGORIES } from "@/types/passport";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "collected" | "want_to_try" | "favourite";
type CategoryFilter = "all" | Spirit["category"];

interface CollectionGridProps {
  spirits: Spirit[];
  tastings: SpiritTasting[];
}

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "collected", label: "Collected" },
  { value: "want_to_try", label: "Want to Try" },
  { value: "favourite", label: "Favourites" },
];

function titleCaseSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function CollectionGrid({ spirits, tastings }: CollectionGridProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [groupByDistillery, setGroupByDistillery] = useState(false);

  const tastingBySpiritId = new Map(tastings.map((t) => [t.spirit_id, t]));

  const isUnlocked = (spirit: Spirit) => {
    const t = tastingBySpiritId.get(spirit.id);
    return t?.status === "tried" || t?.status === "favourite";
  };

  const filtered = spirits.filter((spirit) => {
    if (category !== "all" && spirit.category !== category) return false;
    if (status === "all") return true;
    const t = tastingBySpiritId.get(spirit.id);
    if (status === "collected")
      return t?.status === "tried" || t?.status === "favourite";
    return t?.status === status;
  });

  const grouped = groupByDistillery
    ? filtered.reduce<Record<string, Spirit[]>>((acc, spirit) => {
        (acc[spirit.distillery_slug] ??= []).push(spirit);
        return acc;
      }, {})
    : null;

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              category === "all"
                ? "border-gold bg-gold/10 text-gold"
                : "border-border bg-card text-muted-foreground hover:border-gold/50 hover:text-offwhite"
            )}
          >
            All
          </button>
          {SPIRIT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                category === cat
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border bg-card text-muted-foreground hover:border-gold/50 hover:text-offwhite"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatus(tab.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  status === tab.value
                    ? "border-copper bg-copper/10 text-copper"
                    : "border-border bg-card text-muted-foreground hover:border-copper/50 hover:text-offwhite"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setGroupByDistillery((v) => !v)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              groupByDistillery
                ? "border-gold bg-gold/10 text-gold"
                : "border-border bg-card text-muted-foreground hover:border-gold/50 hover:text-offwhite"
            )}
          >
            Group by distillery
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No spirits match these filters yet.
          </p>
        </div>
      ) : grouped ? (
        <div className="space-y-8">
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([slug, distillerySpirits]) => {
              const unlockedCount = distillerySpirits.filter(isUnlocked).length;
              return (
                <div key={slug}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold text-offwhite">
                      {titleCaseSlug(slug)}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {unlockedCount}/{distillerySpirits.length} collected
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {distillerySpirits.map((spirit) => (
                      <SpiritCard
                        key={spirit.id}
                        spirit={spirit}
                        unlocked={isUnlocked(spirit)}
                        compact
                      />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((spirit) => (
            <SpiritCard
              key={spirit.id}
              spirit={spirit}
              unlocked={isUnlocked(spirit)}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
}
