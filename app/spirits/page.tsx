import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Newsletter } from "@/components/Newsletter";
import { SpiritsGrid } from "@/components/SpiritsGrid";
import { spirits } from "@/data/spirits";
import { distilleries } from "@/data/mock";
import { SPIRIT_CATEGORIES } from "@/types/passport";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata = {
  title: "NZ Spirits | Distil-Nation NZ",
};

export default async function SpiritsPage() {
  const stats = [
    { label: "Spirits", value: spirits.length },
    { label: "Categories", value: SPIRIT_CATEGORIES.length },
    { label: "Distilleries", value: distilleries.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-20 md:px-6">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Spirits" }]}
        />

        <SectionHeader
          title="New Zealand Spirits"
          description="Discover the gins, whiskies, rums, vodkas and liqueurs being crafted across Aotearoa New Zealand."
        />

        <dl className="mb-10 grid overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-border px-6 py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
            >
              <dt className="text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-1 font-heading text-3xl font-semibold text-gold">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <SpiritsGrid spirits={spirits} distilleries={distilleries} />

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground text-sm mb-3">
            Know a New Zealand spirit we haven&apos;t listed?
          </p>
          <Link
            href="/submit-spirit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Submit a Spirit
          </Link>
        </div>

        <div className="mt-16">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
