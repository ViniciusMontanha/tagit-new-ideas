import { z } from "zod";
import { uploadCarouselImageToGitHub } from "../src/github-upload.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tagit.com.br",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const payloadSchema = z.object({
  fileName: z.string().min(1),
  fileBase64: z.string().min(1),
  slideId: z.string().min(1),
});

export default async function handler(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const payload = payloadSchema.parse(req.body || {});
    const upload = await uploadCarouselImageToGitHub(payload);
    const protocol = String(req.headers["x-forwarded-proto"] || "https");
    const host = String(req.headers.host || "");
    const imageProxyUrl = `${protocol}://${host}/api/github-image?path=${encodeURIComponent(upload.filePath)}`;

    return res.status(200).json({
      success: true,
      imageUrl: imageProxyUrl,
      rawImageUrl: upload.imageUrl,
      filePath: upload.filePath,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: error.errors.map((item) => ({
          field: item.path.join("."),
          message: item.message,
        })),
      });
    }

    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return res.status(500).json({
      error: "Falha ao enviar imagem para o GitHub",
      message,
    });
  }
}
