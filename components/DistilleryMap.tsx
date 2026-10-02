"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Distillery } from "@/types";
import type { PassportEntry } from "@/types/passport";

interface RegionPoint {
  region: string;
  lat: number;
  lng: number;
  count: number;
  visited: number;
}

export function DistilleryMap({
  distilleries,
  onSelectRegion,
  passportEntries,
}: {
  distilleries: Distillery[];
  onSelectRegion: (region: string) => void;
  passportEntries?: Record<string, PassportEntry>;
}) {
  const visitedSlugs = useMemo(() => {
    if (!passportEntries) return new Set<string>();
    return new Set(
      Object.values(passportEntries)
        .filter((e) => e.statuses.includes("visited"))
        .map((e) => e.distillery_slug)
    );
  }, [passportEntries]);

  const points = useMemo<RegionPoint[]>(() => {
    const map = new Map<string, RegionPoint>();
    for (const d of distilleries) {
      if (d.lat == null || d.lng == null) continue;
      const existing = map.get(d.region);
      if (existing) {
        existing.count += 1;
        if (visitedSlugs.has(d.slug)) existing.visited += 1;
      } else {
        map.set(d.region, {
          region: d.region,
          lat: d.lat,
          lng: d.lng,
          count: 1,
          visited: visitedSlugs.has(d.slug) ? 1 : 0,
        });
      }
    }
    return Array.from(map.values());
  }, [distilleries, visitedSlugs]);

  const maxCount = Math.max(1, ...points.map((p) => p.count));

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <MapContainer
        center={[-41.2, 173.5]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "520px", width: "100%", background: "#1a1a1a" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => {
          const radius = 10 + (p.count / maxCount) * 22;
          const hasVisits = p.visited > 0;
          const allVisited = p.visited === p.count;
          const color = allVisited ? "#355C4A" : hasVisits ? "#B87333" : "#d4af37";

          return (
            <CircleMarker
              key={p.region}
              center={[p.lat, p.lng]}
              radius={radius}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.55,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onSelectRegion(p.region),
              }}
            >
              <Tooltip direction="top" offset={[0, -radius]}>
                <span className="font-medium">
                  {p.region} — {p.count} distiller{p.count !== 1 ? "ies" : "y"}
                  {hasVisits && ` (${p.visited} visited)`}
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <div className="bg-card px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground border-t border-border">
        <span>Click a marker to filter by region.</span>
        {passportEntries && Object.keys(passportEntries).length > 0 && (
          <span className="flex items-center gap-3 ml-auto">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#d4af37]" /> Not visited</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#B87333]" /> Partially visited</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-[#355C4A]" /> All visited</span>
          </span>
        )}
      </div>
    </div>
  );
}
