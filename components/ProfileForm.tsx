"use client";

import { useActionState } from "react";
import { updateProfile, type AuthActionState } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const initialState: AuthActionState = { error: null };

export function ProfileForm({
  initialDisplayName,
  initialBio,
}: {
  initialDisplayName: string;
  initialBio: string;
}) {
  const [state, formAction] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl bg-card border border-border p-6">
      {state.error && (
        <p className="rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.message && (
        <p className="rounded-lg bg-forest/20 border border-forest/40 px-3 py-2 text-sm text-offwhite">
          {state.message}
        </p>
      )}

      <div className="space-y-1.5">
        <label htmlFor="displayName" className="text-sm text-muted-foreground">
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          defaultValue={initialDisplayName}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="bio" className="text-sm text-muted-foreground">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={initialBio}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
      </div>

      <SubmitButton pendingText="Saving…" className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors disabled:opacity-50">
        Save changes
      </SubmitButton>
    </form>
  );
}
