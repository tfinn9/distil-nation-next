"use client";

import { useState } from "react";
import { FadeIn } from "./FadeIn";
import { regions } from "@/data/mock";

export function MapSection() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <FadeIn>
      <div className="rounded-3xl bg-card border border-border p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold text-offwhite">
              Explore by region
            </h3>
            <p className="text-muted-foreground">
              Hover over the map to see New Zealand&apos;s growing craft spirits landscape. Click a region to filter distilleries.
            </p>
            <div className="flex flex-wrap gap-2">
              {regions.filter((r) => r !== "All").map((region) => (
                <button
                  key={region}
                    onClick={() => setActiveRegion(region === activeRegion ? null : region)}
                    className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    activeRegion === region
                      ? "bg-copper text-offwhite"
                      : "bg-background text-muted-foreground hover:text-offwhite hover:bg-muted"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            {activeRegion && (
              <p className="text-gold font-medium">
                Selected: {activeRegion}
              </p>
            )}
          </div>
          <div className="relative flex items-center justify-center rounded-2xl bg-background p-8">
            <svg
              viewBox="0 0 120 180"
              className="h-auto w-full max-w-[320px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified NZ North & South Island shapes */}
              <path
                d="M45 20 C60 15 80 25 85 45 C90 65 70 85 50 90 C35 95 20 80 25 60 C28 45 35 25 45 20 Z"
                className={`transition-colors duration-300 ${
                  activeRegion === "Auckland" ? "fill-copper" : "fill-forest/60"
                }`}
              />
              <path
                d="M30 95 C45 90 65 100 70 120 C75 140 55 165 35 170 C20 175 10 155 15 130 C18 110 25 100 30 95 Z"
                className={`transition-colors duration-300 ${
                  activeRegion === "Otago" || activeRegion === "Central Otago" || activeRegion === "Canterbury"
                    ? "fill-copper"
                    : "fill-forest/60"
                }`}
              />
              <circle cx="55" cy="55" r="3" className="fill-gold" />
              <circle cx="45" cy="130" r="3" className="fill-gold" />
              <circle cx="35" cy="115" r="3" className="fill-gold" />
            </svg>
            <span className="absolute bottom-4 right-4 text-xs text-muted-foreground">
              Interactive map placeholder
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
