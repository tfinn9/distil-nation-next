import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/ProfileForm";
import { SignOutButton } from "@/components/SignOutButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PassportDashboard } from "@/components/PassportDashboard";
import type { PassportEntry } from "@/types/passport";
import Link from "next/link";
import { Compass, Wine, Award, BookOpen } from "lucide-react";

export const metadata = {
  title: "Your Account | Distil-Nation NZ",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { data: passportRows }] = await Promise.all([
    supabase.from("profiles").select("display_name, bio, avatar_url").eq("id", user.id).maybeSingle(),
    supabase.from("passport_entries").select("*").order("updated_at", { ascending: false }),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-2xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-offwhite">Your account</h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
          <SignOutButton />
        </div>

        {/* Passport Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <Link
            href="/passport"
            className="rounded-2xl bg-card border border-border p-4 text-center hover:border-gold/50 transition-colors group"
          >
            <Compass className="h-5 w-5 text-gold mx-auto mb-1.5" />
            <p className="text-sm font-medium text-offwhite group-hover:text-gold transition-colors">My Passport</p>
          </Link>
          <Link
            href="/passport/collection"
            className="rounded-2xl bg-card border border-border p-4 text-center hover:border-gold/50 transition-colors group"
          >
            <Wine className="h-5 w-5 text-gold mx-auto mb-1.5" />
            <p className="text-sm font-medium text-offwhite group-hover:text-gold transition-colors">Collection</p>
          </Link>
          <Link
            href="/passport/badges"
            className="rounded-2xl bg-card border border-border p-4 text-center hover:border-gold/50 transition-colors group"
          >
            <Award className="h-5 w-5 text-gold mx-auto mb-1.5" />
            <p className="text-sm font-medium text-offwhite group-hover:text-gold transition-colors">Badges</p>
          </Link>
          <Link
            href="/passport/quests"
            className="rounded-2xl bg-card border border-border p-4 text-center hover:border-gold/50 transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-gold mx-auto mb-1.5" />
            <p className="text-sm font-medium text-offwhite group-hover:text-gold transition-colors">Quests</p>
          </Link>
        </div>

        <div className="space-y-8">
          <ProfileForm
            initialDisplayName={profile?.display_name ?? ""}
            initialBio={profile?.bio ?? ""}
          />

          <PassportDashboard entries={(passportRows ?? []) as PassportEntry[]} />
        </div>
      </div>
    </div>
  );
}
