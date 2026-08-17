"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp, type AuthActionState } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const initialState: AuthActionState = { error: null };

export default function SignupPage() {
  const [state, formAction] = useActionState(signUp, initialState);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-3xl font-semibold text-offwhite">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Start tracking distilleries you&apos;ve visited and want to explore.
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
              <label htmlFor="displayName" className="text-sm text-muted-foreground">
                Display name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="nickname"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

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

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm text-muted-foreground">
                Password
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
              <p className="text-xs text-muted-foreground">At least 8 characters.</p>
            </div>

            <SubmitButton pendingText="Creating account…">Sign up</SubmitButton>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:text-gold/80 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
