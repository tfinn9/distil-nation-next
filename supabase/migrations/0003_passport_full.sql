-- Phase 3: Full Passport system — spirits, tastings, badges, titles, quests, discovery
-- Run in Supabase Dashboard -> SQL Editor after previous migrations.

-- ============================================================================
-- 1. Extend profiles for Passport
-- ============================================================================
alter table public.profiles
  add column if not exists home_region text,
  add column if not exists is_public boolean not null default true,
  add column if not exists selected_title text,
  add column if not exists role text not null default 'user';

-- ============================================================================
-- 2. Spirits / Products table
-- ============================================================================
create table if not exists public.spirits (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  distillery_slug text not null,
  category text not null,  -- Gin, Whisky, Rum, Vodka, Liqueur, Other
  subcategory text,         -- e.g. Single Malt, London Dry, Spiced Rum
  image_url text,
  abv numeric(5,2),
  region text,
  description text,
  release_status text not null default 'core_range',  -- core_range, seasonal, limited, discontinued, historic
  release_year integer,
  age_statement text,
  cask_info text,
  botanicals text[],
  awards text[],
  official_url text,
  review_slug text,         -- link to Distil-Nation review
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.spirits enable row level security;

create policy "Spirits are viewable by everyone"
  on public.spirits for select using (true);

create policy "Admins can insert spirits"
  on public.spirits for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update spirits"
  on public.spirits for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete spirits"
  on public.spirits for delete
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop trigger if exists set_spirits_updated_at on public.spirits;
create trigger set_spirits_updated_at
  before update on public.spirits
  for each row execute procedure public.set_updated_at();

create index if not exists spirits_distillery_slug_idx on public.spirits(distillery_slug);
create index if not exists spirits_category_idx on public.spirits(category);
create index if not exists spirits_region_idx on public.spirits(region);

-- ============================================================================
-- 3. Spirit Tastings (user <-> spirit)
-- ============================================================================
create table if not exists public.spirit_tastings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  spirit_id uuid not null references public.spirits(id) on delete cascade,
  status text not null default 'tried', -- tried, want_to_try, favourite
  rating smallint check (rating between 1 and 5),
  notes text,
  date_tried date,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, spirit_id)
);

alter table public.spirit_tastings enable row level security;

create policy "Users can view their own tastings"
  on public.spirit_tastings for select
  using (auth.uid() = user_id);

create policy "Public profiles show tastings"
  on public.spirit_tastings for select
  using (
    exists (select 1 from public.profiles where id = spirit_tastings.user_id and is_public = true)
  );

create policy "Users can insert their own tastings"
  on public.spirit_tastings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tastings"
  on public.spirit_tastings for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tastings"
  on public.spirit_tastings for delete
  using (auth.uid() = user_id);

drop trigger if exists set_spirit_tastings_updated_at on public.spirit_tastings;
create trigger set_spirit_tastings_updated_at
  before update on public.spirit_tastings
  for each row execute procedure public.set_updated_at();

create index if not exists spirit_tastings_user_id_idx on public.spirit_tastings(user_id);
create index if not exists spirit_tastings_spirit_id_idx on public.spirit_tastings(spirit_id);

-- ============================================================================
-- 4. Badges / Achievements
-- ============================================================================
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null,
  icon_url text,
  category text not null default 'general', -- general, regional, distillery, category, special
  criteria jsonb not null default '{}',
  -- criteria examples:
  -- {"type":"spirits_tried","count":1}
  -- {"type":"distilleries_visited","count":5}
  -- {"type":"region_visited","region":"Canterbury","count":5}
  -- {"type":"distillery_superfan","count":3}
  -- {"type":"categories_explored","categories":["Gin","Whisky","Rum","Vodka","Liqueur"]}
  -- {"type":"both_islands"}
  -- {"type":"manual"}
  grants_title boolean not null default false,
  title_text text,  -- the title string when grants_title is true
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.badges enable row level security;

create policy "Badges are viewable by everyone"
  on public.badges for select using (true);

create policy "Admins can manage badges"
  on public.badges for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop trigger if exists set_badges_updated_at on public.badges;
create trigger set_badges_updated_at
  before update on public.badges
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- 5. User Badges (earned badges)
-- ============================================================================
create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamptz not null default now(),
  unique (user_id, badge_id)
);

alter table public.user_badges enable row level security;

create policy "Users can view their own badges"
  on public.user_badges for select
  using (auth.uid() = user_id);

create policy "Public profiles show badges"
  on public.user_badges for select
  using (
    exists (select 1 from public.profiles where id = user_badges.user_id and is_public = true)
  );

create policy "System can insert user badges"
  on public.user_badges for insert
  with check (auth.uid() = user_id);

create index if not exists user_badges_user_id_idx on public.user_badges(user_id);

-- ============================================================================
-- 6. Quests
-- ============================================================================
create table if not exists public.quests (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null,
  icon_url text,
  quest_type text not null default 'evergreen', -- evergreen, regional, editorial, seasonal
  requirements jsonb not null default '[]',
  -- requirements examples:
  -- [{"type":"spirit_tried","count":1}]
  -- [{"type":"distillery_visited","count":3,"region":"Canterbury"}]
  -- [{"type":"category_tried","category":"Whisky","distillery_count":3}]
  reward_badge_id uuid references public.badges(id),
  start_date timestamptz,
  end_date timestamptz,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quests enable row level security;

create policy "Quests are viewable by everyone"
  on public.quests for select using (true);

create policy "Admins can manage quests"
  on public.quests for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop trigger if exists set_quests_updated_at on public.quests;
create trigger set_quests_updated_at
  before update on public.quests
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- 7. User Quest Progress
-- ============================================================================
create table if not exists public.user_quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quest_id uuid not null references public.quests(id) on delete cascade,
  progress jsonb not null default '{}',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, quest_id)
);

