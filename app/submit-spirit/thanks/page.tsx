import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Thanks! | Distil-Nation NZ",
};

export default function SubmitSpiritThanksPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-2xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Submit a Spirit", href: "/submit-spirit" }, { label: "Thanks" }]} />

        <div className="rounded-2xl bg-card border border-border p-8 md:p-12 text-center mt-8">
          <CheckCircle className="h-12 w-12 text-gold mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-semibold text-offwhite mb-3">
            Thanks for the submission!
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We&apos;ll review your suggestion and add it to the directory if it checks out. 
            This usually takes a day or two.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/spirits/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
            >
              Browse Spirits
            </Link>
            <Link
              href="/submit-spirit"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-offwhite hover:bg-card transition-colors"
            >
              Submit Another
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
