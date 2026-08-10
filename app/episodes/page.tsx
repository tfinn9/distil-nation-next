import { SectionHeader } from "@/components/SectionHeader";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { episodes } from "@/data/mock";

export const metadata = {
  title: "Episodes | Distil-Nation NZ",
  description: "Browse every episode of the Distil-Nation NZ podcast.",
};

export default function EpisodesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Episodes" }]} />
        <FadeIn>
          <SectionHeader
            title="All episodes"
            description="Conversations with the people shaping New Zealand's craft spirits industry."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
