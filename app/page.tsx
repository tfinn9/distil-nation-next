import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { EpisodeCard } from "@/components/EpisodeCard";
import { DistilleryCard } from "@/components/DistilleryCard";
import { SubscribeCard } from "@/components/SubscribeCard";
import { Newsletter } from "@/components/Newsletter";
import { MapSection } from "@/components/MapSection";
import { FadeIn } from "@/components/FadeIn";
import { CTABanner } from "@/components/CTABanner";
import { KbArticleCard } from "@/components/KbArticleCard";
import { NewsArticleCard } from "@/components/NewsArticleCard";
import { episodes as fallbackEpisodes, distilleries, siteConfig } from "@/data/mock";
import { spirits } from "@/data/spirits";
import { getSpreakerEpisodes } from "@/data/spreaker";
import { getAllKbArticles } from "@/lib/kb";
import { getAllNewsArticles } from "@/lib/news";
import { Youtube, Headphones, Mail, Compass, Map, Award, Wine, MapPin, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Distil-Nation NZ | Discover New Zealand's Craft Spirits",
  description: "Explore New Zealand's craft distilleries. Collect the spirits you've tried. Complete quests. Build your NZ Spirits Passport.",
};

export default async function Home() {
  const spreakerEpisodes = await getSpreakerEpisodes();
  const featuredEpisode = spreakerEpisodes[0] || fallbackEpisodes[0];
  const featuredArticles = getAllKbArticles().slice(0, 3);
  const latestNews = getAllNewsArticles().slice(0, 3);
  return (
    <>
      <Hero />

      {/* Passport Showcase */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-gold font-medium text-sm tracking-wider uppercase mb-3">NZ Spirits Passport</p>
              <h2 className="font-heading text-3xl md:text-5xl font-semibold text-offwhite mb-4">
                Your NZ spirits journey starts here
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Track the distilleries you&apos;ve visited, collect the spirits you&apos;ve tried, earn badges and complete quests across New Zealand.
              </p>
            </div>

            {/* Demo Passport Card */}
            <div className="max-w-lg mx-auto mb-12">
              <div className="rounded-3xl bg-background border border-border p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                    <span className="font-heading text-xl font-bold text-gold">T</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-offwhite">Tom</h3>
                    <p className="text-sm text-gold">Canterbury Explorer</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl bg-card border border-border p-3 text-center">
                    <p className="text-xl font-heading font-semibold text-gold">12</p>
                    <p className="text-[11px] text-muted-foreground">Distilleries</p>
                  </div>
                  <div className="rounded-xl bg-card border border-border p-3 text-center">
                    <p className="text-xl font-heading font-semibold text-gold">31</p>
                    <p className="text-[11px] text-muted-foreground">Spirits</p>
                  </div>
                  <div className="rounded-xl bg-card border border-border p-3 text-center">
                    <p className="text-xl font-heading font-semibold text-gold">4</p>
                    <p className="text-[11px] text-muted-foreground">Badges</p>
                  </div>
                </div>
                <div className="flex gap-2 overflow-hidden">
                  {spirits.slice(0, 3).map((spirit) => (
                    <div key={spirit.id} className="flex-1 rounded-xl bg-card border border-gold/20 p-3 text-center">
                      <div className="h-8 w-8 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-1.5">
                        <Wine className="h-4 w-4 text-gold" />
                      </div>
                      <p className="text-xs font-medium text-offwhite truncate">{spirit.name}</p>
                      <p className="text-[10px] text-muted-foreground">{spirit.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto mb-8">
              <div className="rounded-2xl bg-background border border-border p-5 text-center">
                <MapPin className="h-6 w-6 text-copper mx-auto mb-2" />
                <h4 className="font-heading text-base font-semibold text-offwhite mb-1">Track Visits</h4>
                <p className="text-xs text-muted-foreground">Mark distilleries you&apos;ve visited and watch your map fill in.</p>
              </div>
              <div className="rounded-2xl bg-background border border-border p-5 text-center">
                <Wine className="h-6 w-6 text-gold mx-auto mb-2" />
                <h4 className="font-heading text-base font-semibold text-offwhite mb-1">Collect Spirits</h4>
                <p className="text-xs text-muted-foreground">Build your collection of NZ spirits with tasteful spirit cards.</p>
              </div>
              <div className="rounded-2xl bg-background border border-border p-5 text-center">
                <Award className="h-6 w-6 text-forest mx-auto mb-2" />
                <h4 className="font-heading text-base font-semibold text-offwhite mb-1">Earn Badges</h4>
                <p className="text-xs text-muted-foreground">Unlock achievements as you explore NZ&apos;s craft spirit scene.</p>
              </div>
              <div className="rounded-2xl bg-background border border-border p-5 text-center">
                <Compass className="h-6 w-6 text-copper mx-auto mb-2" />
                <h4 className="font-heading text-base font-semibold text-offwhite mb-1">Complete Quests</h4>
                <p className="text-xs text-muted-foreground">Follow discovery quests across regions and categories.</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/passport"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-base font-semibold text-charcoal hover:bg-gold/90 transition-colors"
              >
                <Compass className="h-5 w-5" />
                Start Your Passport
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

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
            title="Latest news"
            description="What's happening across New Zealand's craft spirits industry."
            action={
              <Link
                href="/news/"
                className="text-gold font-medium hover:text-gold/80 transition-colors"
              >
                All news →
              </Link>
            }
          />
          {latestNews.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((article) => (
                <NewsArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-background border border-border p-12 text-center">
              <h3 className="font-heading text-2xl font-semibold text-offwhite mb-2">No news yet</h3>
              <p className="text-muted-foreground">Check back soon for updates from the New Zealand craft spirits industry.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <KbArticleCard key={article.slug} article={article} />
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
          <div className="rounded-3xl bg-card border border-border p-12 text-center">
            <h3 className="font-heading text-2xl font-semibold text-offwhite mb-2">Reviews coming soon</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">We&apos;re working through our first set of bottle reviews. Check back shortly for honest tasting notes.</p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
