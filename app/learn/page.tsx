import { SectionHeader } from "@/components/SectionHeader";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { articles } from "@/data/mock";

export const metadata = {
  title: "Learn | Distil-Nation NZ",
  description: "Guides and articles about New Zealand craft spirits.",
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn" }]} />
        <FadeIn>
          <SectionHeader
            title="Learn"
            description="Knowledge and stories from the world of New Zealand craft spirits."
          />
          <div className="rounded-3xl bg-card border border-border p-12 text-center">
            <h3 className="font-heading text-2xl font-semibold text-offwhite mb-2">Knowledge base coming soon</h3>
            <p className="text-muted-foreground">We&apos;re putting together guides and articles on New Zealand craft spirits. Check back shortly.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
