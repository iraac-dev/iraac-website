-- Staff profiles for admin dashboard access control
-- Links a Supabase Auth user to their staff role and permissions

create type staff_role as enum (
  'viewer', 'analyst', 'report_author', 'approver',
  'communications_operator', 'admin'
);

create table public.staff_profiles (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null unique references auth.users(id) on delete cascade,
  email           text not null,
  display_name    text not null default '',
  role            staff_role not null default 'viewer',
  is_active       boolean not null default true,
  invited_at      timestamptz not null default now(),
  accepted_at     timestamptz,
  disabled_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Enable RLS
alter table public.staff_profiles enable row level security;

-- Indexes
create index idx_staff_profiles_user on public.staff_profiles (user_id);
create index idx_staff_profiles_active on public.staff_profiles (is_active) where is_active = true;

-- RLS policies
-- Staff: can read own profile
create policy "Staff can read own profile"
  on public.staff_profiles for select
  to authenticated
  using (user_id = auth.uid());

-- Staff with admin role: can read all profiles
create policy "Admins can read all profiles"
  on public.staff_profiles for select
  to authenticated
  using (exists (
    select 1 from public.staff_profiles
    where user_id = auth.uid() and is_active = true and role = 'admin'
  ));

-- Admin: can insert profiles
create policy "Admins can create staff profiles"
  on public.staff_profiles for insert
  to authenticated
  with check (exists (
    select 1 from public.staff_profiles
    where user_id = auth.uid() and is_active = true and role = 'admin'
  ));

-- Admin: can update profiles
create policy "Admins can update staff profiles"
  on public.staff_profiles for update
  to authenticated
  using (exists (
    select 1 from public.staff_profiles
    where user_id = auth.uid() and is_active = true and role = 'admin'
  ));

-- Auto-update updated_at
create trigger trg_staff_profiles_updated_at
  before update on public.staff_profiles
  for each row execute function public.update_updated_at();