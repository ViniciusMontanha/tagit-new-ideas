create table if not exists public.hero_slides (
  id text primary key,
  position integer not null default 0,
  title text not null,
  description text not null,
  image text not null,
  image_alt text not null,
  primary_cta_label text not null,
  primary_cta_href text not null,
  secondary_cta_label text not null,
  secondary_cta_href text not null,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.hero_slides enable row level security;

-- Leitura pública para renderização do site
drop policy if exists "hero_slides_select_public" on public.hero_slides;
create policy "hero_slides_select_public"
  on public.hero_slides
  for select
  to anon, authenticated
  using (true);

-- Escrita apenas para usuários autenticados (admin logado via Supabase Auth)
drop policy if exists "hero_slides_write_authenticated" on public.hero_slides;
drop policy if exists "hero_slides_write_public" on public.hero_slides;
create policy "hero_slides_write_authenticated"
  on public.hero_slides
  for all
  to authenticated
  using (true)
  with check (true);
