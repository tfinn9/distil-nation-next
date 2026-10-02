"use client";

import { useActionState, useState } from "react";
import { createSpirit, updateSpirit, deleteSpirit } from "@/app/actions/admin";
import type { Spirit } from "@/types/passport";
import { SPIRIT_CATEGORIES, RELEASE_STATUS_LABELS } from "@/types/passport";

interface SpiritFormProps {
  spirit?: Spirit | null;
  distilleries: { slug: string; name: string }[];
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-offwhite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50";
const labelClass = "block text-sm font-medium text-offwhite mb-1.5";
const selectClass = inputClass;

export function SpiritForm({ spirit, distilleries }: SpiritFormProps) {
  const isEdit = !!spirit;
  const [selectedDistillerySlug, setSelectedDistillerySlug] = useState(
    spirit?.distillery_slug ?? ""
  );

  const [error, formAction, isPending] = useActionState<
    string | null,
    FormData
  >(
    async (_prevState, formData) => {
      try {
        if (isEdit && spirit) {
          await updateSpirit(spirit.id, formData);
        } else {
          await createSpirit(formData);
        }
        return null;
      } catch (err) {
        if (err instanceof Error && err.message === "NEXT_REDIRECT") {
          throw err;
        }
        return err instanceof Error
          ? err.message
          : "An unexpected error occurred";
      }
    },
    null
  );

  return (
    <div className="space-y-6">
      <form id="spirit-form" action={formAction} className="space-y-6">
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={spirit?.name ?? ""}
              placeholder="e.g. Cardrona Single Malt"
              className={inputClass}
            />
          </div>

          {/* Distillery */}
          <div>
            <label htmlFor="distillery_slug" className={labelClass}>
              Distillery <span className="text-red-400">*</span>
            </label>
            <select
              id="distillery_slug"
              name="distillery_slug"
              required
              value={selectedDistillerySlug}
              onChange={(e) => setSelectedDistillerySlug(e.target.value)}
              className={selectClass}
            >
              <option value="" disabled>
                Select a distillery
              </option>
              {distilleries.map((distillery) => (
                <option key={distillery.slug} value={distillery.slug}>
                  {distillery.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={labelClass}>
              Category <span className="text-red-400">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue={spirit?.category ?? SPIRIT_CATEGORIES[0]}
              className={selectClass}
            >
              {SPIRIT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label htmlFor="subcategory" className={labelClass}>
              Subcategory
            </label>
            <input
              id="subcategory"
              name="subcategory"
              type="text"
              defaultValue={spirit?.subcategory ?? ""}
              placeholder="e.g. London Dry, Single Malt"
              className={inputClass}
            />
          </div>

          {/* ABV */}
          <div>
            <label htmlFor="abv" className={labelClass}>
              ABV (%)
            </label>
            <input
              id="abv"
              name="abv"
              type="number"
              step="0.1"
              min="0"
              max="100"
              defaultValue={spirit?.abv ?? ""}
              placeholder="43.0"
              className={inputClass}
            />
          </div>

          {/* Region */}
          <div>
            <label htmlFor="region" className={labelClass}>
              Region
            </label>
            <input
              id="region"
              name="region"
              type="text"
              defaultValue={spirit?.region ?? ""}
              placeholder="e.g. Central Otago"
              className={inputClass}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={spirit?.description ?? ""}
            placeholder="Tasting notes, production details, story..."
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Release Status */}
          <div>
            <label htmlFor="release_status" className={labelClass}>
              Release Status
            </label>
            <select
              id="release_status"
              name="release_status"
              defaultValue={spirit?.release_status ?? "core_range"}
              className={selectClass}
            >
              {Object.entries(RELEASE_STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Release Year */}
          <div>
            <label htmlFor="release_year" className={labelClass}>
              Release Year
            </label>
            <input
              id="release_year"
              name="release_year"
              type="number"
              min="1800"
              max={new Date().getFullYear() + 1}
              defaultValue={spirit?.release_year ?? ""}
              placeholder="2025"
              className={inputClass}
            />
          </div>

          {/* Age Statement */}
          <div>
            <label htmlFor="age_statement" className={labelClass}>
              Age Statement
            </label>
            <input
              id="age_statement"
              name="age_statement"
              type="text"
              defaultValue={spirit?.age_statement ?? ""}
              placeholder="e.g. 12 Years"
              className={inputClass}
            />
          </div>

          {/* Cask Info */}
          <div>
            <label htmlFor="cask_info" className={labelClass}>
              Cask Info
            </label>
            <input
              id="cask_info"
              name="cask_info"
              type="text"
              defaultValue={spirit?.cask_info ?? ""}
              placeholder="e.g. Ex-bourbon, 225L"
              className={inputClass}
            />
          </div>
        </div>

        {/* Official URL */}
        <div>
          <label htmlFor="official_url" className={labelClass}>
            Official URL
          </label>
          <input
            id="official_url"
            name="official_url"
            type="url"
            defaultValue={spirit?.official_url ?? ""}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </form>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
        <button
          type="submit"
          form="spirit-form"
          disabled={isPending}
          className="bg-gold text-background font-medium px-6 py-2.5 rounded-xl hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? isEdit
              ? "Saving..."
              : "Creating..."
            : isEdit
              ? "Save Changes"
              : "Create Spirit"}
        </button>

        {isEdit && spirit && (
          <form
            action={deleteSpirit.bind(null, spirit.id)}
            onSubmit={(e) => {
              if (
                !window.confirm(
                  "Are you sure you want to delete this spirit? This action cannot be undone."
                )
              ) {
                e.preventDefault();
              }
            }}
            className="inline"
          >
            <button
              type="submit"
              disabled={isPending}
              className="bg-red-600 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              Delete
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
