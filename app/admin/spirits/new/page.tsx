import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SpiritForm } from "@/components/admin/SpiritForm";
import { distilleries } from "@/data/mock";

export const metadata = {
  title: "New Spirit | Distil-Nation NZ",
};

export default async function NewSpiritPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Spirits", href: "/admin/spirits" },
            { label: "New" },
          ]}
        />

        <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-offwhite mb-2">
            New Spirit
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Add a new spirit or product to the database.
          </p>

          <SpiritForm
            distilleries={distilleries.map((d) => ({ slug: d.slug, name: d.name }))}
          />
        </div>
      </div>
    </div>
  );
}
