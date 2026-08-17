export interface Episode {
  slug: string;
  episodeNumber: string;
  title: string;
  guest: string;
  summary: string;
  duration: string;
  youtube?: string;
  spotify?: string;
  spreaker?: string;
  thumbnail: string;
  spiritType: string;
  region: string;
  productsMentioned?: string[];
}

export interface Distillery {
  slug: string;
  name: string;
  region: string;
  island: "North" | "South";
  isActive: boolean;
  spiritTypes: string[];
  description: string;
  heroImage: string;
  founded?: string;
  owners?: string;
  awards?: string[];
  website?: string;
  visitorInfo?: string;
  hasVisitorCentre: boolean;
  hasTours: boolean;
  products: string[];
  episodeSlug?: string;
  lat?: number;
  lng?: number;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  content?: string;
}

export interface Review {
  slug: string;
  name: string;
  distillery: string;
  image: string;
  rating: number;
  nose?: string;
  palate?: string;
  finish?: string;
  value?: string;
  recommendedFor?: string[];
  pros?: string[];
  cons?: string[];
  spiritType: string;
}

export interface Event {
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Host {
  name: string;
  role: string;
  bio: string;
  image: string;
}
