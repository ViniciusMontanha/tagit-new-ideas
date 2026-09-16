import * as brevo from "@getbrevo/brevo";
import { z } from "zod";
import { COMPANY, normalizeBrazilianPhone, isValidBrazilianPhone, escapeHtml } from "./contact-utils.js";
import { deliverContactEmails } from "./email-delivery.js";
import { randomUUID } from "node:crypto";

// Schema de validação
export const contactFormSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  email: z
    .string()
    .trim()
    .email("Email inválido").max(254)
    .min(1, "Email é obrigatório"),
  telefone: z
    .string()
    .transform(normalizeBrazilianPhone)
    .refine(isValidBrazilianPhone, "Telefone brasileiro inválido"),
  mensagem: z
    .string()
    .trim()
    .min(10, "Mensagem deve ter no mínimo 10 caracteres")
    .max(1000, "Mensagem não pode exceder 1000 caracteres"),
  requestId: z.string().uuid().optional(),
  website: z.string().max(0).optional(),
});

// Configurar Brevo - CORRETO PARA v3.0.0+
const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  console.warn(
    "⚠️ BREVO_API_KEY não configurada em variáveis de ambiente"
  );
}

const apiInstance = new brevo.TransactionalEmailsApi();

// Configurar a chave corretamente (NÃO passar || "")
if (apiKey) {
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
}

/**
 * Template de email para a empresa
 */
