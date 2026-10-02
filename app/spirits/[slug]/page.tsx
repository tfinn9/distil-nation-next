import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  Calendar,
  ExternalLink,
  MapPin,
  Percent,
  Wine,
} from "lucide-react";
import { AddToPassportButton } from "@/components/AddToPassportButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Newsletter } from "@/components/Newsletter";
import { SpiritCard } from "@/components/SpiritCard";
import { Badge } from "@/components/ui/badge";
import { distilleries } from "@/data/mock";
import {
  getSpiritBySlug,
  getSpiritsByDistillery,
  spirits,
} from "@/data/spirits";
import { RELEASE_STATUS_LABELS } from "@/types/passport";
import type { ReleaseStatus, Spirit } from "@/types/passport";

const categoryStyles: Record<Spirit["category"], string> = {
  Gin: "bg-forest/25 text-offwhite",
  Whisky: "bg-copper/25 text-copper",
  Rum: "bg-gold/20 text-gold",
  Vodka: "bg-sky-900/40 text-sky-200",
  Liqueur: "bg-purple-900/40 text-purple-200",
  Other: "bg-muted text-muted-foreground",
};

const releaseStyles: Record<ReleaseStatus, string> = {
  core_range: "bg-forest/25 text-offwhite",
  seasonal: "bg-gold/20 text-gold",
  limited: "bg-copper/25 text-copper",
  discontinued: "bg-muted text-muted-foreground",
  historic: "bg-muted text-muted-foreground",
};

export function generateStaticParams() {
  return spirits.map((spirit) => ({ slug: spirit.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spirit = getSpiritBySlug(slug);

  if (!spirit) return { title: "Spirit | Distil-Nation NZ" };

  return {
    title: `${spirit.name} | Distil-Nation NZ`,
    description:
      spirit.description ??
      `Discover ${spirit.name}, a New Zealand ${spirit.category.toLowerCase()}.`,
  };
}

export default async function SpiritPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spirit = getSpiritBySlug(slug);

  if (!spirit) notFound();

  const distillery = distilleries.find(
    (item) => item.slug === spirit.distillery_slug,
  );
  const distilleryName = distillery?.name ?? spirit.distillery_slug;
  const relatedSpirits = getSpiritsByDistillery(spirit.distillery_slug).filter(
    (item) => item.id !== spirit.id,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-20 md:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Spirits", href: "/spirits/" },
            { label: spirit.name },
          ]}
        />

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(280px,420px)_1fr]">
          <div>
            <SpiritCard spirit={spirit} unlocked />
          </div>

          <div className="grid gap-8 xl:grid-cols-[1fr_280px]">
            <main className="space-y-8">
              <header>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge
                    className={`${categoryStyles[spirit.category]} border-0`}
                  >
                    {spirit.category}
                    {spirit.subcategory ? ` · ${spirit.subcategory}` : ""}
                  </Badge>
                  <Badge
                    className={`${releaseStyles[spirit.release_status]} border-0`}
                  >
                    {RELEASE_STATUS_LABELS[spirit.release_status]}
                  </Badge>
                </div>
                <h1 className="font-heading text-4xl font-semibold text-offwhite md:text-5xl">
                  {spirit.name}
                </h1>
                <Link
                  href={`/distilleries/${spirit.distillery_slug}/`}
                  className="mt-2 inline-block text-lg text-gold transition-colors hover:text-gold/80"
                >
                  {distilleryName}
                </Link>
                {spirit.region && (
                  <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-copper" />
                    {spirit.region}
                  </p>
                )}
              </header>

              {(spirit.abv !== null ||
                spirit.age_statement ||
                spirit.cask_info ||
                spirit.release_year !== null) && (
                <dl className="grid gap-3 sm:grid-cols-2">
                  {spirit.abv !== null && (
                    <Detail icon={Percent} label="ABV" value={`${spirit.abv}%`} />
                  )}
                  {spirit.age_statement && (
                    <Detail
                      icon={Calendar}
                      label="Age statement"
                      value={spirit.age_statement}
                    />
                  )}
                  {spirit.cask_info && (
                    <Detail icon={Wine} label="Cask" value={spirit.cask_info} />
                  )}
                  {spirit.release_year !== null && (
                    <Detail
                      icon={Calendar}
                      label="Release year"
                      value={String(spirit.release_year)}
                    />
                  )}
                </dl>
              )}

              {spirit.description && (
                <section>
                  <h2 className="mb-2 font-heading text-2xl font-semibold text-offwhite">
                    About this spirit
                  </h2>
                  <p className="text-lg leading-relaxed text-offwhite/80">
                    {spirit.description}
                  </p>
                </section>
              )}

              {spirit.botanicals && spirit.botanicals.length > 0 && (
                <TagSection title="Botanicals" items={spirit.botanicals} />
              )}

              {spirit.awards && spirit.awards.length > 0 && (
                <section>
                  <h2 className="mb-3 font-heading text-2xl font-semibold text-offwhite">
                    Awards
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {spirit.awards.map((award) => (
                      <Badge
                        key={award}
                        className="border-0 bg-gold/20 text-gold"
                      >
                        <Award className="mr-1 h-3.5 w-3.5" />
                        {award}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              {(spirit.official_url || spirit.review_slug) && (
                <div className="flex flex-wrap gap-3">
                  {spirit.official_url && (
                    <a
                      href={spirit.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-offwhite transition-colors hover:border-gold/50"
                    >
                      Official website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {spirit.review_slug && (
                    <Link
                      href={`/reviews/${spirit.review_slug}/`}
                      className="inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-gold/90"
                    >
                      Read our review
                    </Link>
                  )}
                </div>
              )}
            </main>

            <aside>
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
                <AddToPassportButton spirit={spirit} />
              </div>
            </aside>
          </div>
        </div>

        {relatedSpirits.length > 0 && (
          <section className="mx-auto mt-16 max-w-6xl">
            <h2 className="mb-6 font-heading text-3xl font-semibold text-offwhite">
              More from this distillery
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedSpirits.map((relatedSpirit) => (
                <SpiritCard
                  key={relatedSpirit.id}
                  spirit={relatedSpirit}
                  unlocked
                  small
                />
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto mt-16 max-w-6xl">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Percent;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <Icon className="h-5 w-5 shrink-0 text-copper" />
      <div>
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="font-medium text-offwhite">{value}</dd>
      </div>
    </div>
  );
}

function TagSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="mb-3 font-heading text-2xl font-semibold text-offwhite">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="border border-border bg-card text-offwhite"
          >
            {item}
          </Badge>
        ))}
      </div>
    </section>
  );
}
