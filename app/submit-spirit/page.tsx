import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SpiritSubmissionForm } from "@/components/SpiritSubmissionForm";

export const metadata = {
  title: "Submit a Spirit | Distil-Nation NZ",
  description: "Know a New Zealand spirit we're missing? Submit it and help us build the most complete NZ spirits directory.",
};

export default async function SubmitSpiritPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-2xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Submit a Spirit" }]} />

        <div className="mb-8">
          <h1 className="font-heading text-3xl font-semibold text-offwhite mb-2">
            Submit a Spirit
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Know a New Zealand spirit we haven&apos;t listed yet? Let us know and we&apos;ll
            review it for addition to the directory. Start typing below — we&apos;ll check if
            it&apos;s already in our database first.
          </p>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
          <SpiritSubmissionForm userEmail={user?.email} />
        </div>
      </div>
    </div>
  );
}
