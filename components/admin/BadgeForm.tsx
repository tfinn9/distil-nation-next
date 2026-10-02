"use client";

import { useState } from "react";
import { createBadge, updateBadge, deleteBadge } from "@/app/actions/admin";
import type { Badge, BadgeCategory } from "@/types/passport";

interface BadgeFormProps {
  badge?: Badge | null;
}

const CATEGORIES: BadgeCategory[] = [
  "general",
  "regional",
  "distillery",
  "category",
  "special",
];

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-offwhite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50";
const labelClass = "block text-sm font-medium text-offwhite mb-1.5";

const EXAMPLE_CRITERIA = [
  '{"type":"spirits_tried","count":5}',
  '{"type":"distilleries_visited","count":3}',
  '{"type":"region_visited","region":"Canterbury","count":3}',
  '{"type":"distillery_superfan","count":3}',
  '{"type":"both_islands"}',
  '{"type":"categories_explored","categories":["Gin","Whisky","Rum"],"count":3}',
  '{"type":"category_from_distilleries","category":"Gin","count":5}',
  '{"type":"manual"}',
];

export default function BadgeForm({ badge }: BadgeFormProps) {
  const isEditing = Boolean(badge);
  const badgeId = badge?.id;
  const [grantsTitle, setGrantsTitle] = useState(badge?.grants_title ?? false);

  return (
    <form
      action={badgeId ? updateBadge.bind(null, badgeId) : createBadge}
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={badge?.name ?? ""}
          placeholder="e.g. Spirit Seeker"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={badge?.description ?? ""}
          placeholder="Short description of how the badge is earned"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={badge?.category ?? "general"}
          className={inputClass}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="criteria" className={labelClass}>
          Criteria (JSON)
        </label>
        <textarea
          id="criteria"
          name="criteria"
          required
          rows={8}
          defaultValue={
            badge ? JSON.stringify(badge.criteria, null, 2) : "{}"
          }
          placeholder='{"type":"spirits_tried","count":5}'
          className={inputClass}
        />
        <div className="mt-4 rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-sm font-medium text-offwhite">
            Example criteria
          </p>
          <pre className="overflow-x-auto rounded-lg bg-background p-3 text-xs text-muted-foreground">
            {EXAMPLE_CRITERIA.join("\n")}
          </pre>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="grants_title"
          name="grants_title"
          type="checkbox"
          value="on"
          checked={grantsTitle}
          onChange={(e) => setGrantsTitle(e.target.checked)}
          className="h-4 w-4 rounded border-border bg-background text-gold focus:ring-2 focus:ring-gold/50"
        />
        <label htmlFor="grants_title" className="text-sm text-offwhite">
          Grants Title
        </label>
      </div>

      {grantsTitle && (
        <div>
          <label htmlFor="title_text" className={labelClass}>
            Title Text
          </label>
          <input
            id="title_text"
            name="title_text"
            type="text"
            required={grantsTitle}
            defaultValue={badge?.title_text ?? ""}
            placeholder="e.g. Spirit Seeker"
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label htmlFor="sort_order" className={labelClass}>
          Sort Order
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          min={0}
          step={1}
          defaultValue={badge?.sort_order ?? 0}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-2">
        <input type="hidden" name="is_active" value="off" />
        <input
          id="is_active"
          name="is_active"
          type="checkbox"
          value="on"
          defaultChecked={badge?.is_active ?? true}
          className="h-4 w-4 rounded border-border bg-background text-gold focus:ring-2 focus:ring-gold/50"
        />
        <label htmlFor="is_active" className="text-sm text-offwhite">
          Active
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          className="rounded-xl bg-gold px-6 py-2.5 text-sm font-semibold text-background hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-gold/50"
        >
          {isEditing ? "Update Badge" : "Create Badge"}
        </button>

        {isEditing && badgeId && (
          <button
            type="submit"
            formAction={deleteBadge.bind(null, badgeId)}
            onClick={(e) => {
              if (!window.confirm("Are you sure you want to delete this badge? This action cannot be undone.")) {
                e.preventDefault();
              }
            }}
            className="rounded-xl border border-destructive px-6 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-destructive/50"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
