import { createHash } from "node:crypto";

// Limite por instância. Complementar com limite distribuído no firewall da hospedagem.
const attempts = new Map();
export function consumeRateLimit(key, limit, windowMs, now = Date.now()) {
  for (const [id, value] of attempts) if (value.resetAt <= now) attempts.delete(id);
  let entry = attempts.get(key);
  if (!entry) {
    if (attempts.size >= 10000) return { allowed: false, retryAfter: 60 };
    entry = { count: 0, resetAt: now + windowMs };
    attempts.set(key, entry);
  }
  entry.count += 1;
  return { allowed: entry.count <= limit, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
}

export function guardRequest(req, res, { scope, limit = 5, windowMs = 600000 } = {}) {
  const allowedOrigins = ["https://tagit.com.br", "https://www.tagit.com.br", process.env.FRONTEND_URL].filter(Boolean);
  if (process.env.NODE_ENV !== "production") allowedOrigins.push("http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:8081");
  const origin = req.headers?.origin;
  if (origin && !allowedOrigins.includes(origin)) {
    res.status(403).json({ error: "Origem não permitida" });
    return false;
  }
  const address = String(req.headers?.["x-vercel-forwarded-for"] || req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  const key = createHash("sha256").update(`${scope}:${address}`).digest("hex");
  const result = consumeRateLimit(key, limit, windowMs);
  if (!result.allowed) {
    res.setHeader("Retry-After", String(result.retryAfter));
    res.status(429).json({ error: "Muitas tentativas. Aguarde alguns minutos." });
    return false;
  }
  return true;
}
