import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { KbGrid } from "@/components/KbGrid";
import { getAllKbArticles, getKbCategories } from "@/lib/kb";

export const metadata = {
  title: "Learn | Distil-Nation NZ",
  description: "Guides and articles about New Zealand craft spirits — buying guides, distilling production, cocktails, tourism and more.",
};

export default function LearnPage() {
  const articles = getAllKbArticles();
  const categories = getKbCategories();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn" }]} />
        <FadeIn>
          <SectionHeader
            title="Learn"
            description="Knowledge and stories from the world of New Zealand craft spirits."
          />
          <KbGrid articles={articles} categories={categories} />
        </FadeIn>
      </div>
    </div>
  );
}
