"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { DistilleryCard } from "./DistilleryCard";
import { Distillery } from "@/types";
import { LayoutGrid, Map as MapIcon } from "lucide-react";
import { usePassportEntries } from "@/hooks/usePassportEntries";

const DistilleryMap = dynamic(() => import("./DistilleryMap").then((m) => m.DistilleryMap), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] rounded-2xl border border-border bg-card flex items-center justify-center text-muted-foreground">
      Loading map…
    </div>
  ),
});

export function DistilleryGrid({
  distilleries,
  regions,
  spiritTypes,
}: {
  distilleries: Distillery[];
  regions: string[];
  spiritTypes: string[];
}) {
  const searchParams = useSearchParams();
  const { entries: passportEntries } = usePassportEntries();
  const [view, setView] = useState<"grid" | "map">("grid");
  const [region, setRegion] = useState("All");
  const [spirit, setSpirit] = useState("All");
  const [island, setIsland] = useState("All");
  const [cellarDoorOnly, setCellarDoorOnly] = useState(false);
  const [toursOnly, setToursOnly] = useState(false);
  const [activeOnly, setActiveOnly] = useState(true);

  useEffect(() => {
    const fromUrl = searchParams.get("region");
    if (fromUrl && regions.includes(fromUrl)) {
      setRegion(fromUrl);
    }
  }, [searchParams, regions]);

  const filtered = useMemo(() => {
    return distilleries.filter(
      (d) =>
        (!activeOnly || d.isActive) &&
        (region === "All" || d.region === region) &&
        (spirit === "All" || d.spiritTypes.includes(spirit)) &&
        (island === "All" || d.island === island) &&
        (!cellarDoorOnly || d.hasVisitorCentre) &&
        (!toursOnly || d.hasTours)
    );
  }, [distilleries, region, spirit, island, cellarDoorOnly, toursOnly, activeOnly]);

  const selectClass =
    "rounded-lg border border-border bg-card px-4 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50";
  const labelClass = "text-sm text-muted-foreground";
  const pillClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "border-gold bg-gold/10 text-gold"
        : "border-border text-muted-foreground hover:border-gold/40"
    }`;

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="region" className={labelClass}>
              Region
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={selectClass}
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="spirit" className={labelClass}>
              Spirit type
            </label>
            <select
              id="spirit"
              value={spirit}
              onChange={(e) => setSpirit(e.target.value)}
              className={selectClass}
            >
              {spiritTypes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="island" className={labelClass}>
              Island
            </label>
            <select
              id="island"
              value={island}
              onChange={(e) => setIsland(e.target.value)}
              className={selectClass}
            >
              <option value="All">All</option>
              <option value="North">North Island</option>
              <option value="South">South Island</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-2 rounded-full bg-card border border-border p-1">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                view === "grid" ? "bg-gold text-charcoal" : "text-muted-foreground"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid view
            </button>
            <button
              type="button"
              onClick={() => setView("map")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                view === "map" ? "bg-gold text-charcoal" : "text-muted-foreground"
              }`}
            >
              <MapIcon className="h-4 w-4" />
              Map view
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCellarDoorOnly((v) => !v)}
            className={pillClass(cellarDoorOnly)}
          >
            Cellar door
          </button>
          <button
            type="button"
            onClick={() => setToursOnly((v) => !v)}
            className={pillClass(toursOnly)}
          >
            Tours available
          </button>
          <button
            type="button"
            onClick={() => setActiveOnly((v) => !v)}
            className={pillClass(activeOnly)}
          >
            Active only
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        Showing {filtered.length} distillery{filtered.length !== 1 ? "ies" : "y"}
      </p>

      {view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((distillery) => (
            <DistilleryCard
              key={distillery.slug}
              distillery={distillery}
              passport={passportEntries[distillery.slug]}
            />
          ))}
        </div>
      ) : (
        <DistilleryMap
          distilleries={filtered}
          onSelectRegion={(r) => {
            setRegion(r);
            setView("grid");
          }}
        />
      )}
    </>
  );
}
