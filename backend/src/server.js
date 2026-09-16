import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(directory, "../.env") });
const app = express();
app.use(cors({ origin: ["http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:8081", "https://tagit.com.br", "https://www.tagit.com.br", process.env.FRONTEND_URL].filter(Boolean) }));
// Imports explícitos permitem que a hospedagem inclua todos os handlers no pacote.
const handlers = {
  "send-contact": (await import("../api/send-contact.js")).default,
  "admin-session": (await import("../api/admin-session.js")).default,
  "hero-slides": (await import("../api/hero-slides.js")).default,
  "upload-carousel-image": (await import("../api/upload-carousel-image.js")).default,
  "github-image": (await import("../api/github-image.js")).default,
  health: (await import("../api/health.js")).default,
};
// Reutiliza os mesmos handlers em produção e desenvolvimento, incluindo autenticação.
for (const [name, handler] of Object.entries(handlers)) {
  app.all(`/api/${name}`, express.json({ limit: name === "upload-carousel-image" ? "15mb" : "32kb" }), handler);
}
app.use((_req, res) => res.status(404).json({ error: "Rota não encontrada" }));
app.use((error, _req, res, _next) => res.status(error.status === 413 ? 413 : 400).json({ error: "Requisição inválida" }));
app.listen(process.env.PORT || 3001, () => console.info("Backend Tag It iniciado"));
