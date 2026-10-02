-- Spirit submissions: users can suggest new spirits for admin review
-- Run in Supabase Dashboard -> SQL Editor

create table if not exists public.spirit_submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid references auth.users(id) on delete set null,
  submitted_email text,
  spirit_name text not null,
  distillery_name text,
  category text,
  subcategory text,
  abv numeric(5,2),
  region text,
  description text,
  official_url text,
  notes text,
  status text not null default 'pending',  -- pending, approved, rejected
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.spirit_submissions enable row level security;

-- Anyone can insert (even anon for guest submissions)
create policy "Anyone can submit spirits"
  on public.spirit_submissions for insert
  with check (true);

-- Users can view their own submissions
create policy "Users can view own submissions"
  on public.spirit_submissions for select
  using (auth.uid() = submitted_by);

-- Admins can view and manage all submissions
create policy "Admins can manage submissions"
  on public.spirit_submissions for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop trigger if exists set_spirit_submissions_updated_at on public.spirit_submissions;
create trigger set_spirit_submissions_updated_at
  before update on public.spirit_submissions
  for each row execute procedure public.set_updated_at();

create index if not exists spirit_submissions_status_idx on public.spirit_submissions(status);
