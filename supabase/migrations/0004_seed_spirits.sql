-- Seed: populate spirits table with verified NZ spirits data
-- Run in Supabase Dashboard -> SQL Editor after 0003_passport_full.sql

INSERT INTO public.spirits (slug, name, distillery_slug, category, subcategory, abv, region, description, release_status, official_url)
VALUES
  -- Scapegrace (Canterbury)
  ('scapegrace-classic-gin', 'Scapegrace Classic Gin', 'scapegrace', 'Gin', 'London Dry', 42.2, 'Canterbury', 'A modern classic NZ gin with 12 botanicals.', 'core_range', 'https://www.scapegrace.com/'),
  ('scapegrace-gold-gin', 'Scapegrace Gold Gin', 'scapegrace', 'Gin', 'Flavoured Gin', 42.2, 'Canterbury', 'A citrus-forward gin that turns gold when tonic is added.', 'core_range', 'https://www.scapegrace.com/'),
  ('scapegrace-black-gin', 'Scapegrace Black Gin', 'scapegrace', 'Gin', 'Flavoured Gin', 41.6, 'Canterbury', 'An all-black gin made with aronia berry and butterfly pea flower.', 'core_range', 'https://www.scapegrace.com/'),
  ('scapegrace-dry-gin', 'Scapegrace Dry Gin', 'scapegrace', 'Gin', 'Dry Gin', 42.2, 'Canterbury', NULL, 'core_range', 'https://www.scapegrace.com/'),

  -- Cardrona Distillery (Central Otago)
  ('cardrona-the-source-gin', 'The Source Gin', 'cardrona-distillery', 'Gin', NULL, 47, 'Central Otago', 'Made using pure water from the Cardrona Valley.', 'core_range', 'https://www.cardronadistillery.com/'),
  ('cardrona-growing-wings', 'Growing Wings Single Malt', 'cardrona-distillery', 'Whisky', 'Single Malt', NULL, 'Central Otago', 'Cardrona''s release of young single malt whisky.', 'core_range', 'https://www.cardronadistillery.com/'),
  ('cardrona-just-hatched', 'Just Hatched Whisky', 'cardrona-distillery', 'Whisky', 'Single Malt', NULL, 'Central Otago', 'An early-stage release from Cardrona.', 'core_range', 'https://www.cardronadistillery.com/'),
  ('cardrona-full-flight', 'Full Flight Whisky', 'cardrona-distillery', 'Whisky', 'Single Malt', NULL, 'Central Otago', 'Cardrona''s mature single malt whisky expression.', 'limited', 'https://www.cardronadistillery.com/'),
  ('cardrona-reid-vodka', 'Reid Vodka', 'cardrona-distillery', 'Vodka', NULL, NULL, 'Central Otago', NULL, 'core_range', 'https://www.cardronadistillery.com/'),

  -- Thomson Whisky (Auckland)
  ('thomson-manuka-smoke', 'Thomson Manuka Smoke Whisky', 'thomson-whisky', 'Whisky', 'Single Malt', 46, 'Auckland', 'Smoked over manuka wood chips for a uniquely NZ flavour.', 'core_range', 'https://thomsonwhisky.co.nz/'),
  ('thomson-south-island-peat', 'Thomson South Island Peat Whisky', 'thomson-whisky', 'Whisky', 'Single Malt', 46, 'Auckland', 'Peated with South Island peat for a Kiwi take on smoky whisky.', 'core_range', 'https://thomsonwhisky.co.nz/'),
  ('thomson-two-tone', 'Thomson Two Tone Whisky', 'thomson-whisky', 'Whisky', 'Blended Malt', 46, 'Auckland', 'A blend of manuka smoke and peat expressions.', 'core_range', 'https://thomsonwhisky.co.nz/'),

  -- Reefton Distilling Co (West Coast)
  ('little-biddy-gin', 'Little Biddy Classic Gin', 'reefton-distilling-co', 'Gin', NULL, 40, 'West Coast', 'Named after the pioneer woman who walked the West Coast.', 'core_range', 'https://reeftondistillingco.com/'),
  ('little-biddy-pink-gin', 'Little Biddy Pink Gin', 'reefton-distilling-co', 'Gin', 'Flavoured Gin', 40, 'West Coast', NULL, 'core_range', 'https://reeftondistillingco.com/'),
  ('reefton-gold-seeker-rye', 'Reefton Gold Seeker Rye', 'reefton-distilling-co', 'Whisky', 'Rye', NULL, 'West Coast', 'A rye whisky from the gold-rush country of the West Coast.', 'core_range', 'https://reeftondistillingco.com/'),

  -- Reid + Reid (Wellington)
  ('reid-reid-native-gin', 'Reid + Reid Native Gin', 'reid-and-reid', 'Gin', 'NZ Native Botanical', 42, 'Wellington', 'A gin celebrating NZ native botanicals.', 'core_range', NULL),

  -- Lighthouse Gin (Canterbury)
  ('lighthouse-gin', 'Lighthouse Gin', 'lighthouse-gin', 'Gin', NULL, 42.8, 'Canterbury', 'A premium NZ gin from the Akaroa region.', 'core_range', NULL),
  ('lighthouse-hawthorn-gin', 'Lighthouse Hawthorn Gin', 'lighthouse-gin', 'Gin', 'Flavoured Gin', NULL, 'Canterbury', NULL, 'core_range', NULL),

  -- 1919 Distilling (Auckland)
  ('1919-gin', '1919 Gin', '1919-distilling', 'Gin', NULL, NULL, 'Auckland', NULL, 'core_range', 'https://1919distilling.com/'),
  ('1919-whisky', '1919 Whisky', '1919-distilling', 'Whisky', NULL, NULL, 'Auckland', NULL, 'core_range', 'https://1919distilling.com/'),
  ('1919-rum', '1919 Rum', '1919-distilling', 'Rum', NULL, NULL, 'Auckland', NULL, 'core_range', 'https://1919distilling.com/'),

  -- The Spirits Workshop (Canterbury)
  ('spirits-workshop-gin', 'Spirits Workshop Gin', 'the-spirits-workshop', 'Gin', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL),
  ('spirits-workshop-whisky', 'Spirits Workshop Whisky', 'the-spirits-workshop', 'Whisky', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL),
  ('spirits-workshop-limoncello', 'Spirits Workshop Limoncello', 'the-spirits-workshop', 'Liqueur', 'Limoncello', NULL, 'Canterbury', NULL, 'core_range', NULL),

  -- Broken Heart Spirits (Canterbury)
  ('broken-heart-gin', 'Broken Heart Gin', 'broken-heart-spirits', 'Gin', 'London Dry', 40, 'Canterbury', NULL, 'core_range', NULL),
  ('broken-heart-navy-strength', 'Broken Heart Navy Strength Gin', 'broken-heart-spirits', 'Gin', 'Navy Strength', 57, 'Canterbury', NULL, 'core_range', NULL),
  ('broken-heart-vodka', 'Broken Heart Vodka', 'broken-heart-spirits', 'Vodka', NULL, 40, 'Canterbury', NULL, 'core_range', NULL),

  -- Juno Gin (Canterbury)
  ('juno-gin', 'Juno Gin', 'juno-gin', 'Gin', NULL, 42, 'Canterbury', 'A small-batch Canterbury gin.', 'core_range', NULL),

  -- Village Distillery / Dancing Sands (Tasman)
  ('dancing-sands-sun-kissed-gin', 'Dancing Sands Sun Kissed Gin', 'village-distillery', 'Gin', 'Flavoured Gin', NULL, 'Tasman', NULL, 'core_range', NULL),
  ('dancing-sands-dry-gin', 'Dancing Sands Dry Gin', 'village-distillery', 'Gin', 'Dry Gin', NULL, 'Tasman', NULL, 'core_range', NULL),
  ('dancing-sands-vodka', 'Dancing Sands Vodka', 'village-distillery', 'Vodka', NULL, NULL, 'Tasman', NULL, 'core_range', NULL),

  -- Mrs Woolly Jones (Southland)
  ('mrs-woolly-jones-whisky', 'Mrs Woolly Jones Whisky', 'mrs-woolly-jones', 'Whisky', 'Single Malt', NULL, 'Southland', NULL, 'core_range', NULL),

  -- NZ Whisky Company (Central Otago)
  ('nz-whisky-milford-20yo', 'The New Zealand Whisky Collection Milford 20yo', 'the-new-zealand-whisky-company', 'Whisky', 'Single Malt', NULL, 'Central Otago', 'Aged single malt from the old Willowbank stock.', 'limited', NULL),
  ('nz-whisky-oamaruvian', 'Oamaruvian Single Malt', 'the-new-zealand-whisky-company', 'Whisky', 'Single Malt', NULL, 'Central Otago', NULL, 'core_range', NULL),

  -- Rogue Society (Canterbury)
  ('scoundrel-gin', 'Scoundrel Gin', 'rogue-society', 'Gin', NULL, 42.3, 'Canterbury', NULL, 'core_range', NULL),

  -- Budo Spirits (Auckland)
  ('budo-gin', 'Budo Gin', 'budo-spirits', 'Gin', NULL, NULL, 'Auckland', NULL, 'core_range', 'https://www.budospirits.com/'),

  -- d:STIL (Auckland)
  ('coatesvillian-gin', 'Coatesvillian Gin', 'd-stil', 'Gin', NULL, NULL, 'Auckland', NULL, 'core_range', NULL),

  -- Simply Pure (Bay of Plenty)
  ('black-robin-gin', 'Black Robin Gin', 'simply-pure', 'Gin', NULL, NULL, 'Bay of Plenty', NULL, 'core_range', NULL),

  -- Karori Drinks Company (Wellington)
  ('chemistry-gin', 'Chemistry Gin', 'karori-drinks-company', 'Gin', NULL, NULL, 'Wellington', NULL, 'core_range', NULL),

  -- Elemental Distillers (Marlborough)
  ('roots-gin', 'Roots Gin', 'elemental-distillers', 'Gin', NULL, NULL, 'Marlborough', NULL, 'core_range', NULL),

  -- Rakiura Distilling Co (Southland)
  ('third-island-gin', 'Third Island Gin', 'rakiura-distilling-co', 'Gin', NULL, NULL, 'Southland', NULL, 'core_range', NULL),

  -- Taylor Pass Honey Co (Marlborough)
  ('taylor-pass-honey-liqueur', 'Taylor Pass Honey Liqueur', 'taylor-pass-honey-co', 'Liqueur', 'Honey Liqueur', NULL, 'Marlborough', NULL, 'core_range', NULL),

  -- Rough Hands (Tasman)
  ('elsewhen-brandy', 'Elsewhen Brandy', 'rough-hands', 'Other', 'Brandy', NULL, 'Tasman', NULL, 'core_range', NULL),

  -- Rotorua Distilling Co (Waikato)
  ('pink-and-white-gin', 'Pink & White Gin', 'rotorua-distilling-co', 'Gin', 'Flavoured Gin', NULL, 'Waikato', NULL, 'core_range', NULL),

  -- KJ & Co Distillery (Canterbury)
  ('last-minute-gin', 'Last Minute Gin', 'kj-co-distillery', 'Gin', NULL, NULL, 'Canterbury', NULL, 'core_range', NULL),

  -- JD Distillery (Waikato)
  ('mile-marker-gin', 'Mile Marker Gin', 'jd-distillery', 'Gin', NULL, NULL, 'Waikato', NULL, 'core_range', NULL)

