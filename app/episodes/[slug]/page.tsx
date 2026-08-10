import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newsletter } from "@/components/Newsletter";
import { getSpreakerEpisodes } from "@/data/spreaker";
import { episodes as fallbackEpisodes } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Play, Headphones, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  const spreakerEpisodes = await getSpreakerEpisodes();
  const all = spreakerEpisodes.length > 0 ? spreakerEpisodes : fallbackEpisodes;
  return all.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spreakerEpisodes = await getSpreakerEpisodes();
  const all = spreakerEpisodes.length > 0 ? spreakerEpisodes : fallbackEpisodes;
  const episode = all.find((e) => e.slug === slug);

  if (!episode) return { title: "Episode | Distil-Nation NZ" };
  return {
    title: `${episode.title} | Distil-Nation NZ`,
    description: episode.summary,
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spreakerEpisodes = await getSpreakerEpisodes();
  const all = spreakerEpisodes.length > 0 ? spreakerEpisodes : fallbackEpisodes;
  const episode = all.find((e) => e.slug === slug);

  if (!episode) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Episodes", href: "/episodes/" },
            { label: episode.title },
          ]}
        />

        <div className="rounded-3xl overflow-hidden bg-card border border-border mb-12">
          <div className="relative aspect-video">
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <Badge className="mb-3 bg-gold text-charcoal border-0">
                Episode {episode.episodeNumber}
              </Badge>
              <h1 className="font-heading text-3xl md:text-5xl font-semibold text-offwhite max-w-3xl">
                {episode.title}
              </h1>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:p-10 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-copper" />
                  {episode.guest}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-copper" />
                  {episode.duration}
                </span>
                <Badge variant="secondary" className="bg-forest/20 text-forest-foreground border-0">
                  {episode.spiritType}
                </Badge>
              </div>
              <p className="text-lg text-offwhite/90 leading-relaxed">
                {episode.summary}
              </p>

              {episode.productsMentioned && (
                <div className="space-y-2">
                  <h2 className="font-heading text-xl font-semibold text-offwhite">Products mentioned</h2>
                  <div className="flex flex-wrap gap-2">
                    {episode.productsMentioned.map((product) => (
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
              )}

              <div className="rounded-2xl bg-background border border-border p-6 aspect-video flex items-center justify-center">
                <p className="text-muted-foreground">YouTube video embed placeholder</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-heading text-xl font-semibold text-offwhite">Transcript</h2>
                <p className="text-muted-foreground">Transcript will appear here.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-xl font-semibold text-offwhite">Listen & watch</h2>
              {episode.youtube && (
                <a
                  href={episode.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-background border border-border p-4 hover:border-gold/30 transition-colors"
                >
                  <Play className="h-5 w-5 text-gold" />
                  <span className="text-offwhite font-medium">Watch on YouTube</span>
                </a>
              )}
              {episode.spotify && (
                <a
                  href={episode.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-background border border-border p-4 hover:border-gold/30 transition-colors"
                >
                  <Headphones className="h-5 w-5 text-gold" />
                  <span className="text-offwhite font-medium">Listen on Spotify</span>
                </a>
              )}
              {episode.spreaker && (
                <a
                  href={episode.spreaker}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-background border border-border p-4 hover:border-gold/30 transition-colors"
                >
                  <Headphones className="h-5 w-5 text-gold" />
                  <span className="text-offwhite font-medium">Listen on Spreaker</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <Newsletter />
      </div>
    </div>
  );
}
