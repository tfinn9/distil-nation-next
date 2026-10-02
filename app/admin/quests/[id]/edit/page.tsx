import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import QuestForm from "@/components/admin/QuestForm";
import type { Quest } from "@/types/passport";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: quest } = await supabase
    .from("quests")
    .select("name")
    .eq("id", id)
    .maybeSingle();

  return {
    title: quest?.name
      ? `Edit ${quest.name} | Distil-Nation NZ`
      : "Edit Quest | Distil-Nation NZ",
  };
}

export default async function EditQuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/");

  const { data: quest } = await supabase
    .from("quests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!quest) notFound();

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
            { label: "Edit" },
            { label: quest.name },
          ]}
        />

        <h1 className="font-heading text-3xl font-semibold text-offwhite mb-2">
          Edit Quest
        </h1>
        <p className="text-muted-foreground text-sm mb-8">{quest.name}</p>

        <QuestForm quest={quest as Quest} badges={badges ?? []} />
      </div>
    </div>
  );
}