ON CONFLICT (slug) DO NOTHING;


-- ============================================================================
-- Seed: initial badges
-- ============================================================================
INSERT INTO public.badges (slug, name, description, category, criteria, grants_title, title_text, sort_order)
VALUES
  ('first-spirit', 'First Dram', 'Log your first NZ spirit.', 'general', '{"type":"spirits_tried","count":1}', false, NULL, 1),
  ('five-spirits', 'Getting Started', 'Try 5 different NZ spirits.', 'general', '{"type":"spirits_tried","count":5}', false, NULL, 2),
  ('ten-spirits', 'Spirit Curious', 'Try 10 different NZ spirits.', 'general', '{"type":"spirits_tried","count":10}', true, 'Spirit Curious', 3),
  ('twentyfive-spirits', 'Collector', 'Try 25 different NZ spirits.', 'general', '{"type":"spirits_tried","count":25}', true, 'Collector', 4),
  ('first-visit', 'First Visit', 'Visit your first NZ distillery.', 'general', '{"type":"distilleries_visited","count":1}', false, NULL, 5),
  ('five-visits', 'Road Tripper', 'Visit 5 different distilleries.', 'general', '{"type":"distilleries_visited","count":5}', true, 'Road Tripper', 6),
  ('ten-visits', 'Seasoned Explorer', 'Visit 10 different distilleries.', 'general', '{"type":"distilleries_visited","count":10}', true, 'Seasoned Explorer', 7),
  ('both-islands', 'Coast to Coast', 'Visit distilleries on both the North and South Islands.', 'regional', '{"type":"both_islands"}', true, 'Coast to Coast', 10),
  ('canterbury-explorer', 'Canterbury Explorer', 'Visit 3 Canterbury distilleries.', 'regional', '{"type":"region_visited","region":"Canterbury","count":3}', true, 'Canterbury Explorer', 11),
  ('auckland-explorer', 'Auckland Explorer', 'Visit 3 Auckland distilleries.', 'regional', '{"type":"region_visited","region":"Auckland","count":3}', true, 'Auckland Explorer', 12),
  ('central-otago-explorer', 'Central Otago Explorer', 'Visit 2 Central Otago distilleries.', 'regional', '{"type":"region_visited","region":"Central Otago","count":2}', true, 'Central Otago Explorer', 13),
  ('gin-explorer', 'Gin Explorer', 'Try gin from 5 different distilleries.', 'category', '{"type":"category_from_distilleries","category":"Gin","count":5}', true, 'Gin Explorer', 20),
  ('whisky-explorer', 'Whisky Explorer', 'Try whisky from 3 different distilleries.', 'category', '{"type":"category_from_distilleries","category":"Whisky","count":3}', true, 'Whisky Explorer', 21),
  ('well-rounded', 'Well Rounded', 'Try spirits from at least 3 different categories (Gin, Whisky, Rum, Vodka, Liqueur).', 'category', '{"type":"categories_explored","categories":["Gin","Whisky","Rum","Vodka","Liqueur"],"count":3}', true, 'Well Rounded', 22),
  ('super-fan', 'Super Fan', 'Try 3 or more spirits from a single distillery.', 'special', '{"type":"distillery_superfan","count":3}', true, 'Super Fan', 30)
