"use client";

import { useState, useRef, useEffect } from "react";
import { submitSpirit } from "@/app/actions/submissions";
import { Search, Send, ExternalLink } from "lucide-react";
import Link from "next/link";

interface MatchedSpirit {
  slug: string;
  name: string;
  distillery_slug: string;
  category: string;
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-offwhite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50";
const labelClass = "block text-sm font-medium text-offwhite mb-1.5";

const CATEGORIES = ["Gin", "Whisky", "Rum", "Vodka", "Liqueur", "Other"];

export function SpiritSubmissionForm({ userEmail }: { userEmail?: string | null }) {
  const [spiritName, setSpiritName] = useState("");
  const [matches, setMatches] = useState<MatchedSpirit[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNameChange(value: string) {
    setSpiritName(value);
    setError(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setMatches([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/spirits/search?q=${encodeURIComponent(value.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setMatches(data.spirits || []);
          setShowDropdown(data.spirits?.length > 0);
        }
      } catch {
        // Silently fail — autocomplete is best-effort
      }
    }, 300);
  }

  return (
    <div className="space-y-6">
      {/* Spirit Name with autocomplete */}
      <div className="relative" ref={dropdownRef}>
        <label htmlFor="spirit_name" className={labelClass}>
          Spirit Name <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            id="spirit_name"
            name="spirit_name"
            value={spiritName}
            onChange={(e) => handleNameChange(e.target.value)}
            onFocus={() => matches.length > 0 && setShowDropdown(true)}
            placeholder="Start typing the spirit name..."
            required
            autoComplete="off"
            className={`${inputClass} pl-9`}
          />
        </div>

        {showDropdown && matches.length > 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-card shadow-xl max-h-64 overflow-y-auto">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs text-gold font-medium">
                We might already have this spirit listed:
              </p>
            </div>
            {matches.map((spirit) => (
              <Link
                key={spirit.slug}
                href={`/spirits/${spirit.slug}/`}
                className="flex items-center justify-between px-3 py-2.5 hover:bg-gold/10 transition-colors border-b border-border/50 last:border-b-0"
              >
                <div>
                  <p className="text-sm text-offwhite font-medium">{spirit.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {spirit.distillery_slug.replace(/-/g, " ")} &middot; {spirit.category}
                  </p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setShowDropdown(false)}
              className="w-full px-3 py-2 text-xs text-gold hover:bg-gold/10 transition-colors text-center"
            >
              Not what I&apos;m looking for — continue submitting
            </button>
          </div>
        )}
      </div>

      {/* Rest of the form */}
      <form
        action={async (formData: FormData) => {
          setLoading(true);
          setError(null);
          formData.set("spirit_name", spiritName);
          try {
            await submitSpirit(formData);
            setSubmitted(true);
          } catch (err) {
            // Redirect errors from server actions are re-thrown — check if it's a redirect
            const message = err instanceof Error ? err.message : "Something went wrong";
            if (message.includes("NEXT_REDIRECT")) {
              // This is normal — the redirect will handle navigation
              return;
            }
            setError(message);
          } finally {
            setLoading(false);
          }
        }}
        className="space-y-5"
      >
        <input type="hidden" name="spirit_name" value={spiritName} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="distillery_name" className={labelClass}>Distillery Name</label>
            <input
              type="text"
              id="distillery_name"
              name="distillery_name"
              placeholder="e.g. Scapegrace"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <select id="category" name="category" className={inputClass}>
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="subcategory" className={labelClass}>Sub-category</label>
            <input
              type="text"
              id="subcategory"
              name="subcategory"
              placeholder="e.g. London Dry, Single Malt"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="abv" className={labelClass}>ABV (%)</label>
            <input
              type="number"
              id="abv"
              name="abv"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g. 42.5"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="region" className={labelClass}>Region</label>
            <input
              type="text"
              id="region"
              name="region"
              placeholder="e.g. Canterbury, Auckland"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="official_url" className={labelClass}>Official Website</label>
            <input
              type="url"
              id="official_url"
              name="official_url"
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Tell us about this spirit..."
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>Notes for the team</label>
          <textarea
            id="notes"
            name="notes"
            rows={2}
            placeholder="Anything else we should know? Where did you find it?"
            className={inputClass}
          />
        </div>

        {!userEmail && (
          <div>
            <label htmlFor="email" className={labelClass}>Your Email (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="So we can let you know when it's added"
              className={inputClass}
            />
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !spiritName.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
          {loading ? "Submitting..." : "Submit Spirit"}
        </button>
      </form>
    </div>
  );
}
