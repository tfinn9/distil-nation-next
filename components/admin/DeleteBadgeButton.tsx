"use client";

import { Trash2 } from "lucide-react";
import { deleteBadge } from "@/app/actions/admin";

export function DeleteBadgeButton({ id, name }: { id: string; name: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (window.confirm(`Delete badge "${name}"? This cannot be undone.`)) {
          await deleteBadge(id);
        }
      }}
      className="text-muted-foreground hover:text-destructive transition-colors"
      title="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
