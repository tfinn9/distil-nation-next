"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  PASSPORT_STATUS_LABELS,
  PASSPORT_STATUS_ORDER,
  type PassportEntry,
  type PassportStatus,
} from "@/types/passport";

export function PassportControls({ distillerySlug }: { distillerySlug: string }) {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [entry, setEntry] = useState<PassportEntry | null>(null);
  const [notes, setNotes] = useState("");
  const [visitedDate, setVisitedDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (!user) {
        setUserId(null);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from("passport_entries")
        .select("*")
        .eq("distillery_slug", distillerySlug)
        .maybeSingle();

      if (!active) return;

      if (data) {
        setEntry(data as PassportEntry);
        setNotes(data.notes ?? "");
        setVisitedDate(data.visited_date ?? "");
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distillerySlug]);

  async function upsertEntry(patch: Partial<PassportEntry>) {
    if (!userId) return;
    setSaving(true);
    setSavedMessage(null);

    const payload = {
      user_id: userId,
      distillery_slug: distillerySlug,
      statuses: entry?.statuses ?? [],
      visited_date: entry?.visited_date ?? null,
      rating: entry?.rating ?? null,
      notes: entry?.notes ?? null,
      ...patch,
    };

    const { data, error } = await supabase
      .from("passport_entries")
      .upsert(payload, { onConflict: "user_id,distillery_slug" })
      .select()
      .single();

    setSaving(false);

    if (!error && data) {
      setEntry(data as PassportEntry);
      setSavedMessage("Saved");
      setTimeout(() => setSavedMessage(null), 1500);
    }
  }

  function toggleStatus(status: PassportStatus) {
    const current = entry?.statuses ?? [];
    const next = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    upsertEntry({ statuses: next });
  }

  function setRating(rating: number) {
    upsertEntry({ rating: entry?.rating === rating ? null : rating });
  }

  function saveDetails() {
    upsertEntry({ notes: notes || null, visited_date: visitedDate || null });
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-background border border-border p-5 flex items-center justify-center text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="rounded-2xl bg-background border border-border p-5 space-y-2 text-center">
        <h3 className="font-heading text-lg font-semibold text-offwhite">Your Distillery Passport</h3>
        <p className="text-sm text-muted-foreground">
          Log in to track visits, ratings and notes for this distillery.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-full bg-gold px-4 py-2 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
        >
          Log in
        </Link>
      </div>
    );
  }

  const activeStatuses = entry?.statuses ?? [];
  const rating = entry?.rating ?? 0;

  return (
    <div className="rounded-2xl bg-background border border-border p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-offwhite">Your Distillery Passport</h3>
        {saving && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
        {!saving && savedMessage && <span className="text-xs text-gold">{savedMessage}</span>}
      </div>

      <div className="flex flex-wrap gap-2">
        {PASSPORT_STATUS_ORDER.map((status) => {
          const active = activeStatuses.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatus(status)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-gold text-charcoal"
                  : "bg-card text-muted-foreground border border-border hover:text-offwhite"
              }`}
            >
              {PASSPORT_STATUS_LABELS[status]}
            </button>
          );
        })}
      </div>

      <div className="space-y-1.5">
        <p className="text-sm text-muted-foreground">Your rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} aria-label={`Rate ${star} stars`}>
              <Star
                className={`h-5 w-5 transition-colors ${
                  star <= rating ? "fill-gold text-gold" : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="visitedDate" className="text-sm text-muted-foreground">
          Date visited
        </label>
        <input
          id="visitedDate"
          type="date"
          value={visitedDate}
          onChange={(e) => setVisitedDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="notes" className="text-sm text-muted-foreground">
          Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tasting notes, memories, tips for next time…"
          className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>

      <button
        type="button"
        onClick={saveDetails}
        disabled={saving}
        className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-offwhite hover:border-gold/50 transition-colors disabled:opacity-50"
      >
        Save notes &amp; date
      </button>
    </div>
  );
}
