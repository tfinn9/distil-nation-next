import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { distilleries } from "@/data/mock";
import { spirits } from "@/data/spirits";
import { checkBadgeCriteria } from "@/lib/passport";
import type { PassportEntry, SpiritTasting, Badge, UserBadge } from "@/types/passport";
import { Award, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Badges | Distil-Nation NZ",
};

export default async function BadgesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [
    { data: allBadges },
    { data: userBadges },
    { data: passportEntries },
    { data: tastings },
    { data: profile },
  ] = await Promise.all([
    supabase.from("badges").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("user_badges").select("*, badge:badges(*)").eq("user_id", user.id),
    supabase.from("passport_entries").select("*").eq("user_id", user.id),
    supabase.from("spirit_tastings").select("*").eq("user_id", user.id),
    supabase.from("profiles").select("home_region").eq("id", user.id).maybeSingle(),
  ]);

  const badges = (allBadges ?? []) as Badge[];
  const earned = new Set((userBadges ?? []).map((ub: UserBadge) => ub.badge_id));
  const entries = (passportEntries ?? []) as PassportEntry[];
  const userTastings = (tastings ?? []) as SpiritTasting[];

  const categories = ["general", "regional", "category", "special"] as const;
  const categoryLabels: Record<string, string> = {
    general: "General",
    regional: "Regional",
    category: "Spirit Category",
    special: "Special",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Passport", href: "/passport" }, { label: "Badges" }]} />

        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-offwhite mb-2">Badges</h1>
        <p className="text-muted-foreground mb-8">
          {earned.size} of {badges.length} earned
        </p>

        {categories.map((cat) => {
          const catBadges = badges.filter((b) => b.category === cat);
          if (catBadges.length === 0) return null;
          return (
            <div key={cat} className="mb-10">
              <h2 className="font-heading text-xl font-semibold text-offwhite mb-4">{categoryLabels[cat]}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {catBadges.map((badge) => {
                  const isEarned = earned.has(badge.id);
                  const { progress, total } = checkBadgeCriteria(
                    badge, entries, userTastings, spirits, distilleries, profile?.home_region
                  );
                  const pct = total > 0 ? Math.round((progress / total) * 100) : 0;

                  return (
                    <div
                      key={badge.id}
                      className={cn(
                        "rounded-2xl border p-5 transition-colors",
                        isEarned
                          ? "bg-card border-gold/50"
                          : "bg-card border-border opacity-70"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                          isEarned ? "bg-gold/20" : "bg-muted"
                        )}>
                          {isEarned ? (
                            <Award className="h-5 w-5 text-gold" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-heading text-lg font-semibold text-offwhite">{badge.name}</h3>
                            {isEarned && <Check className="h-4 w-4 text-gold" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{badge.description}</p>

                          {!isEarned && total > 1 && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>{progress} / {total}</span>
                                <span>{pct}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gold transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {badge.grants_title && badge.title_text && (
                            <p className="mt-2 text-xs text-gold">
                              Unlocks title: <span className="font-medium">{badge.title_text}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
