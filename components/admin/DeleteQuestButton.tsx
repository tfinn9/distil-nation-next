"use client";

import { Trash2 } from "lucide-react";
import { deleteQuest } from "@/app/actions/admin";

export function DeleteQuestButton({ id, name }: { id: string; name: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (window.confirm(`Delete quest "${name}"? This cannot be undone.`)) {
          await deleteQuest(id);
        }
      }}
      className="text-muted-foreground hover:text-destructive transition-colors"
      title="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
