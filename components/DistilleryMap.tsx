"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Distillery } from "@/types";

interface RegionPoint {
  region: string;
  lat: number;
  lng: number;
  count: number;
}

export function DistilleryMap({
  distilleries,
  onSelectRegion,
}: {
  distilleries: Distillery[];
  onSelectRegion: (region: string) => void;
}) {
  const points = useMemo<RegionPoint[]>(() => {
    const map = new Map<string, RegionPoint>();
    for (const d of distilleries) {
      if (d.lat == null || d.lng == null) continue;
      const existing = map.get(d.region);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(d.region, { region: d.region, lat: d.lat, lng: d.lng, count: 1 });
      }
    }
    return Array.from(map.values());
  }, [distilleries]);

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
          return (
            <CircleMarker
              key={p.region}
              center={[p.lat, p.lng]}
              radius={radius}
              pathOptions={{
                color: "#d4af37",
                fillColor: "#d4af37",
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
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <p className="bg-card px-4 py-2 text-xs text-muted-foreground border-t border-border">
        Markers are positioned at each region&apos;s approximate centre — click a marker to filter the list by that region.
      </p>
    </div>
  );
}
