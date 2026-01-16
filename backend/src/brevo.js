import * as brevo from "@getbrevo/brevo";
import { z } from "zod";

// Schema de validação
export const contactFormSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  email: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  telefone: z
    .string()
    .regex(/^\+?55?\d{10,11}$/, "Telefone inválido")
    .min(1, "Telefone é obrigatório"),
  mensagem: z
    .string()
    .min(10, "Mensagem deve ter no mínimo 10 caracteres")
    .max(1000, "Mensagem não pode exceder 1000 caracteres"),
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
function getAdminEmailTemplate(data) {
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
            margin-bottom: 0;
            text-align: center;
          }
          .header h1 { margin: 0; font-size: 24px; }
          .content { 
            background: #f9f9f9; 
            padding: 30px 20px;
            border: 1px solid #e0e0e0;
            border-top: none;
          }
          .field { 
            margin-bottom: 20px; 
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
          .field:last-child { border-bottom: none; }
          .label { 
            font-weight: bold; 
            color: #00B4FF; 
            margin-bottom: 8px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value { 
            color: #333;
            font-size: 14px;
            word-break: break-word;
          }
          .message-box {
            background: white;
            padding: 15px;
            border-left: 4px solid #00B4FF;
            border-radius: 4px;
            margin-top: 5px;
            white-space: pre-wrap;
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
          .link { color: #00B4FF; text-decoration: none; }
          .link:hover { text-decoration: underline; }
          .action-box {
            background: #e8f4ff;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📞 Nova Solicitação de Demo</h1>
            <p style="margin: 10px 0 0 0;">Tag It - Sistema de Rastreamento de Ativos</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 Nome do Cliente</div>
              <div class="value">${data.nome}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email</div>
              <div class="value">
                <a href="mailto:${data.email}" class="link">${data.email}</a>
              </div>
            </div>
            
            <div class="field">
              <div class="label">📱 Telefone</div>
              <div class="value">
                <a href="tel:${data.telefone}" class="link">${data.telefone}</a>
              </div>
            </div>
            
            <div class="field">
              <div class="label">💬 Mensagem</div>
              <div class="message-box">${data.mensagem.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>

            <div class="action-box">
              <p style="margin: 0; font-size: 13px; color: #0066cc;">
                <strong>⏰ Próximo Passo:</strong> 
                Entre em contato com este cliente em até 24 horas via:
              </p>
              <ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 13px;">
                <li>WhatsApp: <a href="https://wa.me/${data.telefone.replace(/\D/g, "")}" class="link" target="_blank">${data.telefone}</a></li>
                <li>Email: <a href="mailto:${data.email}" class="link">${data.email}</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              <strong>Tag It - Rastreamento Inteligente de Ativos</strong>
            </p>
            <p style="margin: 0;">
              📞 +55 16 99753-4316 | 🌐 https://tagit.com.br
            </p>
            <p style="margin: 10px 0 0 0; color: #999;">
              Este email foi gerado automaticamente pelo formulário de contato do site.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Template de email para o cliente (confirmação)
 */
function getClientEmailTemplate(data) {
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
            <p>Nossa equipe entrará em contato com você em até <strong>24 horas úteis</strong> através de:</p>
            <ul style="margin: 10px 0;">
              <li>☎️ WhatsApp: <a href="https://wa.me/${data.telefone.replace(/\D/g, "")}" style="color: #00B4FF; text-decoration: none;">${data.telefone}</a></li>
              <li>📧 Email: ${data.email}</li>
            </ul>
            
            <p><strong>💡 Dúvidas Urgentes?</strong></p>
            <p>Entre em contato conosco diretamente:</p>
            <ul style="margin: 10px 0;">
              <li>🌐 Website: <a href="https://tagit.com.br" style="color: #00B4FF; text-decoration: none;">tagit.com.br</a></li>
              <li>📞 WhatsApp: <a href="https://wa.me/5516996403745" style="color: #00B4FF; text-decoration: none;">+55 16 99640-3745</a></li>
              <li>⏰ Horário: Segunda a Sexta, 9h-18h (Brasília)</li>
            </ul>
            
            <center>
              <a href="https://wa.me/5516996403745" class="button">Fale Conosco via WhatsApp</a>
            </center>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              <strong>Tag It - Rastreamento Inteligente de Ativos</strong>
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
    console.log(`   API Key: ${apiKey.substring(0, 10)}...`);
    console.log(`   Destinatário Admin: contato@tagit.com.br`);
    console.log(`   Destinatário Cliente: ${data.email}`);

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

    // Enviar ambos os emails
    console.log("🔄 Enviando email para administrador...");
    const adminResponse = await apiInstance.sendTransacEmail(adminEmailData);
    console.log("✅ Email para administrador enviado!");
    console.log(`   Message ID: ${adminResponse.body?.messageId || "N/A"}`);

    console.log("🔄 Enviando email de confirmação para cliente...");
    const clientResponse = await apiInstance.sendTransacEmail(clientEmailData);
    console.log("✅ Email de confirmação enviado!");
    console.log(`   Message ID: ${clientResponse.body?.messageId || "N/A"}`);

    console.log(`✅ Email enviado com sucesso para ${data.email}`);
    console.log(`👤 Cliente: ${data.nome} | 📱 Telefone: ${data.telefone}`);

    return {
      success: true,
      adminMessageId: adminResponse.body?.messageId,
      clientMessageId: clientResponse.body?.messageId,
    };
  } catch (error) {
    console.error(`❌ Erro bruto:`, error);
    
    let errorMessage = "Erro desconhecido";
    
    if (error.response && error.response.body) {
      console.error(`❌ Resposta da Brevo:`, error.response.body);
      errorMessage = error.response.body.message || error.response.body.error || JSON.stringify(error.response.body);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    console.error(`❌ Erro ao enviar email via Brevo: ${errorMessage}`);

    return {
      success: false,
      error: errorMessage,
    };
  }
}
