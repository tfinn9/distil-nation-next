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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
