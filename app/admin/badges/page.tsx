import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Badge } from "@/types/passport";
import { Award, Check, X } from "lucide-react";

export const metadata = {
  title: "Manage Badges | Distil-Nation NZ",
};

export default async function AdminBadgesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/");

  const { data: badges } = await supabase
    .from("badges")
    .select("*")
    .order("sort_order");

  const allBadges = (badges ?? []) as Badge[];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Badges" }]} />

        <h1 className="font-heading text-3xl font-semibold text-offwhite mb-2">Badges</h1>
        <p className="text-muted-foreground text-sm mb-8">{allBadges.length} badges configured</p>

        <p className="rounded-xl bg-gold/10 border border-gold/20 p-4 text-sm text-gold/90 mb-8">
          Badges are stored in the database. Add or edit badges via the Supabase dashboard or by running SQL migrations.
        </p>

        <div className="space-y-3">
          {allBadges.map((badge) => (
            <div key={badge.id} className="rounded-xl bg-card border border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-gold flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-offwhite font-medium">{badge.name}</p>
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {badge.category}
                    </span>
                    {badge.is_active ? (
                      <Check className="h-3 w-3 text-forest" />
                    ) : (
                      <X className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.description}</p>
                  {badge.grants_title && (
                    <p className="text-xs text-gold mt-0.5">Title: {badge.title_text}</p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Criteria: {JSON.stringify(badge.criteria)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allBadges.length === 0 && (
          <div className="rounded-2xl bg-card border border-border p-8 text-center">
            <p className="text-muted-foreground">No badges configured. Run the database migration to seed initial badges.</p>
          </div>
        )}
      </div>
    </div>
  );
}
