import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FadeIn } from "@/components/FadeIn";
import { events } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: "Events | Distil-Nation NZ",
  description: "Upcoming New Zealand craft spirits events and tastings.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Events" }]} />
        <FadeIn>
          <SectionHeader
            title="Upcoming events"
            description="Tastings, festivals and meetups across New Zealand."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.slug}
                className="flex flex-col overflow-hidden rounded-3xl bg-card border border-border"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-heading text-2xl font-semibold text-offwhite">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-copper" />
                      {new Date(event.date).toLocaleDateString("en-NZ", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-copper" />
                      {event.location}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                  <Badge variant="secondary" className="bg-background text-muted-foreground border border-border">
                    Details coming soon
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
