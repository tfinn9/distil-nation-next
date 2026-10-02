export type PassportStatus =
  | "want_to_visit"
  | "visited"
  | "tour_completed"
  | "tasting_completed"
  | "podcast_listened"
  | "video_watched"
  | "favorite";

export const PASSPORT_STATUS_LABELS: Record<PassportStatus, string> = {
  want_to_visit: "Want to visit",
  visited: "Visited",
  tour_completed: "Tour completed",
  tasting_completed: "Tasting completed",
  podcast_listened: "Podcast listened",
  video_watched: "Video watched",
  favorite: "Favourite",
};

export const PASSPORT_STATUS_ORDER: PassportStatus[] = [
  "want_to_visit",
  "visited",
  "tour_completed",
  "tasting_completed",
  "podcast_listened",
  "video_watched",
  "favorite",
];

export interface PassportEntry {
  id: string;
  user_id: string;
  distillery_slug: string;
  statuses: PassportStatus[];
  visited_date: string | null;
  rating: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ── Spirit types ──────────────────────────────────────────────────────
export type SpiritCategory = "Gin" | "Whisky" | "Rum" | "Vodka" | "Liqueur" | "Other";
export type ReleaseStatus = "core_range" | "seasonal" | "limited" | "discontinued" | "historic";

export const RELEASE_STATUS_LABELS: Record<ReleaseStatus, string> = {
  core_range: "Core Range",
  seasonal: "Seasonal",
  limited: "Limited Release",
  discontinued: "Discontinued",
  historic: "Archive",
};

export const SPIRIT_CATEGORIES: SpiritCategory[] = ["Gin", "Whisky", "Rum", "Vodka", "Liqueur", "Other"];

export interface Spirit {
  id: string;
  slug: string;
  name: string;
  distillery_slug: string;
  category: SpiritCategory;
  subcategory: string | null;
  image_url: string | null;
  abv: number | null;
  region: string | null;
  description: string | null;
  release_status: ReleaseStatus;
  release_year: number | null;
  age_statement: string | null;
  cask_info: string | null;
  botanicals: string[] | null;
  awards: string[] | null;
  official_url: string | null;
  review_slug: string | null;
  created_at: string;
  updated_at: string;
}

export type TastingStatus = "tried" | "want_to_try" | "favourite";

export interface SpiritTasting {
  id: string;
  user_id: string;
  spirit_id: string;
  status: TastingStatus;
  rating: number | null;
  notes: string | null;
  date_tried: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

// ── Badge types ───────────────────────────────────────────────────────
export type BadgeCategory = "general" | "regional" | "distillery" | "category" | "special";

export interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_url: string | null;
  category: BadgeCategory;
  criteria: Record<string, unknown>;
  grants_title: boolean;
  title_text: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

// ── Quest types ───────────────────────────────────────────────────────
export type QuestType = "evergreen" | "regional" | "editorial" | "seasonal";

export interface Quest {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_url: string | null;
  quest_type: QuestType;
  requirements: Record<string, unknown>[];
  reward_badge_id: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface UserQuest {
  id: string;
  user_id: string;
  quest_id: string;
  progress: Record<string, unknown>;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  quest?: Quest;
}

// ── Profile types ─────────────────────────────────────────────────────
export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  home_region: string | null;
  is_public: boolean;
  selected_title: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}
