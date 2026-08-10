import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newsletter } from "@/components/Newsletter";
import { reviews } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

export function generateStaticParams() {
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = reviews.find((r) => r.slug === slug);
  if (!review) return { title: "Review | Distil-Nation NZ" };
  return {
    title: `${review.name} | Distil-Nation NZ`,
    description: `Review of ${review.name} from ${review.distillery}.`,
  };
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = reviews.find((r) => r.slug === slug);

  if (!review) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Reviews", href: "/reviews/" },
            { label: review.name },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden bg-card border border-border">
            <img
              src={review.image}
              alt={review.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <Badge className="mb-3 bg-copper text-offwhite border-0">
                {review.spiritType}
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-offwhite mb-2">
                {review.name}
              </h1>
              <p className="text-muted-foreground text-lg">{review.distillery}</p>
            </div>

            <div className="flex items-center gap-2 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(review.rating) ? "fill-gold" : "fill-transparent"
                  }`}
                />
              ))}
              <span className="ml-2 text-2xl font-heading font-semibold text-offwhite">
                {review.rating}/5
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "Nose", text: review.nose },
                { label: "Palate", text: review.palate },
                { label: "Finish", text: review.finish },
              ].map(
                (section) =>
                  section.text && (
                    <div key={section.label} className="rounded-2xl bg-card border border-border p-5">
                      <h2 className="font-heading text-xl font-semibold text-offwhite mb-1">
                        {section.label}
                      </h2>
                      <p className="text-muted-foreground">{section.text}</p>
                    </div>
                  )
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {review.pros && review.pros.length > 0 && (
                <div className="rounded-2xl bg-forest/10 border border-forest/20 p-5">
                  <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-offwhite mb-2">
                    <ThumbsUp className="h-4 w-4 text-forest" />
                    Pros
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {review.pros.map((pro) => (
                      <li key={pro}>{pro}</li>
                    ))}
                  </ul>
                </div>
              )}
              {review.cons && review.cons.length > 0 && (
                <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-5">
                  <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-offwhite mb-2">
                    <ThumbsDown className="h-4 w-4 text-destructive" />
                    Cons
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {review.cons.map((con) => (
                      <li key={con}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {review.recommendedFor && review.recommendedFor.length > 0 && (
              <div className="space-y-2">
                <h2 className="font-heading text-xl font-semibold text-offwhite">Recommended for</h2>
                <div className="flex flex-wrap gap-2">
                  {review.recommendedFor.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="bg-gold/20 text-gold border-0"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
