-- Migração segura da tabela de slides do Hero
-- Objetivo: manter dados existentes e alinhar esquema com o frontend atual.

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

-- Compatibilidade com esquemas antigos
alter table public.hero_slides
  add column if not exists position integer,
  add column if not exists title text,
  add column if not exists description text,
  add column if not exists image text,
  add column if not exists image_alt text,
  add column if not exists primary_cta_label text,
  add column if not exists primary_cta_href text,
  add column if not exists secondary_cta_label text,
  add column if not exists secondary_cta_href text,
  add column if not exists updated_at timestamptz default timezone('utc'::text, now());

-- Se existir coluna legada sort_order, aproveita o valor para position
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'hero_slides'
      and column_name = 'sort_order'
  ) then
    execute 'update public.hero_slides set position = coalesce(position, sort_order) where position is null';
  end if;
end $$;

-- Fallback para position em linhas antigas
update public.hero_slides
set position = 0
where position is null;

-- Garantir defaults e constraints essenciais
alter table public.hero_slides
  alter column position set default 0,
  alter column updated_at set default timezone('utc'::text, now());

-- Só aplica NOT NULL após normalização
alter table public.hero_slides
  alter column position set not null;

-- Opcional: remover coluna legada se ainda existir
alter table public.hero_slides
  drop column if exists sort_order;

-- Índice para ordenação do carrossel
create index if not exists idx_hero_slides_position on public.hero_slides (position);

-- Trigger para updated_at automático
create or replace function public.set_hero_slides_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists trg_set_hero_slides_updated_at on public.hero_slides;
create trigger trg_set_hero_slides_updated_at
before update on public.hero_slides
for each row
execute function public.set_hero_slides_updated_at();

-- Segurança (RLS)
alter table public.hero_slides enable row level security;

drop policy if exists "hero_slides_select_public" on public.hero_slides;
create policy "hero_slides_select_public"
  on public.hero_slides
  for select
  to anon, authenticated
  using (true);

drop policy if exists "hero_slides_write_authenticated" on public.hero_slides;
create policy "hero_slides_write_authenticated"
  on public.hero_slides
  for all
  to authenticated
  using (true)
  with check (true);
