import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { Wine, Award, Compass, Inbox } from "lucide-react";

export const metadata = {
  title: "Admin | Distil-Nation NZ",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-6 pb-20 max-w-2xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin" }]} />
          <div className="rounded-2xl bg-card border border-border p-12 text-center mt-8">
            <h1 className="font-heading text-2xl font-semibold text-offwhite mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don&apos;t have permission to access the admin area.</p>
          </div>
        </div>
      </div>
    );
  }

  const [{ count: spiritCount }, { count: badgeCount }, { count: questCount }, { count: submissionCount }] = await Promise.all([
    supabase.from("spirits").select("*", { count: "exact", head: true }),
    supabase.from("badges").select("*", { count: "exact", head: true }),
    supabase.from("quests").select("*", { count: "exact", head: true }),
    supabase.from("spirit_submissions").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  const cards = [
    { title: "Spirits", count: spiritCount ?? 0, href: "/admin/spirits", icon: Wine, description: "Manage spirit/product database" },
    { title: "Badges", count: badgeCount ?? 0, href: "/admin/badges", icon: Award, description: "Manage achievements and titles" },
    { title: "Quests", count: questCount ?? 0, href: "/admin/quests", icon: Compass, description: "Manage discovery quests" },
    { title: "Submissions", count: submissionCount ?? 0, href: "/admin/submissions", icon: Inbox, description: "Review user spirit submissions" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin" }]} />

        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-offwhite mb-8">Admin Dashboard</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl bg-card border border-border p-6 hover:border-gold/50 transition-colors group"
            >
              <card.icon className="h-6 w-6 text-gold mb-3" />
              <h2 className="font-heading text-xl font-semibold text-offwhite group-hover:text-gold transition-colors">
                {card.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
              <p className="text-2xl font-heading font-semibold text-gold mt-3">{card.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
