-- Enable RLS
alter table if exists public.profiles enable row level security;
alter table if exists public.favorites enable row level security;
alter table if exists public.proofs enable row level security;

-- Profiles: VIP Flag
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_vip boolean not null default false,
  created_at timestamptz not null default now()
);

-- Favorites: store challenge text snapshot (simple)
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id text not null,
  text text not null,
  created_at timestamptz not null default now(),
  unique (user_id, challenge_id)
);

-- Proof uploads: path in storage
create table if not exists public.proofs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

-- RLS Policies
create policy "profiles: users can read own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles: users can upsert own"
on public.profiles for insert
with check (auth.uid() = id);

create policy "profiles: users can update own"
on public.profiles for update
using (auth.uid() = id);

create policy "favorites: users can CRUD own"
on public.favorites for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "proofs: users can CRUD own"
on public.proofs for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
