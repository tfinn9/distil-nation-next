import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { hosts, siteConfig } from "@/data/mock";
import Image from "next/image";
import { Mic2, Heart, Globe, Award } from "lucide-react";

export const metadata = {
  title: "About | Distil-Nation NZ",
  description: "Meet the hosts and learn the mission behind Distil-Nation NZ.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <SectionHeader
              title="Our mission"
              description="To become the definitive online hub for New Zealand craft spirits."
            />
          </FadeIn>

          <div className="prose prose-invert max-w-none mb-16">
            <p className="text-xl text-offwhite/90 leading-relaxed">
              {siteConfig.description}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              New Zealand&apos;s craft spirits industry is growing fast — from single malt whisky in the Southern Lakes to coastal gin in Auckland and Pacific rum in the north. Distil-Nation NZ exists to tell the stories behind the bottle without the pretension.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through long-form interviews, distillery visits, reviews and educational content, we&apos;re building a living record of the people, places and processes that make New Zealand spirits worth celebrating.
            </p>
          </div>

          <FadeIn>
            <SectionHeader title="Meet the hosts" />
            <div className="grid gap-6 sm:grid-cols-3 mb-16">
              {hosts.map((host) => (
                <div
                  key={host.name}
                  className="rounded-2xl bg-card border border-border p-6 text-center"
                >
                  <Image
                    src={host.image}
                    alt={host.name}
                    width={96}
                    height={96}
                    className="mx-auto mb-4 rounded-full border-2 border-gold/50"
                  />
                  <h3 className="font-heading text-xl font-semibold text-offwhite mb-1">
                    {host.name}
                  </h3>
                  <p className="text-copper text-sm mb-3">{host.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {host.bio}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Mic2,
                  title: "Weekly podcast",
                  text: "Conversations with distillers, bartenders and industry experts.",
                },
                {
                  icon: Heart,
                  title: "Prejudice-free",
                  text: "No snobbery — just honest, enthusiastic exploration.",
                },
                {
                  icon: Globe,
                  title: "NZ focused",
                  text: "From Northland to Bluff, we cover the whole country.",
                },
                {
                  icon: Award,
                  title: "Quality first",
                  text: "Premium editorial content and genuine recommendations.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-card border border-border p-5"
                >
                  <item.icon className="h-6 w-6 text-gold mb-3" />
                  <h3 className="font-heading text-lg font-semibold text-offwhite mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
