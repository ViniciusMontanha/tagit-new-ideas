-- Evita múltiplas linhas para o mesmo slide ao salvar novamente
-- Estratégia:
-- 1) Normaliza IDs vazios
-- 2) Remove duplicados por id (mantendo o mais recente)
-- 3) Garante PK em id para upsert funcionar sempre como update

-- Normalizar IDs ausentes/vazios (fallback determinístico por posição)
update public.hero_slides
set id = concat('slide-', position)
where id is null or btrim(id) = '';

-- Se ainda houver colisão no fallback, adiciona sufixo incremental
with numbered as (
  select
    ctid,
    id,
    row_number() over (partition by id order by position asc, updated_at desc nulls last, ctid desc) as rn
  from public.hero_slides
)
update public.hero_slides h
set id = concat(n.id, '-', n.rn)
from numbered n
where h.ctid = n.ctid
  and n.rn > 1;

-- Remove duplicados por id (mantém o registro mais recente)
with ranked as (
  select
    ctid,
    id,
    row_number() over (partition by id order by updated_at desc nulls last, position asc, ctid desc) as rn
  from public.hero_slides
)
delete from public.hero_slides h
using ranked r
where h.ctid = r.ctid
  and r.rn > 1;

-- Garante chave primária em id (necessária para upsert por id)
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.hero_slides'::regclass
      and contype = 'p'
  ) then
    alter table public.hero_slides
      add constraint hero_slides_pkey primary key (id);
  end if;
end $$;
