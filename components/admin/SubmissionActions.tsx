"use client";

import { approveSubmission, rejectSubmission } from "@/app/actions/submissions";
import { Check, X } from "lucide-react";

export function SubmissionActions({ id, name }: { id: string; name: string }) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button
        type="button"
        onClick={async () => {
          if (window.confirm(`Approve "${name}" and add it to the spirits database?`)) {
            await approveSubmission(id);
          }
        }}
        className="inline-flex items-center gap-1 rounded-lg bg-forest/20 border border-forest/30 px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest/30 transition-colors"
      >
        <Check className="h-3.5 w-3.5" />
        Approve
      </button>
      <button
        type="button"
        onClick={async () => {
          if (window.confirm(`Reject "${name}"?`)) {
            await rejectSubmission(id);
          }
        }}
        className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
        Reject
      </button>
    </div>
  );
}
