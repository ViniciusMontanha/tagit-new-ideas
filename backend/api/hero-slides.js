import { z } from "zod";
import { extractBearerToken, verifyAdminToken } from "../src/admin-auth.js";

const SUPABASE_TABLE = "hero_slides";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tagit.com.br",
  "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const slideSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  imageAlt: z.string(),
  primaryCtaLabel: z.string(),
  primaryCtaHref: z.string(),
  secondaryCtaLabel: z.string(),
  secondaryCtaHref: z.string(),
});

const payloadSchema = z.object({
  slides: z.array(slideSchema).min(1),
});

const getSupabaseConfig = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY não configuradas");
  }

  return { supabaseUrl: supabaseUrl.replace(/\/$/, ""), serviceRoleKey };
};

const supabaseHeaders = (serviceRoleKey) => ({
  "Content-Type": "application/json",
  apikey: serviceRoleKey,
  Authorization: `Bearer ${serviceRoleKey}`,
});

const mapSlideToRow = (slide, position) => ({
  id: slide.id,
  position,
  title: slide.title,
  description: slide.description,
  image: slide.image,
  image_alt: slide.imageAlt,
  primary_cta_label: slide.primaryCtaLabel,
  primary_cta_href: slide.primaryCtaHref,
  secondary_cta_label: slide.secondaryCtaLabel,
  secondary_cta_href: slide.secondaryCtaHref,
});

export default async function handler(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const { supabaseUrl, serviceRoleKey } = getSupabaseConfig();

    if (req.method === "GET") {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/${SUPABASE_TABLE}?select=id,position,title,description,image,image_alt,primary_cta_label,primary_cta_href,secondary_cta_label,secondary_cta_href&order=position.asc`,
        {
          headers: supabaseHeaders(serviceRoleKey),
        },
      );

      if (!response.ok) {
        return res.status(500).json({ error: "Falha ao carregar slides" });
      }

      const data = await response.json();
      res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60, stale-while-revalidate=120");


      return res.status(200).json({ success: true, slides: data });
    }

    if (req.method !== "PUT") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const token = extractBearerToken(req.headers.authorization);
    const authorized = verifyAdminToken(token);

    if (!authorized) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    const payload = payloadSchema.parse(req.body || {});
    const rows = payload.slides.map((slide, index) => mapSlideToRow(slide, index));

    const upsertResponse = await fetch(`${supabaseUrl}/rest/v1/${SUPABASE_TABLE}?on_conflict=id`, {
      method: "POST",
      headers: {
        ...supabaseHeaders(serviceRoleKey),
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(rows),
    });

    if (!upsertResponse.ok) {
      return res.status(500).json({ error: "Falha ao salvar slides" });
    }

    const existingResponse = await fetch(`${supabaseUrl}/rest/v1/${SUPABASE_TABLE}?select=id`, {
      headers: supabaseHeaders(serviceRoleKey),
    });

    if (!existingResponse.ok) {
      return res.status(500).json({ error: "Falha ao reconciliar slides" });
    }

    const existingRows = await existingResponse.json();
    const incomingIds = new Set(rows.map((row) => row.id));
    const idsToDelete = existingRows.map((row) => row.id).filter((id) => !incomingIds.has(id));

    if (idsToDelete.length > 0) {
      for (const id of idsToDelete) {
        const deleteResponse = await fetch(`${supabaseUrl}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(id)}`, {
          method: "DELETE",
          headers: supabaseHeaders(serviceRoleKey),
        });

        if (!deleteResponse.ok) {
          return res.status(500).json({ error: "Falha ao remover slides antigos" });
        }
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    return res.status(500).json({ error: "Falha na API de slides" });
  }
}
