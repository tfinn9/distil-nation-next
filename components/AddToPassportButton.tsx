"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Check, Plus, Heart, Bookmark, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Spirit, TastingStatus } from "@/types/passport";

interface AddToPassportButtonBaseProps {
  currentStatus?: "tried" | "want_to_try" | "favourite" | null;
}

interface AddToPassportButtonWithSpiritProps extends AddToPassportButtonBaseProps {
  spirit: Spirit;
  spiritId?: never;
  spiritName?: never;
}

interface AddToPassportButtonWithIdsProps extends AddToPassportButtonBaseProps {
  spiritId: string;
  spiritName: string;
  spirit?: never;
}

type AddToPassportButtonProps =
  | AddToPassportButtonWithSpiritProps
  | AddToPassportButtonWithIdsProps;

const STATUS_CONFIG: Record<
  TastingStatus,
  { label: string; icon: typeof Check }
> = {
  tried: { label: "Tried", icon: Check },
  want_to_try: { label: "Want to Try", icon: Bookmark },
  favourite: { label: "Favourite", icon: Heart },
};

export function AddToPassportButton({
  spirit,
  spiritId,
  spiritName,
  currentStatus = null,
}: AddToPassportButtonProps) {
  const resolvedSpiritId = spirit?.id ?? spiritId;
  const resolvedSpiritName = spirit?.name ?? spiritName;

  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<TastingStatus | null>(currentStatus ?? null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      setUserId(user?.id ?? null);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [supabase]);

  async function updateStatus(next: TastingStatus | null) {
    if (!userId) return;

    setSaving(true);
    setSaved(null);

    try {
      if (next === null) {
        const { error } = await supabase
          .from("spirit_tastings")
          .delete()
          .eq("user_id", userId)
          .eq("spirit_id", resolvedSpiritId);

        if (!error) {
          setStatus(null);
        }
      } else {
        const { error } = await supabase
          .from("spirit_tastings")
          .upsert(
            {
              user_id: userId,
              spirit_id: resolvedSpiritId,
              status: next,
            },
            { onConflict: "user_id,spirit_id" }
          );

        if (!error) {
          setStatus(next);
          setSaved("Saved");
          setTimeout(() => setSaved(null), 1500);
        }
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading…
      </div>
    );
  }

  if (!userId) {
    return (
      <Link
        href="/login"
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-offwhite transition-colors hover:border-gold/50 hover:text-gold"
      >
        Log in to add to Passport
      </Link>
    );
  }

  if (!status) {
    return (
      <button
        type="button"
        onClick={() => updateStatus("tried")}
        disabled={saving}
        aria-label={`Add ${resolvedSpiritName} to Passport`}
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-lg bg-gold px-4 text-sm font-semibold text-charcoal transition-colors hover:bg-gold/90 disabled:opacity-50",
          saving && "cursor-not-allowed"
        )}
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : saved ? (
          <Check className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        {saved ? "Saved" : "Add to Passport"}
      </button>
    );
  }

  const ActiveIcon = STATUS_CONFIG[status].icon;

  return (
    <div className="inline-flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1.5 text-sm font-medium text-gold">
          <ActiveIcon className="h-4 w-4" />
          {STATUS_CONFIG[status].label}
        </span>
        {saving && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        {!saving && saved && (
          <span className="inline-flex items-center gap-1 text-xs text-gold">
            <Check className="h-3.5 w-3.5" />
            Saved
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {( ["tried", "want_to_try", "favourite"] as TastingStatus[] ).map((key) => {
          const { label, icon: Icon } = STATUS_CONFIG[key];
          const active = status === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => updateStatus(active ? null : key)}
              disabled={saving}
              aria-label={active ? `Remove ${label} status` : `Mark as ${label}`}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors disabled:opacity-50",
                active
                  ? "bg-gold text-charcoal"
                  : "border border-border bg-card text-muted-foreground hover:border-gold/50 hover:text-offwhite"
              )}
            >
              <Icon
                className={cn(
                  "h-3.5 w-3.5",
                  active && key === "favourite" && "fill-charcoal"
                )}
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
