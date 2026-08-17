"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FadeIn } from "./FadeIn";
import { distilleries } from "@/data/mock";

const DistilleryMap = dynamic(() => import("./DistilleryMap").then((m) => m.DistilleryMap), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] rounded-2xl border border-border bg-background flex items-center justify-center text-muted-foreground">
      Loading map…
    </div>
  ),
});

export function MapSection() {
  const router = useRouter();

  return (
    <FadeIn>
      <div className="rounded-3xl bg-card border border-border p-6 md:p-10 space-y-6">
        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-semibold text-offwhite">
            Explore by region
          </h3>
          <p className="text-muted-foreground">
            Click a marker to see who&apos;s distilling in that part of the country.
          </p>
        </div>
        <DistilleryMap
          distilleries={distilleries}
          onSelectRegion={(region) => router.push(`/distilleries/?region=${encodeURIComponent(region)}`)}
        />
      </div>
    </FadeIn>
  );
}
