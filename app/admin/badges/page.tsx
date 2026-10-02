import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Badge } from "@/types/passport";
import { DeleteBadgeButton } from "@/components/admin/DeleteBadgeButton";
import Link from "next/link";
import { Award, Plus, Check, X, Pencil } from "lucide-react";

export const metadata = {
  title: "Manage Badges | Distil-Nation NZ",
};

export default async function AdminBadgesPage() {
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
    .select("*")
    .order("sort_order");

  const allBadges = (badges ?? []) as Badge[];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Badges" }]} />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-offwhite">Badges</h1>
            <p className="text-muted-foreground text-sm">{allBadges.length} badges configured</p>
          </div>
          <Link
            href="/admin/badges/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Badge
          </Link>
        </div>

        <div className="space-y-3">
          {allBadges.map((badge) => (
            <div key={badge.id} className="rounded-xl bg-card border border-border px-4 py-3">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-offwhite font-medium">{badge.name}</p>
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {badge.category}
                    </span>
                    {badge.is_active ? (
                      <Check className="h-3 w-3 text-forest" />
                    ) : (
                      <X className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.description}</p>
                  {badge.grants_title && (
                    <p className="text-xs text-gold mt-0.5">Title: {badge.title_text}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/badges/${badge.id}/edit`}
                    className="text-muted-foreground hover:text-gold transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteBadgeButton id={badge.id} name={badge.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {allBadges.length === 0 && (
          <div className="rounded-2xl bg-card border border-border p-8 text-center">
            <p className="text-muted-foreground">No badges yet. Create your first badge above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
