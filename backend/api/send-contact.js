import { z } from "zod";
import { guardRequest } from "../src/request-guard.js";
import { contactFormSchema, sendContactEmailBrevo } from "../src/brevo.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tagit.com.br",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function handler(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  if (!guardRequest(req, res, { scope: "contact", limit: 5 })) return;
  if (JSON.stringify(req.body || {}).length > 8000) return res.status(413).json({ error: "Mensagem muito grande" });

  try {
    const validatedData = contactFormSchema.parse(req.body || {});
    const result = await sendContactEmailBrevo(validatedData);

    if (!result.success) {
      return res.status(500).json({
        error: "Erro ao enviar email",
        message: "Não foi possível confirmar o envio. Tente novamente ou entre em contato pelo WhatsApp.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Solicitação recebida pela equipe!",
      confirmationSent: result.confirmationSent,
      requestId: result.requestId,
      timestamp: new Date().toISOString(),
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

    return res.status(500).json({
      error: "Erro ao enviar email",
      message: "Não foi possível confirmar o envio.",
    });
  }
}
