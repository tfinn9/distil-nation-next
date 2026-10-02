import type { Spirit } from "@/types/passport";

// Static seed data for NZ spirits — serves as initial data before DB is populated.
// Only includes spirits we can verify actually exist. Details left null where unconfirmed.

const ts = "2024-01-01T00:00:00Z";
let i = 0;
function uid() { i++; return `00000000-0000-0000-0000-${String(i).padStart(12, "0")}`; }

export const spirits: Spirit[] = [
  // ── Scapegrace (Canterbury) ─────────────────────────────────────────
  { id: uid(), slug: "scapegrace-classic-gin", name: "Scapegrace Classic Gin", distillery_slug: "scapegrace", category: "Gin", subcategory: "London Dry", image_url: null, abv: 42.2, region: "Canterbury", description: "A modern classic NZ gin with 12 botanicals.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.scapegrace.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "scapegrace-gold-gin", name: "Scapegrace Gold Gin", distillery_slug: "scapegrace", category: "Gin", subcategory: "Flavoured Gin", image_url: null, abv: 42.2, region: "Canterbury", description: "A citrus-forward gin that turns gold when tonic is added.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.scapegrace.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "scapegrace-black-gin", name: "Scapegrace Black Gin", distillery_slug: "scapegrace", category: "Gin", subcategory: "Flavoured Gin", image_url: null, abv: 41.6, region: "Canterbury", description: "An all-black gin made with aronia berry and butterfly pea flower.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.scapegrace.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "scapegrace-dry-gin", name: "Scapegrace Dry Gin", distillery_slug: "scapegrace", category: "Gin", subcategory: "Dry Gin", image_url: null, abv: 42.2, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.scapegrace.com/", review_slug: null, created_at: ts, updated_at: ts },

  // ── Cardrona Distillery (Central Otago) ─────────────────────────────
  { id: uid(), slug: "cardrona-the-source-gin", name: "The Source Gin", distillery_slug: "cardrona-distillery", category: "Gin", subcategory: null, image_url: null, abv: 47, region: "Central Otago", description: "Made using pure water from the Cardrona Valley.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.cardronadistillery.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "cardrona-growing-wings", name: "Growing Wings Single Malt", distillery_slug: "cardrona-distillery", category: "Whisky", subcategory: "Single Malt", image_url: null, abv: null, region: "Central Otago", description: "Cardrona's release of young single malt whisky.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.cardronadistillery.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "cardrona-just-hatched", name: "Just Hatched Whisky", distillery_slug: "cardrona-distillery", category: "Whisky", subcategory: "Single Malt", image_url: null, abv: null, region: "Central Otago", description: "An early-stage release from Cardrona.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.cardronadistillery.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "cardrona-full-flight", name: "Full Flight Whisky", distillery_slug: "cardrona-distillery", category: "Whisky", subcategory: "Single Malt", image_url: null, abv: null, region: "Central Otago", description: "Cardrona's mature single malt whisky expression.", release_status: "limited", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.cardronadistillery.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "cardrona-reid-vodka", name: "Reid Vodka", distillery_slug: "cardrona-distillery", category: "Vodka", subcategory: null, image_url: null, abv: null, region: "Central Otago", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.cardronadistillery.com/", review_slug: null, created_at: ts, updated_at: ts },

  // ── Thomson Whisky (Auckland) ───────────────────────────────────────
  { id: uid(), slug: "thomson-manuka-smoke", name: "Thomson Manuka Smoke Whisky", distillery_slug: "thomson-whisky", category: "Whisky", subcategory: "Single Malt", image_url: null, abv: 46, region: "Auckland", description: "Smoked over manuka wood chips for a uniquely NZ flavour.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://thomsonwhisky.co.nz/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "thomson-south-island-peat", name: "Thomson South Island Peat Whisky", distillery_slug: "thomson-whisky", category: "Whisky", subcategory: "Single Malt", image_url: null, abv: 46, region: "Auckland", description: "Peated with South Island peat for a Kiwi take on smoky whisky.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://thomsonwhisky.co.nz/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "thomson-two-tone", name: "Thomson Two Tone Whisky", distillery_slug: "thomson-whisky", category: "Whisky", subcategory: "Blended Malt", image_url: null, abv: 46, region: "Auckland", description: "A blend of manuka smoke and peat expressions.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://thomsonwhisky.co.nz/", review_slug: null, created_at: ts, updated_at: ts },

  // ── Reefton Distilling Co (West Coast) ──────────────────────────────
  { id: uid(), slug: "little-biddy-gin", name: "Little Biddy Classic Gin", distillery_slug: "reefton-distilling-co", category: "Gin", subcategory: null, image_url: null, abv: 40, region: "West Coast", description: "Named after the pioneer woman who walked the West Coast.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://reeftondistillingco.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "little-biddy-pink-gin", name: "Little Biddy Pink Gin", distillery_slug: "reefton-distilling-co", category: "Gin", subcategory: "Flavoured Gin", image_url: null, abv: 40, region: "West Coast", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://reeftondistillingco.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "reefton-gold-seeker-rye", name: "Reefton Gold Seeker Rye", distillery_slug: "reefton-distilling-co", category: "Whisky", subcategory: "Rye", image_url: null, abv: null, region: "West Coast", description: "A rye whisky from the gold-rush country of the West Coast.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://reeftondistillingco.com/", review_slug: null, created_at: ts, updated_at: ts },

  // ── Reid + Reid (Wellington) ────────────────────────────────────────
  { id: uid(), slug: "reid-reid-native-gin", name: "Reid + Reid Native Gin", distillery_slug: "reid-and-reid", category: "Gin", subcategory: "NZ Native Botanical", image_url: null, abv: 42, region: "Wellington", description: "A gin celebrating NZ native botanicals.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Lighthouse Gin (Canterbury) ─────────────────────────────────────
  { id: uid(), slug: "lighthouse-gin", name: "Lighthouse Gin", distillery_slug: "lighthouse-gin", category: "Gin", subcategory: null, image_url: null, abv: 42.8, region: "Canterbury", description: "A premium NZ gin from the Akaroa region.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "lighthouse-hawthorn-gin", name: "Lighthouse Hawthorn Gin", distillery_slug: "lighthouse-gin", category: "Gin", subcategory: "Flavoured Gin", image_url: null, abv: null, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── 1919 Distilling (Auckland) ──────────────────────────────────────
  { id: uid(), slug: "1919-gin", name: "1919 Gin", distillery_slug: "1919-distilling", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Auckland", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://1919distilling.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "1919-whisky", name: "1919 Whisky", distillery_slug: "1919-distilling", category: "Whisky", subcategory: null, image_url: null, abv: null, region: "Auckland", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://1919distilling.com/", review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "1919-rum", name: "1919 Rum", distillery_slug: "1919-distilling", category: "Rum", subcategory: null, image_url: null, abv: null, region: "Auckland", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://1919distilling.com/", review_slug: null, created_at: ts, updated_at: ts },

  // ── The Spirits Workshop (Canterbury) ───────────────────────────────
  { id: uid(), slug: "spirits-workshop-gin", name: "Spirits Workshop Gin", distillery_slug: "the-spirits-workshop", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "spirits-workshop-whisky", name: "Spirits Workshop Whisky", distillery_slug: "the-spirits-workshop", category: "Whisky", subcategory: null, image_url: null, abv: null, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "spirits-workshop-limoncello", name: "Spirits Workshop Limoncello", distillery_slug: "the-spirits-workshop", category: "Liqueur", subcategory: "Limoncello", image_url: null, abv: null, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Broken Heart Spirits (Canterbury) ───────────────────────────────
  { id: uid(), slug: "broken-heart-gin", name: "Broken Heart Gin", distillery_slug: "broken-heart-spirits", category: "Gin", subcategory: "London Dry", image_url: null, abv: 40, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "broken-heart-navy-strength", name: "Broken Heart Navy Strength Gin", distillery_slug: "broken-heart-spirits", category: "Gin", subcategory: "Navy Strength", image_url: null, abv: 57, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "broken-heart-vodka", name: "Broken Heart Vodka", distillery_slug: "broken-heart-spirits", category: "Vodka", subcategory: null, image_url: null, abv: 40, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Juno Gin (Canterbury) ───────────────────────────────────────────
  { id: uid(), slug: "juno-gin", name: "Juno Gin", distillery_slug: "juno-gin", category: "Gin", subcategory: null, image_url: null, abv: 42, region: "Canterbury", description: "A small-batch Canterbury gin.", release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Village Distillery (Tasman) — brand: Dancing Sands ──────────────
  { id: uid(), slug: "dancing-sands-sun-kissed-gin", name: "Dancing Sands Sun Kissed Gin", distillery_slug: "village-distillery", category: "Gin", subcategory: "Flavoured Gin", image_url: null, abv: null, region: "Tasman", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "dancing-sands-dry-gin", name: "Dancing Sands Dry Gin", distillery_slug: "village-distillery", category: "Gin", subcategory: "Dry Gin", image_url: null, abv: null, region: "Tasman", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "dancing-sands-vodka", name: "Dancing Sands Vodka", distillery_slug: "village-distillery", category: "Vodka", subcategory: null, image_url: null, abv: null, region: "Tasman", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Mrs Woolly Jones (Southland) ────────────────────────────────────
  { id: uid(), slug: "mrs-woolly-jones-whisky", name: "Mrs Woolly Jones Whisky", distillery_slug: "mrs-woolly-jones", category: "Whisky", subcategory: "Single Malt", image_url: null, abv: null, region: "Southland", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── NZ Whisky Company (Central Otago) ───────────────────────────────
  { id: uid(), slug: "nz-whisky-milford-20yo", name: "The New Zealand Whisky Collection Milford 20yo", distillery_slug: "the-new-zealand-whisky-company", category: "Whisky", subcategory: "Single Malt", image_url: null, abv: null, region: "Central Otago", description: "Aged single malt from the old Willowbank stock.", release_status: "limited", release_year: null, age_statement: "20 Year Old", cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
  { id: uid(), slug: "nz-whisky-oamaruvian", name: "Oamaruvian Single Malt", distillery_slug: "the-new-zealand-whisky-company", category: "Whisky", subcategory: "Single Malt", image_url: null, abv: null, region: "Central Otago", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Rogue Society (Canterbury) ──────────────────────────────────────
  { id: uid(), slug: "scoundrel-gin", name: "Scoundrel Gin", distillery_slug: "rogue-society", category: "Gin", subcategory: null, image_url: null, abv: 42.3, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Budo Spirits (Auckland) ─────────────────────────────────────────
  { id: uid(), slug: "budo-gin", name: "Budo Gin", distillery_slug: "budo-spirits", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Auckland", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: "https://www.budospirits.com/", review_slug: null, created_at: ts, updated_at: ts },

  // ── d:STIL (Auckland) ───────────────────────────────────────────────
  { id: uid(), slug: "coatesvillian-gin", name: "Coatesvillian Gin", distillery_slug: "d-stil", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Auckland", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Simply Pure (Bay of Plenty) ─────────────────────────────────────
  { id: uid(), slug: "black-robin-gin", name: "Black Robin Gin", distillery_slug: "simply-pure", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Bay of Plenty", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Karori Drinks Company (Wellington) ──────────────────────────────
  { id: uid(), slug: "chemistry-gin", name: "Chemistry Gin", distillery_slug: "karori-drinks-company", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Wellington", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Elemental Distillers (Marlborough) ──────────────────────────────
  { id: uid(), slug: "roots-gin", name: "Roots Gin", distillery_slug: "elemental-distillers", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Marlborough", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Rakiura Distilling Co (Southland) ───────────────────────────────
  { id: uid(), slug: "third-island-gin", name: "Third Island Gin", distillery_slug: "rakiura-distilling-co", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Southland", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Taylor Pass Honey Co (Marlborough) ──────────────────────────────
  { id: uid(), slug: "taylor-pass-honey-liqueur", name: "Taylor Pass Honey Liqueur", distillery_slug: "taylor-pass-honey-co", category: "Liqueur", subcategory: "Honey Liqueur", image_url: null, abv: null, region: "Marlborough", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Rough Hands (Tasman) ────────────────────────────────────────────
  { id: uid(), slug: "elsewhen-brandy", name: "Elsewhen Brandy", distillery_slug: "rough-hands", category: "Other", subcategory: "Brandy", image_url: null, abv: null, region: "Tasman", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── Rotorua Distilling Co (Waikato) ─────────────────────────────────
  { id: uid(), slug: "pink-and-white-gin", name: "Pink & White Gin", distillery_slug: "rotorua-distilling-co", category: "Gin", subcategory: "Flavoured Gin", image_url: null, abv: null, region: "Waikato", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── KJ & Co Distillery (Canterbury) ─────────────────────────────────
  { id: uid(), slug: "last-minute-gin", name: "Last Minute Gin", distillery_slug: "kj-co-distillery", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Canterbury", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },

  // ── JD Distillery (Waikato) ─────────────────────────────────────────
  { id: uid(), slug: "mile-marker-gin", name: "Mile Marker Gin", distillery_slug: "jd-distillery", category: "Gin", subcategory: null, image_url: null, abv: null, region: "Waikato", description: null, release_status: "core_range", release_year: null, age_statement: null, cask_info: null, botanicals: null, awards: null, official_url: null, review_slug: null, created_at: ts, updated_at: ts },
];

/** Lookup spirits by distillery slug */
export function getSpiritsByDistillery(distillerySlug: string): Spirit[] {
  return spirits.filter((s) => s.distillery_slug === distillerySlug);
}

/** Get a spirit by slug */
export function getSpiritBySlug(slug: string): Spirit | undefined {
  return spirits.find((s) => s.slug === slug);
}
