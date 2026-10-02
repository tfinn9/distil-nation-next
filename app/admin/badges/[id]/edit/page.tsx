import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import BadgeForm from "@/components/admin/BadgeForm";
import type { Badge } from "@/types/passport";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: badge } = await supabase
    .from("badges")
    .select("name")
    .eq("id", id)
    .maybeSingle();

  return {
    title: badge?.name
      ? `Edit ${badge.name} | Distil-Nation NZ`
      : "Edit Badge | Distil-Nation NZ",
  };
}

export default async function EditBadgePage({
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

  const { data: badge } = await supabase
    .from("badges")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!badge) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-2xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Badges", href: "/admin/badges" },
            { label: "Edit" },
            { label: badge.name },
          ]}
        />

        <h1 className="font-heading text-3xl font-semibold text-offwhite mb-2">
          Edit Badge
        </h1>
        <p className="text-muted-foreground text-sm mb-8">{badge.name}</p>

        <BadgeForm badge={badge as Badge} />
      </div>
    </div>
  );
}
