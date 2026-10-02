import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { spirits as seedSpirits } from "@/data/spirits";
import { distilleries } from "@/data/mock";
import type { Spirit } from "@/types/passport";
import { RELEASE_STATUS_LABELS } from "@/types/passport";
import Link from "next/link";
import { Wine, Plus, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Manage Spirits | Distil-Nation NZ",
};

export default async function AdminSpiritsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/");

  // Try DB first, fallback to seed
  const { data: dbSpirits } = await supabase
    .from("spirits")
    .select("*")
    .order("name");

  const allSpirits: Spirit[] = (dbSpirits && dbSpirits.length > 0 ? dbSpirits : seedSpirits) as Spirit[];

  // Group by distillery
  const byDistillery: Record<string, Spirit[]> = {};
  allSpirits.forEach((s) => {
    if (!byDistillery[s.distillery_slug]) byDistillery[s.distillery_slug] = [];
    byDistillery[s.distillery_slug].push(s);
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Spirits" }]} />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-offwhite">Spirits Database</h1>
            <p className="text-muted-foreground text-sm">{allSpirits.length} spirits across {Object.keys(byDistillery).length} distilleries</p>
          </div>
        </div>

        <p className="rounded-xl bg-gold/10 border border-gold/20 p-4 text-sm text-gold/90 mb-8">
          Spirits are currently loaded from seed data. To manage spirits in the database, run the seed migration or add spirits via the Supabase dashboard.
        </p>

        {Object.entries(byDistillery)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([slug, groupSpirits]) => {
            const distillery = distilleries.find((d) => d.slug === slug);
            return (
              <div key={slug} className="mb-8">
                <h2 className="font-heading text-lg font-semibold text-offwhite mb-3 flex items-center gap-2">
                  <Wine className="h-4 w-4 text-gold" />
                  {distillery?.name || slug}
                  <span className="text-sm text-muted-foreground font-normal">({groupSpirits.length})</span>
                </h2>
                <div className="space-y-2">
                  {groupSpirits.map((spirit) => (
                    <div key={spirit.id} className="rounded-xl bg-card border border-border px-4 py-3 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-offwhite font-medium truncate">{spirit.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{spirit.category}</span>
                          {spirit.abv && <span>{spirit.abv}% ABV</span>}
                          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                            {RELEASE_STATUS_LABELS[spirit.release_status as keyof typeof RELEASE_STATUS_LABELS] || spirit.release_status}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/spirits/${spirit.slug}/`}
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
