"use client";

import { useState, useMemo } from "react";
import { SpiritCard } from "@/components/SpiritCard";
import type { Spirit } from "@/types/passport";
import { SPIRIT_CATEGORIES } from "@/types/passport";
import type { Distillery } from "@/types";
import { cn } from "@/lib/utils";
import { Search, Grid3x3, List } from "lucide-react";

export function SpiritsGrid({
  spirits,
  distilleries,
}: {
  spirits: Spirit[];
  distilleries: Distillery[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [region, setRegion] = useState<string>("All");

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(spirits.map((s) => s.region).filter(Boolean) as string[])).sort()],
    [spirits]
  );

  const filtered = useMemo(() => {
    return spirits.filter((s) => {
      if (category !== "All" && s.category !== category) return false;
      if (region !== "All" && s.region !== region) return false;
      if (query) {
        const q = query.toLowerCase();
        const distillery = distilleries.find((d) => d.slug === s.distillery_slug);
        return (
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (distillery?.name.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [spirits, distilleries, category, region, query]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search spirits, distilleries..."
          className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-offwhite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {["All", ...SPIRIT_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              category === cat
                ? "bg-gold text-charcoal"
                : "bg-card text-muted-foreground border border-border hover:text-offwhite"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Region filter */}
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        {regions.map((r) => (
          <option key={r} value={r}>
            {r === "All" ? "All regions" : r}
          </option>
        ))}
      </select>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} spirit{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((spirit) => (
          <SpiritCard key={spirit.id} spirit={spirit} unlocked />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl bg-card border border-border p-8 text-center">
          <p className="text-muted-foreground">No spirits match your search.</p>
        </div>
      )}
    </div>
  );
}
