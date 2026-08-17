"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn, type AuthActionState } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const initialState: AuthActionState = { error: null };

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, initialState);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-3xl font-semibold text-offwhite">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Log in to your Distil-Nation account.</p>
        </div>

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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm text-muted-foreground">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-gold hover:text-gold/80">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-offwhite focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <SubmitButton pendingText="Logging in…">Log in</SubmitButton>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-gold hover:text-gold/80 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
