-- Phase 1: Auth foundation
-- Run this in the Supabase Dashboard -> SQL Editor for project gtbquxujelebcqviilln.

-- 1. Profiles table (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Shared trigger to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- Auto-create a profile row whenever a new auth user is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Distillery Passport foundation (Priority 2 — schema now, UI later)
do $$ begin
  create type public.passport_status as enum (
    'want_to_visit',
    'visited',
    'tour_completed',
    'tasting_completed',
    'podcast_listened',
    'video_watched',
    'favorite'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.passport_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  distillery_slug text not null,
  status public.passport_status not null,
  visited_date date,
  rating smallint check (rating between 1 and 5),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, distillery_slug, status)
);

alter table public.passport_entries enable row level security;

drop policy if exists "Users can view their own passport entries" on public.passport_entries;
create policy "Users can view their own passport entries"
  on public.passport_entries for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own passport entries" on public.passport_entries;
create policy "Users can insert their own passport entries"
  on public.passport_entries for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own passport entries" on public.passport_entries;
create policy "Users can update their own passport entries"
  on public.passport_entries for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own passport entries" on public.passport_entries;
create policy "Users can delete their own passport entries"
  on public.passport_entries for delete
  using (auth.uid() = user_id);

drop trigger if exists set_passport_entries_updated_at on public.passport_entries;
create trigger set_passport_entries_updated_at
  before update on public.passport_entries
  for each row execute procedure public.set_updated_at();

create index if not exists passport_entries_user_id_idx on public.passport_entries(user_id);
create index if not exists passport_entries_distillery_slug_idx on public.passport_entries(distillery_slug);
