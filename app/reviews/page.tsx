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
            description="Tasting notes, ratings and recommendations from the Distil-Nation team."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
