import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/ProfileForm";
import { SignOutButton } from "@/components/SignOutButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

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

        <ProfileForm
          initialDisplayName={profile?.display_name ?? ""}
          initialBio={profile?.bio ?? ""}
        />
      </div>
    </div>
  );
}
