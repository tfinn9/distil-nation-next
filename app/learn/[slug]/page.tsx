import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newsletter } from "@/components/Newsletter";
import { articles } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article | Distil-Nation NZ" };
  return {
    title: `${article.title} | Distil-Nation NZ`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/learn/" },
            { label: article.title },
          ]}
        />

        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Badge className="mb-4 bg-copper text-offwhite border-0">
              {article.category}
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-offwhite mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} read</span>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden mb-10">
            <img
              src={article.image}
              alt={article.title}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-offwhite/90 leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {article.content}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This is a placeholder for the full article content. In a production build this would be loaded from a CMS or a markdown file, with full SEO-friendly markup, a reading progress bar and related articles.
            </p>
          </div>
        </article>

        <div className="mt-16">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