ON CONFLICT (slug) DO NOTHING;


-- ============================================================================
-- Seed: initial quests
-- ============================================================================
INSERT INTO public.quests (slug, name, description, quest_type, criteria, reward_badge_id, sort_order)
VALUES
  ('taste-of-nz', 'A Taste of New Zealand', 'Try one spirit from 5 different NZ regions.', 'evergreen', '{"type":"regions_tasted","count":5}', NULL, 1),
  ('gin-trail', 'The NZ Gin Trail', 'Try gin from 5 different distilleries across New Zealand.', 'evergreen', '{"type":"category_from_distilleries","category":"Gin","count":5}', (SELECT id FROM public.badges WHERE slug = 'gin-explorer'), 2),
  ('whisky-pilgrimage', 'Whisky Pilgrimage', 'Try whisky from 3 different NZ distilleries.', 'evergreen', '{"type":"category_from_distilleries","category":"Whisky","count":3}', (SELECT id FROM public.badges WHERE slug = 'whisky-explorer'), 3),
  ('south-island-road-trip', 'South Island Road Trip', 'Visit 5 South Island distilleries.', 'regional', '{"type":"island_visited","island":"South","count":5}', NULL, 10),
  ('north-island-road-trip', 'North Island Road Trip', 'Visit 5 North Island distilleries.', 'regional', '{"type":"island_visited","island":"North","count":5}', NULL, 11),
  ('canterbury-crawl', 'Canterbury Craft Crawl', 'Visit 3 Canterbury distilleries and try a spirit from each.', 'regional', '{"type":"region_visited_and_tasted","region":"Canterbury","count":3}', (SELECT id FROM public.badges WHERE slug = 'canterbury-explorer'), 12)
ON CONFLICT (slug) DO NOTHING;
