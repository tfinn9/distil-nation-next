import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { NewsArticleCard } from "@/components/NewsArticleCard";
import { getAllNewsArticles } from "@/lib/news";

export const metadata = {
  title: "News | Distil-Nation NZ",
  description: "News from New Zealand's craft spirits industry — new releases, distillery openings, awards, and the stories shaping the scene.",
};

export default function NewsPage() {
  const articles = getAllNewsArticles();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />
        <FadeIn>
          <SectionHeader
            title="News"
            description="What's happening across New Zealand's craft spirits industry."
          />
          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-card border border-border p-12 text-center">
              <h3 className="font-heading text-2xl font-semibold text-offwhite mb-2">No news yet</h3>
              <p className="text-muted-foreground">Check back soon for updates from the New Zealand craft spirits industry.</p>
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
