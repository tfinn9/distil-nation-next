"use client";

import { createQuest, updateQuest, deleteQuest } from "@/app/actions/admin";
import type { Quest, QuestType } from "@/types/passport";

interface QuestFormProps {
  quest?: Quest | null;
  badges: { id: string; name: string }[];
}

const QUEST_TYPES: QuestType[] = [
  "evergreen",
  "regional",
  "editorial",
  "seasonal",
];

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-offwhite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50";
const labelClass = "block text-sm font-medium text-offwhite mb-1.5";

const EXAMPLE_CRITERIA = [
  '{"type":"visit_distilleries","count":5}',
  '{"type":"visit_region","region":"Canterbury","count":3}',
  '{"type":"try_spirits","category":"Gin","count":10}',
  '{"type":"earn_badges","count":3}',
  '{"type":"complete_collection","distillery":"example-distillery"}',
];

export default function QuestForm({ quest, badges }: QuestFormProps) {
  const isEditing = Boolean(quest);
  const questId = quest?.id;

  return (
    <form
      action={questId ? updateQuest.bind(null, questId) : createQuest}
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
          defaultValue={quest?.name ?? ""}
          placeholder="e.g. South Island Explorer"
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
          defaultValue={quest?.description ?? ""}
          placeholder="Describe the quest and what the user needs to do"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="quest_type" className={labelClass}>
          Quest Type
        </label>
        <select
          id="quest_type"
          name="quest_type"
          required
          defaultValue={quest?.quest_type ?? "evergreen"}
          className={inputClass}
        >
          {QUEST_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
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
            quest?.requirements
              ? JSON.stringify(quest.requirements, null, 2)
              : "{}"
          }
          placeholder='{"type":"visit_distilleries","count":5}'
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

      <div>
        <label htmlFor="reward_badge_id" className={labelClass}>
          Reward Badge
        </label>
        <select
          id="reward_badge_id"
          name="reward_badge_id"
          defaultValue={quest?.reward_badge_id ?? ""}
          className={inputClass}
        >
          <option value="">None</option>
          {badges.map((badge) => (
            <option key={badge.id} value={badge.id}>
              {badge.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="start_date" className={labelClass}>
            Start Date
          </label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            defaultValue={quest?.start_date ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="end_date" className={labelClass}>
            End Date
          </label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={quest?.end_date ?? ""}
            className={inputClass}
          />
        </div>
      </div>

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
          defaultValue={quest?.sort_order ?? 0}
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
          defaultChecked={quest?.is_active ?? true}
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
          {isEditing ? "Update Quest" : "Create Quest"}
        </button>

        {isEditing && questId && (
          <button
            type="submit"
            formAction={deleteQuest.bind(null, questId)}
            onClick={(e) => {
              if (
                !window.confirm(
                  "Are you sure you want to delete this quest? This action cannot be undone."
                )
              ) {
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
