import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Quest } from "@/types/passport";
import { DeleteQuestButton } from "@/components/admin/DeleteQuestButton";
import Link from "next/link";
import { Compass, Plus, Check, X, Pencil } from "lucide-react";

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

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-offwhite">Quests</h1>
            <p className="text-muted-foreground text-sm">{allQuests.length} quests configured</p>
          </div>
          <Link
            href="/admin/quests/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Quest
          </Link>
        </div>

        <div className="space-y-3">
          {allQuests.map((quest) => (
            <div key={quest.id} className="rounded-xl bg-card border border-border px-4 py-3">
              <div className="flex items-start gap-3">
                <Compass className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
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
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/quests/${quest.id}/edit`}
                    className="text-muted-foreground hover:text-gold transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteQuestButton id={quest.id} name={quest.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {allQuests.length === 0 && (
          <div className="rounded-2xl bg-card border border-border p-8 text-center">
            <p className="text-muted-foreground">No quests yet. Create your first quest above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
