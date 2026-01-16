import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Configurar paths para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ CARREGAR VARIÁVEIS DE AMBIENTE PRIMEIRO
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Importar Zod de forma estática (não depende de env vars)
import { z } from "zod";

// Criar app e variáveis de forma síncrona
const app = express();
const PORT = process.env.PORT || 3001;

// Importar brevo de forma dinâmica DEPOIS das env vars carregarem
let contactFormSchema;
let sendContactEmailBrevo;

// Função para inicializar o brevo
async function initBrevo() {
  const brevoModule = await import("./brevo.js");
  contactFormSchema = brevoModule.contactFormSchema;
  sendContactEmailBrevo = brevoModule.sendContactEmailBrevo;
}

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite dev
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:8081",
      "http://127.0.0.1:8081", // Frontend em dev
      "https://tagit.com.br", // Produção (domínio principal)
      "https://tagit-new-ideas.vercel.app", // Vercel deployment
      process.env.FRONTEND_URL || "",
    ].filter(Boolean),
    credentials: true,
  })
);

// Função para configurar rotas (chamada após inicializar Brevo)
function setupRoutes() {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      brevoConfigured: !!process.env.BREVO_API_KEY,
    });
  });

  // Rota de envio de email
  app.post("/api/send-contact", async (req, res) => {
    try {
      // Validar dados com Zod
      const validatedData = contactFormSchema.parse(req.body);

      // Enviar email via Brevo
      const result = await sendContactEmailBrevo(validatedData);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: "Email enviado com sucesso!",
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(500).json({
          error: "Erro ao enviar email",
          details: result.error,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("❌ Erro na API de contato:", errorMessage);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }

      if (error instanceof Error) {
        return res.status(500).json({
          error: "Erro ao enviar email",
          message: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro desconhecido ao enviar email",
      });
    }
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: "Rota não encontrada",
      path: req.path,
      method: req.method,
    });
  });
}

// Iniciar servidor
(async () => {
  await initBrevo();
  setupRoutes();  // Configurar rotas DEPOIS de inicializar Brevo
  
  app.listen(PORT, () => {
    console.log(`\n🚀 Backend Tag It rodando em http://localhost:${PORT}`);
    console.log(`📧 API de contato: http://localhost:${PORT}/api/send-contact`);
    console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
    console.log(`\n🔑 Brevo API Key: ${process.env.BREVO_API_KEY ? "✓ Configurada" : "❌ Não configurada"}\n`);
  });
})();

// Tratamento de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Promise rejeitada não tratada:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Exceção não capturada:", error);
  process.exit(1);
});
