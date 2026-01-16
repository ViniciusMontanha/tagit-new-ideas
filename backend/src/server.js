import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { contactFormSchema, sendContactEmailBrevo } from "./brevo.js";
import { z } from "zod";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite dev
      "http://localhost:3000",
      "http://localhost:8080",
      "https://tagit.com.br",
      process.env.FRONTEND_URL || "",
    ].filter(Boolean),
    credentials: true,
  })
);

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
    // Validar método
    if (req.method !== "POST" && req.method !== "get") {
      // Express já valida por padrão
    }

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
    console.error("❌ Erro na API de contato:", error);

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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Backend Tag It rodando em http://localhost:${PORT}`);
  console.log(`📧 API de contato: http://localhost:${PORT}/api/send-contact`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`\n🔑 Brevo API Key: ${process.env.BREVO_API_KEY ? "✓ Configurada" : "❌ Não configurada"}\n`);
});

// Tratamento de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Promise rejeitada não tratada:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Exceção não capturada:", error);
  process.exit(1);
});
