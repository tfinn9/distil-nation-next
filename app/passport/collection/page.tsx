import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CollectionGrid } from "@/components/CollectionGrid";
import { distilleries } from "@/data/mock";
import { spirits } from "@/data/spirits";
import { getDistilleryProgress } from "@/lib/passport";
import type { SpiritTasting } from "@/types/passport";
import Link from "next/link";
import { Wine, Heart, Star } from "lucide-react";

export const metadata = {
  title: "My Collection | Distil-Nation NZ",
};

export default async function CollectionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: tastingRows } = await supabase
    .from("spirit_tastings")
    .select("*")
    .order("updated_at", { ascending: false });

  const tastings = (tastingRows ?? []) as SpiritTasting[];

  const collectedCount = tastings.filter(
    (t) => t.status === "tried" || t.status === "favourite"
  ).length;
  const wantToTryCount = tastings.filter(
    (t) => t.status === "want_to_try"
  ).length;
  const completionPct =
    spirits.length > 0
      ? Math.round((collectedCount / spirits.length) * 100)
      : 0;

  const distilleriesWithSpirits = distilleries
    .map((d) => ({
      distillery: d,
      progress: getDistilleryProgress(d.slug, tastings, spirits),
    }))
    .filter((row) => row.progress.total > 0)
    .sort((a, b) => b.progress.percentage - a.progress.percentage);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Passport", href: "/passport/" },
            { label: "My Collection" },
          ]}
        />

        <div className="mb-8">
          <h1 className="font-heading text-3xl font-semibold text-offwhite">
            My Collection
          </h1>
          <p className="text-sm text-muted-foreground">
            Every New Zealand spirit you&apos;ve discovered, in one place.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Wine className="mx-auto mb-2 h-5 w-5 text-copper" />
            <p className="font-heading text-2xl font-semibold text-gold">
              {collectedCount}
            </p>
            <p className="text-xs text-muted-foreground">Collected</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Heart className="mx-auto mb-2 h-5 w-5 text-copper" />
            <p className="font-heading text-2xl font-semibold text-gold">
              {wantToTryCount}
            </p>
            <p className="text-xs text-muted-foreground">Want to Try</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Star className="mx-auto mb-2 h-5 w-5 text-copper" />
            <p className="font-heading text-2xl font-semibold text-gold">
              {completionPct}%
            </p>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>

        {/* Distillery completion */}
        {distilleriesWithSpirits.length > 0 && (
          <div className="mb-8 rounded-3xl border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-xl font-semibold text-offwhite">
              Distillery completion
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {distilleriesWithSpirits.map(({ distillery, progress }) => (
                <div key={distillery.slug}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <Link
                      href={`/distilleries/${distillery.slug}/`}
                      className="font-medium text-offwhite transition-colors hover:text-gold"
                    >
                      {distillery.name}
                    </Link>
                    <span className="text-muted-foreground">
                      {progress.tried}/{progress.total}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-background">
                    <div
                      className="h-full rounded-full bg-gold transition-all"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <CollectionGrid spirits={spirits} tastings={tastings} />
      </div>
    </div>
  );
}
