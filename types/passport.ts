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
