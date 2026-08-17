"use client";

import { signOut } from "@/app/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-offwhite hover:border-gold/50 transition-colors"
      >
        Sign out
      </button>
    </form>
  );
}
