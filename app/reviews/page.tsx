import { SectionHeader } from "@/components/SectionHeader";
import { ReviewCard } from "@/components/ReviewCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { reviews } from "@/data/mock";

export const metadata = {
  title: "Reviews | Distil-Nation NZ",
  description: "Honest tasting notes and reviews of New Zealand craft spirits.",
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />
        <FadeIn>
          <SectionHeader
            title="Bottle reviews"
            description="Tasting notes, ratings and recommendations from the Distil-Nation NZ team."
          />
          <div className="rounded-3xl bg-card border border-border p-12 text-center">
            <h3 className="font-heading text-2xl font-semibold text-offwhite mb-2">Reviews coming soon</h3>
            <p className="text-muted-foreground">We&apos;re working through our first set of bottle reviews. Check back shortly for honest tasting notes.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
