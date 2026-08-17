"use client";

import { useActionState } from "react";
import { updatePassword, type AuthActionState } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const initialState: AuthActionState = { error: null };

export default function ResetPasswordPage() {
  const [state, formAction] = useActionState(updatePassword, initialState);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-3xl font-semibold text-offwhite">Set a new password</h1>
          <p className="text-sm text-muted-foreground">Choose a new password for your account.</p>
        </div>

        <form action={formAction} className="space-y-4 rounded-2xl bg-card border border-border p-6">
          {state.error && (
            <p className="rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm text-muted-foreground">
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-sm text-muted-foreground">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <SubmitButton pendingText="Updating…">Update password</SubmitButton>
        </form>
      </div>
    </div>
  );
}
