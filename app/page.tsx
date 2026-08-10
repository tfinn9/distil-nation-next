import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { EpisodeCard } from "@/components/EpisodeCard";
import { DistilleryCard } from "@/components/DistilleryCard";
import { ArticleCard } from "@/components/ArticleCard";
import { ReviewCard } from "@/components/ReviewCard";
import { SubscribeCard } from "@/components/SubscribeCard";
import { Newsletter } from "@/components/Newsletter";
import { MapSection } from "@/components/MapSection";
import { FadeIn } from "@/components/FadeIn";
import { CTABanner } from "@/components/CTABanner";
import { episodes as fallbackEpisodes, distilleries, articles, reviews, siteConfig } from "@/data/mock";
import { getSpreakerEpisodes } from "@/data/spreaker";
import { Youtube, Headphones, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Distil-Nation NZ | Discover New Zealand's Craft Spirits",
  description: siteConfig.description,
};

export default async function Home() {
  const spreakerEpisodes = await getSpreakerEpisodes();
  const featuredEpisode = spreakerEpisodes[0] || fallbackEpisodes[0];
  return (
    <>
      <Hero />

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <SectionHeader
              title="Featured episode"
              badge="Latest"
              action={
                <Link
                  href="/episodes/"
                  className="text-gold font-medium hover:text-gold/80 transition-colors"
                >
                  View all episodes →
                </Link>
              }
            />
            <EpisodeCard episode={featuredEpisode} featured />
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title="Explore New Zealand"
            description="The craft spirits scene is growing from the Bay of Islands to the Southern Lakes."
          />
          <MapSection />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title="Featured distilleries"
            description="Meet the makers behind New Zealand's most exciting craft spirits."
            action={
              <Link
                href="/distilleries/"
                className="text-gold font-medium hover:text-gold/80 transition-colors"
              >
                Browse all →
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {distilleries.slice(0, 3).map((distillery) => (
              <DistilleryCard key={distillery.slug} distillery={distillery} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title="Learn"
            description="The knowledge hub for understanding New Zealand spirits."
            action={
              <Link
                href="/learn/"
                className="text-gold font-medium hover:text-gold/80 transition-colors"
              >
                All articles →
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.slice(0, 4).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title="Latest reviews"
            description="Honest tasting notes from the Distil-Nation NZ hosts."
            action={
              <Link
                href="/reviews/"
                className="text-gold font-medium hover:text-gold/80 transition-colors"
              >
                More reviews →
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <CTABanner
            title="Subscribe to the podcast"
            description="Catch every episode on your favourite platform."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SubscribeCard
                title="YouTube"
                description="Watch full video episodes."
                href={siteConfig.youtube}
                icon={<Youtube className="h-6 w-6" />}
                colorClass="bg-red-600/20 text-red-400"
              />
              <SubscribeCard
                title="Spotify"
                description="Listen on the go."
                href={siteConfig.spotify}
                icon={<Headphones className="h-6 w-6" />}
                colorClass="bg-green-600/20 text-green-400"
              />
              <SubscribeCard
                title="Newsletter"
                description="Get episodes in your inbox."
                href={`mailto:${siteConfig.email}`}
                icon={<Mail className="h-6 w-6" />}
                colorClass="bg-copper/20 text-copper"
              />
            </div>
          </CTABanner>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
