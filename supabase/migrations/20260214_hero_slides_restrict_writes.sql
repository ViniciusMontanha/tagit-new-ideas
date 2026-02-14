-- Endurecimento de segurança: bloquear escrita pública em hero_slides
-- Leitura pública continua permitida para renderização da home.

alter table public.hero_slides enable row level security;

drop policy if exists "hero_slides_write_public" on public.hero_slides;
drop policy if exists "hero_slides_write_authenticated" on public.hero_slides;

create policy "hero_slides_write_authenticated"
  on public.hero_slides
  for all
  to authenticated
  using (true)
  with check (true);
