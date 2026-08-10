import { SectionHeader } from "@/components/SectionHeader";
import { DistilleryCard } from "@/components/DistilleryCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { distilleries, regions, spiritTypes } from "@/data/mock";

export const metadata = {
  title: "Distillery Directory | Distil-Nation NZ",
  description: "Browse New Zealand's craft distilleries by region and spirit type.",
};

export default function DistilleriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Distilleries" }]}
        />
        <FadeIn>
          <SectionHeader
            title="Distillery directory"
            description="The people and places behind New Zealand's most exciting craft spirits."
          />

          <div className="flex flex-wrap gap-3 mb-8">
            {regions.map((region) => (
              <span
                key={region}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
              >
                {region}
              </span>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {distilleries.map((distillery) => (
              <DistilleryCard key={distillery.slug} distillery={distillery} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
