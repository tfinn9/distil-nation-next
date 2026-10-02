"use client";

import { Trash2 } from "lucide-react";
import { deleteSpirit } from "@/app/actions/admin";

export function DeleteSpiritButton({ id, name }: { id: string; name: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
          await deleteSpirit(id);
        }
      }}
      className="text-muted-foreground hover:text-destructive transition-colors"
      title="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
