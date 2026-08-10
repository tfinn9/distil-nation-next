import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/data/mock";
import { Mail, Youtube, Instagram, Facebook } from "lucide-react";

export const metadata = {
  title: "Contact | Distil-Nation NZ",
  description: "Get in touch with the Distil-Nation NZ team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Get in touch"
            description="Questions, guest suggestions, media enquiries or just want to say cheers?"
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <ContactForm />

            <div className="space-y-6">
              <div className="rounded-2xl bg-card border border-border p-6">
                <h2 className="font-heading text-xl font-semibold text-offwhite mb-3">
                  Email us
                </h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
                >
                  <Mail className="h-5 w-5 text-copper" />
                  {siteConfig.email}
                </a>
              </div>

              <div className="rounded-2xl bg-card border border-border p-6">
                <h2 className="font-heading text-xl font-semibold text-offwhite mb-3">
                  Follow along
                </h2>
                <div className="flex gap-4">
                  <a
                    href={siteConfig.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-gold transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-gold transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href={siteConfig.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-gold transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