alter table public.user_quests enable row level security;

create policy "Users can view their own quest progress"
  on public.user_quests for select
  using (auth.uid() = user_id);

create policy "Users can manage their own quest progress"
  on public.user_quests for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own quest progress"
  on public.user_quests for update
  using (auth.uid() = user_id);

drop trigger if exists set_user_quests_updated_at on public.user_quests;
create trigger set_user_quests_updated_at
  before update on public.user_quests
  for each row execute procedure public.set_updated_at();

create index if not exists user_quests_user_id_idx on public.user_quests(user_id);

-- ============================================================================
-- 8. Seed initial badges
-- ============================================================================
insert into public.badges (slug, name, description, category, criteria, grants_title, title_text, sort_order) values
  ('first-pour', 'First Pour', 'Log your first NZ spirit.', 'general', '{"type":"spirits_tried","count":1}', false, null, 1),
  ('still-seeker', 'Still Seeker', 'Visit your first NZ distillery.', 'general', '{"type":"distilleries_visited","count":1}', true, 'Still Seeker', 2),
  ('on-the-road', 'On the Road', 'Visit 5 NZ distilleries.', 'general', '{"type":"distilleries_visited","count":5}', false, null, 3),
  ('spirit-explorer-10', 'Spirit Explorer', 'Discover 10 different NZ spirits.', 'general', '{"type":"spirits_tried","count":10}', false, null, 4),
  ('spirit-explorer-25', 'Spirit Connoisseur', 'Discover 25 different NZ spirits.', 'general', '{"type":"spirits_tried","count":25}', false, null, 5),
  ('spirit-explorer-50', 'Spirit Aficionado', 'Discover 50 different NZ spirits.', 'general', '{"type":"spirits_tried","count":50}', false, null, 6),
  ('north-and-south', 'North & South', 'Visit at least one distillery on both main islands.', 'general', '{"type":"both_islands"}', true, 'North & South', 7),
  ('category-explorer', 'Category Explorer', 'Try at least one NZ gin, whisky, rum, vodka and liqueur.', 'category', '{"type":"categories_explored","categories":["Gin","Whisky","Rum","Vodka","Liqueur"]}', true, 'Category Explorer', 8),
  ('whisky-wanderer', 'Whisky Wanderer', 'Discover whiskies from 3 different NZ distilleries.', 'category', '{"type":"category_from_distilleries","category":"Whisky","count":3}', true, 'Whisky Wanderer', 9),
  ('rum-runner', 'Rum Runner', 'Discover rum from 3 different NZ distilleries.', 'category', '{"type":"category_from_distilleries","category":"Rum","count":3}', true, 'Rum Runner', 10),
  ('gin-journeyman', 'Gin Journeyman', 'Discover gins from 3 different NZ distilleries.', 'category', '{"type":"category_from_distilleries","category":"Gin","count":3}', true, 'Gin Journeyman', 11),
  ('canterbury-explorer', 'Canterbury Explorer', 'Visit 5 Canterbury distilleries.', 'regional', '{"type":"region_visited","region":"Canterbury","count":5}', true, 'Canterbury Explorer', 20),
  ('auckland-explorer', 'Auckland Explorer', 'Visit 5 Auckland distilleries.', 'regional', '{"type":"region_visited","region":"Auckland","count":5}', true, 'Auckland Explorer', 21),
  ('otago-explorer', 'Otago Explorer', 'Visit 5 Otago distilleries.', 'regional', '{"type":"region_visited","region":"Central Otago","count":5}', true, 'Otago Explorer', 22),
  ('wellington-explorer', 'Wellington Explorer', 'Visit 3 Wellington distilleries.', 'regional', '{"type":"region_visited","region":"Wellington","count":3}', true, 'Wellington Explorer', 23),
  ('founding-explorer', 'Founding Explorer', 'One of the first Passport explorers.', 'special', '{"type":"manual"}', true, 'Founding Explorer', 100)
on conflict (slug) do nothing;

-- ============================================================================
-- 9. Seed initial quests
-- ============================================================================
insert into public.quests (slug, name, description, quest_type, requirements, sort_order) values
  ('start-your-passport', 'Start Your Passport', 'Log your first spirit to begin your NZ spirits journey.', 'evergreen',
   '[{"type":"spirit_tried","count":1}]', 1),
  ('meet-the-makers', 'Meet the Makers', 'Visit your first NZ distillery.', 'evergreen',
   '[{"type":"distillery_visited","count":1}]', 2),
  ('try-something-new', 'Try Something New', 'Discover a spirit category you haven''t logged before.', 'evergreen',
   '[{"type":"new_category"}]', 3),
  ('local-explorer', 'Local Explorer', 'Visit three distilleries in your home region.', 'evergreen',
   '[{"type":"home_region_visited","count":3}]', 4),
  ('the-canterbury-trail', 'The Canterbury Trail', 'Visit 5 Canterbury distilleries and try a spirit from each.', 'regional',
   '[{"type":"region_visited_and_tasted","region":"Canterbury","count":5}]', 10),
  ('southern-spirits', 'Southern Spirits', 'Explore distilleries in Otago and Southland.', 'regional',
   '[{"type":"multi_region_visited","regions":["Central Otago","Southland"],"count":3}]', 11)
on conflict (slug) do nothing;
