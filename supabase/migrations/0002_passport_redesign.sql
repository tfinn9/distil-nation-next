-- Phase 2: Redesign passport_entries as one row per (user, distillery)
-- with an array of statuses, plus a single shared rating/notes/visited_date.
-- Run this in the Supabase Dashboard -> SQL Editor after 0001_init.sql.

drop table if exists public.passport_entries;

create table public.passport_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  distillery_slug text not null,
  statuses public.passport_status[] not null default '{}',
  visited_date date,
  rating smallint check (rating between 1 and 5),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, distillery_slug)
);

alter table public.passport_entries enable row level security;

create policy "Users can view their own passport entries"
  on public.passport_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert their own passport entries"
  on public.passport_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own passport entries"
  on public.passport_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete their own passport entries"
  on public.passport_entries for delete
  using (auth.uid() = user_id);

create trigger set_passport_entries_updated_at
  before update on public.passport_entries
  for each row execute procedure public.set_updated_at();

create index passport_entries_user_id_idx on public.passport_entries(user_id);
create index passport_entries_distillery_slug_idx on public.passport_entries(distillery_slug);
