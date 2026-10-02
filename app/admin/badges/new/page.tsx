import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import BadgeForm from "@/components/admin/BadgeForm";

export const metadata = {
  title: "New Badge | Distil-Nation NZ",
};

export default async function NewBadgePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-2xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Badges", href: "/admin/badges" },
            { label: "New" },
          ]}
        />

        <h1 className="font-heading text-3xl font-semibold text-offwhite mb-2">
          New Badge
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Create a new achievement badge.
        </p>

        <BadgeForm />
      </div>
    </div>
  );
}
