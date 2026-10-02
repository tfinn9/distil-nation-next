import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Quest } from "@/types/passport";
import { Compass, Check, X } from "lucide-react";

export const metadata = {
  title: "Manage Quests | Distil-Nation NZ",
};

export default async function AdminQuestsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/");

  const { data: quests } = await supabase
    .from("quests")
    .select("*")
    .order("sort_order");

  const allQuests = (quests ?? []) as Quest[];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Quests" }]} />

        <h1 className="font-heading text-3xl font-semibold text-offwhite mb-2">Quests</h1>
        <p className="text-muted-foreground text-sm mb-8">{allQuests.length} quests configured</p>

        <p className="rounded-xl bg-gold/10 border border-gold/20 p-4 text-sm text-gold/90 mb-8">
          Quests are stored in the database. Add or edit quests via the Supabase dashboard or by running SQL migrations.
        </p>

        <div className="space-y-3">
          {allQuests.map((quest) => (
            <div key={quest.id} className="rounded-xl bg-card border border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 text-gold flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-offwhite font-medium">{quest.name}</p>
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {quest.quest_type}
                    </span>
                    {quest.is_active ? (
                      <Check className="h-3 w-3 text-forest" />
                    ) : (
                      <X className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{quest.description}</p>
                  {quest.start_date && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(quest.start_date).toLocaleDateString("en-NZ")} — {quest.end_date ? new Date(quest.end_date).toLocaleDateString("en-NZ") : "Ongoing"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {allQuests.length === 0 && (
          <div className="rounded-2xl bg-card border border-border p-8 text-center">
            <p className="text-muted-foreground">No quests configured. Run the database migration to seed initial quests.</p>
          </div>
        )}
      </div>
    </div>
  );
}
