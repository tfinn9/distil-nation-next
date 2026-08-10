"use client";

import { useState, useMemo } from "react";
import { DistilleryCard } from "./DistilleryCard";
import { Distillery } from "@/types";

export function DistilleryGrid({
  distilleries,
  regions,
  spiritTypes,
}: {
  distilleries: Distillery[];
  regions: string[];
  spiritTypes: string[];
}) {
  const [region, setRegion] = useState("All");
  const [spirit, setSpirit] = useState("All");

  const filtered = useMemo(() => {
    return distilleries.filter(
      (d) =>
        (region === "All" || d.region === region) &&
        (spirit === "All" || d.spiritTypes.includes(spirit))
    );
  }, [distilleries, region, spirit]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="region" className="text-sm text-muted-foreground">
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-lg border border-border bg-card px-4 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="spirit" className="text-sm text-muted-foreground">
            Spirit type
          </label>
          <select
            id="spirit"
            value={spirit}
            onChange={(e) => setSpirit(e.target.value)}
            className="rounded-lg border border-border bg-card px-4 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            {spiritTypes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        {filtered.length} distillery{filtered.length !== 1 ? "ies" : "y"}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((distillery) => (
          <DistilleryCard key={distillery.slug} distillery={distillery} />
        ))}
      </div>
    </>
  );
}
