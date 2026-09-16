import { z } from "zod";
import { guardRequest } from "../src/request-guard.js";
import { createAdminToken, verifyAdminPassword } from "../src/admin-auth.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tagit.com.br",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const payloadSchema = z.object({
  password: z.string().min(1).max(256),
});

export default async function handler(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  if (!guardRequest(req, res, { scope: "admin-login", limit: 5, windowMs: 900000 })) return;

  try {
    const payload = payloadSchema.parse(req.body || {});
    const validPassword = verifyAdminPassword(payload.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = createAdminToken();
    return res.status(200).json({ success: true, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    return res.status(500).json({ error: "Falha ao criar sessão admin" });
  }
}
