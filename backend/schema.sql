create table if not exists public.wedding_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 1 and 100),
  message text not null check (char_length(btrim(message)) between 1 and 3000),
  created_at timestamptz not null default now()
);

alter table public.wedding_messages enable row level security;

grant usage on schema public to service_role;
grant insert on public.wedding_messages to service_role;
