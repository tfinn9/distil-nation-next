import { SectionHeader } from "@/components/SectionHeader";
import { DistilleryGrid } from "@/components/DistilleryGrid";
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
