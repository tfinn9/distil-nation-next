import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { distilleries } from "@/data/mock";
import {
  PASSPORT_STATUS_LABELS,
  PASSPORT_STATUS_ORDER,
  type PassportEntry,
  type PassportStatus,
} from "@/types/passport";

export function PassportDashboard({ entries }: { entries: PassportEntry[] }) {
  const withDistillery = entries
    .map((entry) => ({
      entry,
      distillery: distilleries.find((d) => d.slug === entry.distillery_slug),
    }))
    .filter((row): row is { entry: PassportEntry; distillery: NonNullable<typeof row.distillery> } =>
      Boolean(row.distillery)
    );

  const counts: Record<PassportStatus, number> = PASSPORT_STATUS_ORDER.reduce(
    (acc, status) => ({ ...acc, [status]: 0 }),
    {} as Record<PassportStatus, number>
  );
  withDistillery.forEach(({ entry }) => {
    entry.statuses.forEach((status) => {
      counts[status] = (counts[status] ?? 0) + 1;
    });
  });

  if (withDistillery.length === 0) {
    return (
      <div className="rounded-2xl bg-card border border-border p-6 text-center space-y-2">
        <h2 className="font-heading text-xl font-semibold text-offwhite">Your Distillery Passport</h2>
        <p className="text-sm text-muted-foreground">
          You haven&apos;t tagged any distilleries yet. Visit a{" "}
          <Link href="/distilleries/" className="text-gold hover:text-gold/80 font-medium">
            distillery page
          </Link>{" "}
          to start tracking visits, ratings and notes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PASSPORT_STATUS_ORDER.map((status) => (
          <div key={status} className="rounded-2xl bg-card border border-border p-4 text-center">
            <p className="text-2xl font-heading font-semibold text-gold">{counts[status]}</p>
            <p className="text-xs text-muted-foreground">{PASSPORT_STATUS_LABELS[status]}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="font-heading text-xl font-semibold text-offwhite">
          Your distilleries ({withDistillery.length})
        </h2>

        <div className="space-y-3">
          {withDistillery.map(({ entry, distillery }) => (
            <Link
              key={entry.id}
              href={`/distilleries/${distillery.slug}/`}
              className="block rounded-2xl bg-card border border-border p-4 hover:border-gold/50 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-heading text-lg font-semibold text-offwhite">{distillery.name}</h3>
                {entry.rating && (
                  <span className="inline-flex items-center gap-0.5 text-sm font-medium text-gold">
                    <Star className="h-4 w-4 fill-gold" />
                    {entry.rating}/5
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <MapPin className="h-3.5 w-3.5 text-copper flex-shrink-0" />
                <span>{distillery.region}</span>
                {entry.visited_date && <span>· Visited {entry.visited_date}</span>}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {entry.statuses.map((status) => (
                  <span
                    key={status}
                    className="rounded-full bg-background border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {PASSPORT_STATUS_LABELS[status]}
                  </span>
                ))}
              </div>

              {entry.notes && (
                <p className="text-sm text-muted-foreground line-clamp-2">{entry.notes}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
