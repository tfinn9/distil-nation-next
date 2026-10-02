import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SpiritCard } from "@/components/SpiritCard";
import { distilleries } from "@/data/mock";
import { spirits } from "@/data/spirits";
import {
  getPassportStats,
  getRegionProgress,
  getDiscoverySuggestions,
  getDistillerySuperFans,
} from "@/lib/passport";
import type {
  PassportEntry,
  SpiritTasting,
  Badge,
  UserBadge,
  Quest,
  UserQuest,
  Profile,
} from "@/types/passport";
import Link from "next/link";
import {
  MapPin,
  Wine,
  Award,
  Compass,
  Star,
  BookOpen,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "My Passport | Distil-Nation NZ",
};

export default async function PassportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [
    { data: profile },
    { data: passportRows },
    { data: tastingRows },
    { data: userBadgeRows },
    { data: userQuestRows },
    { data: badgeRows },
    { data: questRows },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase
      .from("passport_entries")
      .select("*")
      .order("updated_at", { ascending: false }),
    supabase
      .from("spirit_tastings")
      .select("*")
      .order("updated_at", { ascending: false }),
    supabase
      .from("user_badges")
      .select("*, badge:badges(*)")
      .order("earned_at", { ascending: false }),
    supabase.from("user_quests").select("*"),
    supabase.from("badges").select("*").eq("is_active", true),
    supabase.from("quests").select("*").eq("is_active", true),
  ]);

  const userProfile = (profile ?? null) as Profile | null;
  const entries = (passportRows ?? []) as PassportEntry[];
  const tastings = (tastingRows ?? []) as SpiritTasting[];
  const userBadges = (userBadgeRows ?? []) as UserBadge[];
  const userQuests = (userQuestRows ?? []) as UserQuest[];
  const allBadges = (badgeRows ?? []) as Badge[];
  const allQuests = (questRows ?? []) as Quest[];

  const stats = getPassportStats(entries, tastings, spirits, distilleries);
  const regionProgress = getRegionProgress(entries, distilleries);
  const suggestions = getDiscoverySuggestions(entries, tastings, spirits, distilleries, 3);
  const superFanSlugs = getDistillerySuperFans(tastings, spirits);

  const completedQuestIds = new Set(
    userQuests.filter((q) => q.completed_at !== null).map((q) => q.quest_id)
  );
  const activeQuests = allQuests
    .filter((q) => !completedQuestIds.has(q.id))
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 4);

  const triedTastings = tastings.filter(
    (t) => t.status === "tried" || t.status === "favourite"
  );
  const triedSpiritIds = new Set(triedTastings.map((t) => t.spirit_id));
  const recentSpirits = spirits.filter((s) => triedSpiritIds.has(s.id)).slice(0, 4);

  const recentBadges = userBadges.slice(0, 4);

  const statCards = [
    {
      label: "Distilleries Visited",
      value: stats.distilleriesVisited,
      icon: MapPin,
      href: "/distilleries/",
    },
    {
      label: "Spirits Discovered",
      value: stats.spiritsTried,
      icon: Wine,
      href: "/passport/collection/",
    },
    {
      label: "Regions Explored",
      value: stats.regionsExplored.length,
      icon: Compass,
      href: "/distilleries/",
    },
    {
      label: `Badges Earned of ${allBadges.length}`,
      value: userBadges.length,
      icon: Award,
      href: "/passport/badges/",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-5xl">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "My Passport" }]}
        />

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-card font-heading text-2xl font-semibold text-gold">
            {(userProfile?.display_name ?? user.email ?? "?")
              .charAt(0)
              .toUpperCase()}
          </div>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-offwhite">
              {userProfile?.display_name ?? "My Passport"}
            </h1>
            {userProfile?.selected_title && (
              <p className="text-sm font-medium text-gold">
                {userProfile.selected_title}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Your New Zealand spirits journal
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
          {statCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-gold/50"
            >
              <card.icon className="mx-auto mb-2 h-5 w-5 text-copper" />
              <p className="font-heading text-2xl font-semibold text-gold">
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </Link>
          ))}
        </div>

        {/* Discovery suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-8 rounded-3xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Compass className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-xl font-semibold text-offwhite">
                Discover next
              </h2>
            </div>
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3"
                >
                  <p className="text-sm text-muted-foreground">{s.message}</p>
                  {s.link && (
                    <Link
                      href={s.link}
                      className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-gold hover:text-gold/80"
                    >
                      Explore <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent spirit cards */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-offwhite">
              Recent spirit cards
            </h2>
            <Link
              href="/passport/collection/"
              className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold/80"
            >
              View collection <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          {recentSpirits.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {recentSpirits.map((spirit) => (
                <SpiritCard
                  key={spirit.id}
                  spirit={spirit}
                  unlocked
                  compact
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No spirits logged yet. Head to a{" "}
                <Link
                  href="/spirits/"
                  className="font-medium text-gold hover:text-gold/80"
                >
                  spirit page
                </Link>{" "}
                to log your first tasting.
              </p>
            </div>
          )}
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Recent badges */}
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gold" />
                <h2 className="font-heading text-xl font-semibold text-offwhite">
                  Recent badges
                </h2>
              </div>
              <Link
                href="/passport/badges/"
                className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold/80"
              >
                All badges <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            {recentBadges.length > 0 ? (
              <div className="space-y-3">
                {recentBadges.map((ub) => (
                  <div
                    key={ub.id}
                    className="rounded-2xl border border-border bg-background p-4"
                  >
                    <p className="font-heading font-semibold text-offwhite">
                      {ub.badge?.name ?? "Badge"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {ub.badge?.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No badges earned yet. Keep exploring to earn your first.
              </p>
            )}
          </div>

          {/* Active quests */}
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gold" />
                <h2 className="font-heading text-xl font-semibold text-offwhite">
                  Active quests
                </h2>
              </div>
              <Link
                href="/passport/quests/"
                className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold/80"
              >
                All quests <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            {activeQuests.length > 0 ? (
              <div className="space-y-3">
                {activeQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="rounded-2xl border border-border bg-background p-4"
                  >
                    <p className="font-heading font-semibold text-offwhite">
                      {quest.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {quest.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                All quests completed — ka pai!
              </p>
            )}
          </div>
        </div>

        {/* Region progress */}
        <div className="mb-8 rounded-3xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gold" />
            <h2 className="font-heading text-xl font-semibold text-offwhite">
              Region progress
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(regionProgress)
              .sort(([, a], [, b]) => b.total - a.total)
              .map(([region, { visited, total }]) => {
                const pct = total > 0 ? Math.round((visited / total) * 100) : 0;
                return (
                  <div key={region}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-offwhite">{region}</span>
                      <span className="text-muted-foreground">
                        {visited}/{total}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full rounded-full bg-gold transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Super fans */}
        {superFanSlugs.length > 0 && (
          <div className="mb-8 rounded-3xl border border-gold/30 bg-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-xl font-semibold text-offwhite">
                Super Fan status
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {superFanSlugs.map((slug) => {
                const d = distilleries.find((dd) => dd.slug === slug);
                return (
                  <Link
                    key={slug}
                    href={`/distilleries/${slug}/`}
                    className="rounded-full border border-gold/40 bg-background px-3 py-1 text-sm font-medium text-gold transition-colors hover:border-gold"
                  >
                    {d?.name ?? slug}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "My Collection", href: "/passport/collection/", icon: Wine },
            { label: "Badges", href: "/passport/badges/", icon: Award },
            { label: "Quests", href: "/passport/quests/", icon: BookOpen },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-colors hover:border-gold/50"
            >
              <span className="flex items-center gap-2 font-heading font-semibold text-offwhite">
                <link.icon className="h-5 w-5 text-copper" />
                {link.label}
              </span>
              <ChevronRight className="h-5 w-5 text-gold" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