export function getAdminEmailTemplate(input) {
  const data = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, escapeHtml(value)]));
  const whatsappNumber = data.telefone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            color: #333;
            line-height: 1.6;
            background: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #00B4FF 0%, #7B3EFF 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 26px;
            font-weight: 700;
          }
          .header p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 20px;
          }
          .field {
            margin-bottom: 30px;
          }
          .label {
            font-weight: 600;
            color: #00B4FF;
            margin-bottom: 8px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
          }
          .value {
            color: #333;
            font-size: 15px;
            word-wrap: break-word;
          }
          .value a {
            color: #00B4FF;
            text-decoration: none;
            word-wrap: break-word;
            display: inline-block;
          }
          .value a:hover {
            text-decoration: underline;
          }
          .message-box {
            background: #f0f8ff;
            padding: 20px;
            border-left: 4px solid #00B4FF;
            border-radius: 4px;
            margin-top: 10px;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 14px;
            color: #333;
          }
          .action-box {
            background: #e8f4ff;
            padding: 25px 20px;
            border-radius: 6px;
            margin: 30px 0;
            text-align: center;
          }
          .action-box h3 {
            margin: 0 0 15px 0;
            font-size: 16px;
            color: #00B4FF;
          }
          .whatsapp-btn {
            display: inline-block;
            background: #25D366;
            color: white;
            padding: 14px 28px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 10px 5px;
            font-size: 15px;
            transition: background 0.3s;
          }
          .whatsapp-btn:hover {
            background: #20BA5A;
            text-decoration: none;
            color: white;
          }
          .email-btn {
            display: inline-block;
            background: #00B4FF;
            color: white;
            padding: 14px 28px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 10px 5px;
            font-size: 15px;
            transition: background 0.3s;
          }
          .email-btn:hover {
            background: #0099CC;
            text-decoration: none;
            color: white;
          }
          .footer {
            background: #f5f5f5;
            color: #666;
            font-size: 12px;
            text-align: center;
            padding: 25px 20px;
            border-top: 1px solid #e0e0e0;
          }
          .footer p {
            margin: 8px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📞 Nova Solicitação de Contato</h1>
            <p>Tag It - Sistema de Localização de Ativos</p>
          </div>

          <div class="content">
            <div class="field">
              <label class="label">👤 Nome do Cliente</label>
              <div class="value">${data.nome}</div>
            </div>

            <div class="field">
              <label class="label">📧 Email</label>
              <div class="value">
                <a href="mailto:${data.email}">${data.email}</a>
              </div>
            </div>

            <div class="field">
              <label class="label">📱 Telefone</label>
              <div class="value">
                <a href="tel:${whatsappNumber}">${data.telefone}</a>
              </div>
            </div>

            <div class="field">
              <label class="label">💬 Mensagem</label>
              <div class="message-box">${data.mensagem}</div>
            </div>

            <div class="action-box">
              <h3>⏰ Responda em até 24 horas</h3>
              <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">
                Clique nos botões abaixo para contatar o cliente:
              </p>
              <a href="${whatsappUrl}" class="whatsapp-btn" target="_blank">💬 Responder via WhatsApp</a>
              <a href="mailto:${data.email}" class="email-btn">📧 Responder via Email</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>Tag It - Localização Inteligente de Ativos</strong></p>
            <p>©️ 2026 Tag It. Todos os direitos reservados.</p>
            <p>Este email foi gerado automaticamente pelo formulário de contato.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Template de email para o cliente (confirmação)
 */
export function getClientEmailTemplate(input) {
  const data = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, escapeHtml(value)]));
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header {
            background: linear-gradient(135deg, #00B4FF 0%, #7B3EFF 100%);
            color: white;
            padding: 30px 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .header h1 { margin: 0; font-size: 24px; }
          .content {
            background: #f9f9f9;
            padding: 30px 20px;
            border: 1px solid #e0e0e0;
            border-top: none;
          }
          .footer {
            background: #f0f0f0;
            color: #666;
            font-size: 12px;
            text-align: center;
            padding: 20px;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e0e0e0;
            border-top: none;
          }
          .highlight { color: #00B4FF; font-weight: bold; }
          .button {
            display: inline-block;
            background: #00B4FF;
            color: white;
            padding: 12px 30px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 20px;
            font-weight: bold;
          }
          .button:hover { background: #0099CC; }
          .info-box {
            background: white;
            border-left: 4px solid #00B4FF;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Recebemos sua Mensagem!</h1>
          </div>

          <div class="content">
            <p>Olá <span class="highlight">${data.nome}</span>,</p>

            <p>Agradecemos muito pelo seu interesse na <span class="highlight">Tag It</span>! 🎉</p>

            <p>Sua solicitação foi recebida com sucesso e nossa equipe de especialistas já foi notificada sobre seu interesse.</p>

            <div class="info-box">
              <p style="margin: 0 0 10px 0;"><strong>📋 Informações da sua solicitação:</strong></p>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                <li>Data: ${new Date().toLocaleDateString("pt-BR")}</li>
                <li>Telefone: ${data.telefone}</li>
                <li>Email: ${data.email}</li>
              </ul>
            </div>

            <p><strong>⏳ Próximos Passos:</strong></p>
            <p>Nossa equipe entrará em contato com você em <strong>poucos minutos</strong> através:</p>
            <ul style="margin: 10px 0;">
              <li>☎️ WhatsApp: <a href="https://wa.me/${data.telefone.replace(/\D/g, "")}" style="color: #00B4FF; text-decoration: none;">${data.telefone}</a></li>
              <li>📧 Email: ${data.email}</li>
            </ul>

            <p><strong>💡 Dúvidas Urgentes?</strong></p>
            <p>Entre em contato conosco diretamente:</p>
            <ul style="margin: 10px 0;">
              <li>🌐 Website: <a href="https://tagit.com.br" style="color: #00B4FF; text-decoration: none;">tagit.com.br</a></li>
              <li>📞 WhatsApp: <a href="https://wa.me/${COMPANY.phone.slice(1)}" style="color: #00B4FF; text-decoration: none;">${COMPANY.phoneDisplay}</a></li>
              <li>⏰ Horário: Segunda a Sexta, 9h-18h (Brasília)</li>
            </ul>

            <center>
              <a href="https://wa.me/${COMPANY.phone.slice(1)}" class="button">Fale Conosco via WhatsApp</a>
            </center>
          </div>

          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              <strong>Tag It - Localização Inteligente de Ativos</strong>
            </p>
            <p style="margin: 0; color: #999;">
              © 2026 Tag It. Todos os direitos reservados.
            </p>
            <p style="margin: 10px 0 0 0; color: #999; font-size: 11px;">
              Este email foi enviado por nosso sistema automático. Não é necessário responder.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Enviar email de contato usando Brevo
 */
export async function sendContactEmailBrevo(data) {
  try {
    if (!apiKey) {
      throw new Error("BREVO_API_KEY não configurada");
    }

    console.log("📧 Iniciando envio de email via Brevo...");

    console.log(`   Destinatário Admin: contato@tagit.com.br`);


    // Email para a empresa
    const adminEmailData = new brevo.SendSmtpEmail();
    adminEmailData.subject = `[NOVO CONTATO] ${data.nome} - Solicitação de Demo`;
    adminEmailData.htmlContent = getAdminEmailTemplate(data);
    adminEmailData.sender = {
      name: "Tag It - Contato",
      email: process.env.BREVO_FROM_EMAIL || "contato@tagit.com.br",
    };
    adminEmailData.to = [
      {
        email: "contato@tagit.com.br",
        name: "Tag It Contato",
      },
    ];
    adminEmailData.replyTo = {
      email: data.email,
      name: data.nome,
    };
    adminEmailData.headers = {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
    };

    // Email de confirmação para o cliente
    const clientEmailData = new brevo.SendSmtpEmail();
    clientEmailData.subject = "✅ Confirmação de Recebimento - Tag It";
    clientEmailData.htmlContent = getClientEmailTemplate(data);
    clientEmailData.sender = {
      name: "Tag It",
      email: process.env.BREVO_FROM_EMAIL || "contato@tagit.com.br",
    };
    clientEmailData.to = [
      {
        email: data.email,
        name: data.nome,
      },
    ];

    const requestId = data.requestId || randomUUID();
    const { nome, email, telefone, mensagem } = data;
    const result = await deliverContactEmails({
      send: (message) => apiInstance.sendTransacEmail(message),
      admin: adminEmailData,
      client: clientEmailData,
      requestId,
      data: { nome, email, telefone, mensagem },
    });
    console.info(JSON.stringify({ event: "contact_delivery", requestId, ...result }));
    return { ...result, requestId };
  } catch {
    console.error("Falha ao preparar o envio de contato");
    return { success: false, adminAccepted: false, confirmationSent: false };
  }
}
