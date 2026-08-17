"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText,
  className,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ||
        "w-full rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      }
    >
      {pending ? pendingText || "Please wait…" : children}
    </button>
  );
}
