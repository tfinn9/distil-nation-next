"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset, type AuthActionState } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const initialState: AuthActionState = { error: null };

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(requestPasswordReset, initialState);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-3xl font-semibold text-offwhite">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ll email you a link to set a new password.
          </p>
        </div>

        {state.message ? (
          <div className="rounded-2xl bg-card border border-border p-6 text-center space-y-2">
            <p className="text-offwhite font-medium">{state.message}</p>
            <Link href="/login" className="text-gold hover:text-gold/80 text-sm font-medium">
              Back to login
            </Link>
          </div>
        ) : (
          <form action={formAction} className="space-y-4 rounded-2xl bg-card border border-border p-6">
            {state.error && (
              <p className="rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2 text-sm text-destructive">
                {state.error}
              </p>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <SubmitButton pendingText="Sending…">Send reset link</SubmitButton>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link href="/login" className="text-gold hover:text-gold/80 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
