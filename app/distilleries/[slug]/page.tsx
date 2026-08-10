import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newsletter } from "@/components/Newsletter";
import { distilleries, episodes } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Award, Users, Clock } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return distilleries.map((distillery) => ({ slug: distillery.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const distillery = distilleries.find((d) => d.slug === slug);
  if (!distillery) return { title: "Distillery | Distil-Nation NZ" };
  return {
    title: `${distillery.name} | Distil-Nation NZ`,
    description: distillery.description,
  };
}

export default async function DistilleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const distillery = distilleries.find((d) => d.slug === slug);

  if (!distillery) notFound();

  const relatedEpisode = distillery.episodeSlug
    ? episodes.find((e) => e.slug === distillery.episodeSlug)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Distilleries", href: "/distilleries/" },
            { label: distillery.name },
          ]}
        />

        <div className="rounded-3xl overflow-hidden bg-card border border-border">
          <div className="relative h-[40vh] min-h-[320px]">
            <img
              src={distillery.heroImage}
              alt={distillery.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <div className="flex flex-wrap gap-2 mb-3">
                {distillery.spiritTypes.map((type) => (
                  <Badge key={type} className="bg-gold text-charcoal border-0">
                    {type}
                  </Badge>
                ))}
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-semibold text-offwhite">
                {distillery.name}
              </h1>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <p className="text-lg text-offwhite/90 leading-relaxed">
                {distillery.description}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl bg-background border border-border p-4">
                  <MapPin className="h-5 w-5 text-copper" />
                  <div>
                    <p className="text-sm text-muted-foreground">Region</p>
                    <p className="text-offwhite font-medium">{distillery.region}</p>
                  </div>
                </div>
                {distillery.founded && (
                  <div className="flex items-center gap-3 rounded-2xl bg-background border border-border p-4">
                    <Clock className="h-5 w-5 text-copper" />
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="text-offwhite font-medium">{distillery.founded}</p>
                    </div>
                  </div>
                )}
                {distillery.owners && (
                  <div className="flex items-center gap-3 rounded-2xl bg-background border border-border p-4">
                    <Users className="h-5 w-5 text-copper" />
                    <div>
                      <p className="text-sm text-muted-foreground">Owners</p>
                      <p className="text-offwhite font-medium">{distillery.owners}</p>
                    </div>
                  </div>
                )}
                {distillery.website && (
                  <a
                    href={distillery.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-background border border-border p-4 hover:border-gold/30 transition-colors"
                  >
                    <Globe className="h-5 w-5 text-copper" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <p className="text-offwhite font-medium">{distillery.website}</p>
                    </div>
                  </a>
                )}
              </div>

              {distillery.awards && (
                <div className="space-y-3">
                  <h2 className="font-heading text-2xl font-semibold text-offwhite">Awards</h2>
                  <div className="flex flex-wrap gap-2">
                    {distillery.awards.map((award) => (
                      <Badge
                        key={award}
                        variant="secondary"
                        className="bg-copper/20 text-copper border-0"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        {award}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h2 className="font-heading text-2xl font-semibold text-offwhite">Products</h2>
                <div className="flex flex-wrap gap-2">
                  {distillery.products.map((product) => (
                    <Badge
                      key={product}
                      variant="secondary"
                      className="bg-background text-muted-foreground border border-border"
                    >
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              {relatedEpisode && (
                <div className="space-y-3">
                  <h2 className="font-heading text-2xl font-semibold text-offwhite">Podcast episode</h2>
                  <Link
                    href={`/episodes/${relatedEpisode.slug}/`}
                    className="block rounded-2xl bg-background border border-border p-4 hover:border-gold/30 transition-colors"
                  >
                    <p className="text-gold font-medium">Episode {relatedEpisode.episodeNumber}</p>
                    <p className="text-offwhite font-heading text-xl">{relatedEpisode.title}</p>
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-background border border-border p-5">
                <h2 className="font-heading text-xl font-semibold text-offwhite mb-3">Visitor information</h2>
                <p className="text-muted-foreground">{distillery.visitorInfo || "Contact the distillery for visiting arrangements."}</p>
              </div>
              <div className="rounded-2xl bg-background border border-border p-5 aspect-[4/3] flex items-center justify-center">
                <p className="text-muted-foreground">Google Map placeholder</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
