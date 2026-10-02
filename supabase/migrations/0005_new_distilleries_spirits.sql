-- Phase 5: Additional distilleries and spirits discovered from NZ Spirit Guide
-- Run in Supabase Dashboard -> SQL Editor after 0004_seed_spirits.sql

-- New spirits for distilleries we already have but were missing spirits
INSERT INTO public.spirits (slug, name, distillery_slug, category, subcategory, abv, region, description, release_status, official_url)
VALUES
  -- Broken Heart Spirits — already have gin/vodka, adding rum
  ('broken-heart-rum', 'Broken Heart Rum', 'broken-heart-spirits', 'Rum', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL),

  -- Scapegrace — adding vodka
  ('scapegrace-vodka', 'Scapegrace Vodka', 'scapegrace', 'Vodka', NULL, NULL, 'Canterbury', NULL, 'core_range', 'https://www.scapegrace.com/'),

  -- Thomson Whisky — adding gin
  ('thomson-gin', 'Thomson Gin', 'thomson-whisky', 'Gin', NULL, NULL, 'Auckland', NULL, 'core_range', 'https://thomsonwhisky.co.nz/'),

  -- Reefton Distilling — adding vodka
  ('little-biddy-vodka', 'Little Biddy Vodka', 'reefton-distilling-co', 'Vodka', NULL, NULL, 'West Coast', NULL, 'core_range', 'https://reeftondistillingco.com/'),

  -- Dancing Sands / Village Distillery — adding rum
  ('dancing-sands-rum', 'Dancing Sands Rum', 'village-distillery', 'Rum', NULL, NULL, 'Tasman', NULL, 'core_range', NULL),

  -- KJ & Co Distillery — adding rum and vodka
  ('last-minute-rum', 'Last Minute Rum', 'kj-co-distillery', 'Rum', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL),
  ('last-minute-vodka', 'Last Minute Vodka', 'kj-co-distillery', 'Vodka', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL),

  -- Rakiura Distilling — adding vodka
  ('rakiura-vodka', 'Rakiura Vodka', 'rakiura-distilling-co', 'Vodka', NULL, NULL, 'Southland', NULL, 'core_range', NULL),

  -- New distilleries entirely missing from our data
  -- Blush Merchants (Auckland)
  ('blush-gin', 'Blush Gin', 'blush-merchants', 'Gin', NULL, NULL, 'Auckland', NULL, 'core_range', NULL),

  -- CarbonSix Distillery (Auckland)
  ('carbonsix-gin', 'CarbonSix Gin', 'carbonsix-distillery', 'Gin', NULL, NULL, 'Auckland', NULL, 'core_range', NULL),
  ('carbonsix-rum', 'CarbonSix Rum', 'carbonsix-distillery', 'Rum', NULL, NULL, 'Auckland', NULL, 'core_range', NULL),

  -- Drift Gin (Otago)
  ('drift-gin', 'Drift Gin', 'drift-gin', 'Gin', NULL, NULL, 'Central Otago', NULL, 'core_range', NULL),

  -- Holland Road Distillery (Waikato)
  ('holland-road-gin', 'Holland Road Gin', 'holland-road-distillery', 'Gin', NULL, NULL, 'Waikato', NULL, 'core_range', NULL),

  -- Moksha Drinks (Auckland)
  ('moksha-gin', 'Moksha Gin', 'moksha-drinks', 'Gin', NULL, NULL, 'Auckland', NULL, 'core_range', NULL),

  -- Mt Fyffe Distillery (Canterbury)
  ('mt-fyffe-gin', 'Mt Fyffe Gin', 'mt-fyffe-distillery', 'Gin', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL),

  -- Nowhere Bourbon (Hawkes Bay)
  ('nowhere-bourbon', 'Nowhere Bourbon', 'nowhere-bourbon', 'Whisky', 'Bourbon', NULL, 'Hawkes Bay', NULL, 'core_range', NULL),

  -- Quick Brown Fox (Otago)
  ('quick-brown-fox-liqueur', 'Quick Brown Fox Liqueur', 'quick-brown-fox', 'Liqueur', 'Coffee Liqueur', NULL, 'Central Otago', NULL, 'core_range', NULL),

  -- SpicyBoys (Canterbury)
  ('spicyboys-gin', 'SpicyBoys Gin', 'spicyboys', 'Gin', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL),

  -- Vicars Son Gin (Manawatu-Whanganui)
  ('vicars-son-gin', 'Vicars Son Gin', 'vicars-son-gin', 'Gin', NULL, NULL, 'Manawatu-Whanganui', NULL, 'core_range', NULL),

  -- Waipara Springs (Canterbury)
  ('waipara-springs-gin', 'Waipara Springs Gin', 'waipara-springs', 'Gin', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL)

ON CONFLICT (slug) DO NOTHING;
