import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { distilleries } from "@/data/mock";
import { spirits } from "@/data/spirits";
import { getPassportStats } from "@/lib/passport";
import type { PassportEntry, SpiritTasting, UserBadge, Badge, Profile } from "@/types/passport";
import { MapPin, Wine, Award, Compass, Lock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", id)
    .maybeSingle();
  return {
    title: `${profile?.display_name || "Explorer"} | Distil-Nation NZ`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!profile) notFound();

  const typedProfile = profile as Profile;

  if (!typedProfile.is_public) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-6 pb-20 max-w-2xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Profile" }]} />
          <div className="rounded-2xl bg-card border border-border p-12 text-center mt-8">
            <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h1 className="font-heading text-2xl font-semibold text-offwhite mb-2">Private Profile</h1>
            <p className="text-muted-foreground">This explorer has chosen to keep their profile private.</p>
          </div>
        </div>
      </div>
    );
  }

  const [{ data: entries }, { data: tastings }, { data: userBadges }] = await Promise.all([
    supabase.from("passport_entries").select("*").eq("user_id", id),
    supabase.from("spirit_tastings").select("*").eq("user_id", id),
    supabase.from("user_badges").select("*, badge:badges(*)").eq("user_id", id),
  ]);

  const passportEntries = (entries ?? []) as PassportEntry[];
  const userTastings = (tastings ?? []) as SpiritTasting[];
  const badges = (userBadges ?? []) as (UserBadge & { badge: Badge })[];

  const stats = getPassportStats(passportEntries, userTastings, spirits, distilleries);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: typedProfile.display_name || "Explorer" }]} />

        {/* Profile header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
            <span className="font-heading text-2xl font-bold text-gold">
              {(typedProfile.display_name || "?")[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-offwhite">
              {typedProfile.display_name || "Explorer"}
            </h1>
            {typedProfile.selected_title && (
              <p className="text-sm text-gold font-medium">{typedProfile.selected_title}</p>
            )}
            {typedProfile.home_region && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" /> {typedProfile.home_region}
              </p>
            )}
          </div>
        </div>

        {typedProfile.bio && (
          <p className="text-muted-foreground mb-8">{typedProfile.bio}</p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="rounded-2xl bg-card border border-border p-4 text-center">
            <p className="text-2xl font-heading font-semibold text-gold">{stats.distilleriesVisited}</p>
            <p className="text-xs text-muted-foreground">Distilleries</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4 text-center">
            <p className="text-2xl font-heading font-semibold text-gold">{stats.spiritsTried}</p>
            <p className="text-xs text-muted-foreground">Spirits</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4 text-center">
            <p className="text-2xl font-heading font-semibold text-gold">{stats.regionsExplored.length}</p>
            <p className="text-xs text-muted-foreground">Regions</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4 text-center">
            <p className="text-2xl font-heading font-semibold text-gold">{badges.length}</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </div>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-offwhite mb-4">Badges</h2>
            <div className="flex flex-wrap gap-3">
              {badges.map((ub) => (
                <div key={ub.id} className="rounded-xl bg-card border border-gold/30 px-3 py-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-gold" />
                  <span className="text-sm text-offwhite">{ub.badge?.name || "Badge"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favourite spirits */}
        {userTastings.filter((t) => t.status === "favourite").length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-offwhite mb-4">Favourite Spirits</h2>
            <div className="space-y-2">
              {userTastings
                .filter((t) => t.status === "favourite")
                .map((t) => {
                  const spirit = spirits.find((s) => s.id === t.spirit_id);
                  if (!spirit) return null;
                  return (
                    <div key={t.id} className="rounded-xl bg-card border border-border px-4 py-3 flex items-center gap-3">
                      <Wine className="h-4 w-4 text-gold" />
                      <div>
                        <p className="text-sm text-offwhite font-medium">{spirit.name}</p>
                        <p className="text-xs text-muted-foreground">{spirit.category}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
