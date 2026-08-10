import { SectionHeader } from "@/components/SectionHeader";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { getSpreakerEpisodes } from "@/data/spreaker";
import { episodes as fallbackEpisodes } from "@/data/mock";

export const metadata = {
  title: "Episodes | Distil-Nation NZ",
  description: "Browse every episode of the Distil-Nation NZ podcast.",
};

export default async function EpisodesPage() {
  const spreakerEpisodes = await getSpreakerEpisodes();
  const episodes = spreakerEpisodes.length > 0 ? spreakerEpisodes : fallbackEpisodes;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Episodes" }]} />
        <FadeIn>
          <SectionHeader
            title="All episodes"
            description="Conversations with the people shaping New Zealand's craft spirits industry."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
