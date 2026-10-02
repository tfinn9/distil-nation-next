import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import QuestForm from "@/components/admin/QuestForm";

export const metadata = {
  title: "New Quest | Distil-Nation NZ",
};

export default async function NewQuestPage() {
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
    .select("id, name")
    .eq("is_active", true)
    .order("name");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-2xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Quests", href: "/admin/quests" },
            { label: "New" },
          ]}
        />

        <h1 className="font-heading text-3xl font-semibold text-offwhite mb-2">
          New Quest
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Create a new discovery quest.
        </p>

        <QuestForm badges={badges ?? []} />
      </div>
    </div>
  );
}
