import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newsletter } from "@/components/Newsletter";
import { getAllNewsArticles, getNewsArticleBySlug } from "@/lib/news";
import { formatNewsDate } from "@/lib/format-date";
import { CalendarDays } from "lucide-react";

export function generateStaticParams() {
  return getAllNewsArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);
  if (!article) return { title: "News | Distil-Nation NZ" };
  return {
    title: `${article.title} | Distil-Nation NZ`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "News", href: "/news/" },
            { label: article.title },
          ]}
        />

        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-offwhite mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatNewsDate(article.date)}
              </span>
              {article.author && <span>By {article.author}</span>}
            </div>
          </div>

          {article.image && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-border">
              <img src={article.image} alt={article.title} className="w-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-offwhite/90 leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>
        </article>

        <div className="mt-16">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
