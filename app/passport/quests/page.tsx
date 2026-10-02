import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Quest, UserQuest } from "@/types/passport";
import { Compass, CheckCircle2, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Quests | Distil-Nation NZ",
};

const questTypeLabels: Record<string, string> = {
  evergreen: "Evergreen",
  regional: "Regional",
  editorial: "Featured",
  seasonal: "Seasonal",
};

const questTypeIcons: Record<string, typeof Compass> = {
  evergreen: Compass,
  regional: MapPin,
  editorial: Clock,
  seasonal: Clock,
};

export default async function QuestsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: allQuests }, { data: userQuests }] = await Promise.all([
    supabase.from("quests").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("user_quests").select("*").eq("user_id", user.id),
  ]);

  const quests = (allQuests ?? []) as Quest[];
  const progress = new Map<string, UserQuest>();
  (userQuests ?? []).forEach((uq: UserQuest) => progress.set(uq.quest_id, uq));

  const questTypes = ["evergreen", "regional", "editorial", "seasonal"] as const;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Passport", href: "/passport" }, { label: "Quests" }]} />

        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-offwhite mb-2">Quests</h1>
        <p className="text-muted-foreground mb-8">
          Discover NZ spirits through guided adventures.
        </p>

        {questTypes.map((type) => {
          const typeQuests = quests.filter((q) => q.quest_type === type);
          if (typeQuests.length === 0) return null;

          return (
            <div key={type} className="mb-10">
              <h2 className="font-heading text-xl font-semibold text-offwhite mb-4 flex items-center gap-2">
                {questTypeLabels[type]} Quests
              </h2>
              <div className="space-y-4">
                {typeQuests.map((quest) => {
                  const uq = progress.get(quest.id);
                  const isCompleted = !!uq?.completed_at;
                  const Icon = questTypeIcons[quest.quest_type] || Compass;

                  return (
                    <div
                      key={quest.id}
                      className={cn(
                        "rounded-2xl border p-5 transition-colors",
                        isCompleted
                          ? "bg-card border-forest/50"
                          : "bg-card border-border"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0",
                          isCompleted ? "bg-forest/20" : "bg-gold/10"
                        )}>
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-forest" />
                          ) : (
                            <Icon className="h-6 w-6 text-gold" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-heading text-lg font-semibold text-offwhite">{quest.name}</h3>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                              {questTypeLabels[quest.quest_type]}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{quest.description}</p>

                          {quest.start_date && quest.end_date && (
                            <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(quest.start_date).toLocaleDateString("en-NZ")} — {new Date(quest.end_date).toLocaleDateString("en-NZ")}
                            </p>
                          )}

                          {isCompleted && (
                            <p className="mt-2 text-sm text-forest font-medium">Completed!</p>
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

        {quests.length === 0 && (
          <div className="rounded-2xl bg-card border border-border p-8 text-center">
            <Compass className="h-8 w-8 text-gold mx-auto mb-3" />
            <h3 className="font-heading text-xl font-semibold text-offwhite mb-1">No quests available yet</h3>
            <p className="text-sm text-muted-foreground">Quests will appear here once they&apos;re configured.</p>
          </div>
        )}
      </div>
    </div>
  );
}
