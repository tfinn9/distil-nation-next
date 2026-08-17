import { SectionHeader } from "@/components/SectionHeader";
import { DistilleryGrid } from "@/components/DistilleryGrid";
import { DistilleryStats } from "@/components/DistilleryStats";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { distilleries, regions, spiritTypes, siteConfig } from "@/data/mock";

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
            action={
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Suggest an edit - Distillery listing")}`}
                  className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-offwhite hover:border-gold/50 transition-colors"
                >
                  Suggest an edit
                </a>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Submit a distillery")}`}
                  className="inline-flex items-center rounded-full bg-gold px-5 py-2 text-sm font-medium text-charcoal hover:bg-gold/90 transition-colors"
                >
                  Submit another distillery
                </a>
              </div>
            }
          />

          <DistilleryStats distilleries={distilleries} />

          <DistilleryGrid
            distilleries={distilleries}
            regions={regions}
            spiritTypes={spiritTypes}
          />
        </FadeIn>
      </div>
    </div>
  );
}
