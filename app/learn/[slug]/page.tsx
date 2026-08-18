import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newsletter } from "@/components/Newsletter";
import { getAllKbArticles, getKbArticleBySlug } from "@/lib/kb";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

export function generateStaticParams() {
  return getAllKbArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getKbArticleBySlug(slug);
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
  const article = getKbArticleBySlug(slug);

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

          {article.status && article.status !== "verified" && (
            <div className="mb-8 flex items-start gap-3 rounded-2xl bg-copper/10 border border-copper/30 p-4">
              <AlertTriangle className="h-5 w-5 text-copper flex-shrink-0 mt-0.5" />
              <p className="text-sm text-offwhite/90">
                This is a general framework, not verified, current specifics — confirm details directly
                with the relevant distillery or authority before relying on them.
              </p>
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
