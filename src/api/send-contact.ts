/**
 * API Route para enviar emails de contato
 * Endpoint: POST /api/send-contact
 * 
 * Este arquivo deve ser movido para um servidor backend real (Node.js, Next.js, etc)
 * Por enquanto, demonstra a estrutura esperada.
 */

export async function sendContactEmail(data: {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}) {
  try {
    // Validação básica
    if (!data.nome || !data.email || !data.telefone || !data.mensagem) {
      throw new Error("Todos os campos são obrigatórios");
    }

    // Aqui você pode integrar com um serviço de email como:
    // 1. SendGrid (https://sendgrid.com/)
    // 2. Mailgun (https://www.mailgun.com/)
    // 3. AWS SES (https://aws.amazon.com/pt/ses/)
    // 4. Nodemailer (https://nodemailer.com/)
    // 5. Firebase Cloud Functions

    // Exemplo com SendGrid:
    const sgMail = await import("@sendgrid/mail");
    const sg = sgMail.default;
    sg.setApiKey(process.env.SENDGRID_API_KEY || "");

    const emailContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00B4FF 0%, #7B3EFF 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #00B4FF; margin-bottom: 5px; }
          .footer { color: #999; font-size: 12px; text-align: center; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nova Solicitação de Demo - Tag It</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Nome:</div>
              <div>${data.nome}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Telefone:</div>
              <div><a href="tel:${data.telefone}">${data.telefone}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Mensagem:</div>
              <div style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px;">
                ${data.mensagem}
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Esta é uma mensagem automática do formulário de contato do site Tag It.</p>
            <p>© 2026 Tag It. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
    </html>
    `;

    // Enviar email para o contato da empresa
    await sg.send({
      to: "contato@tagit.com.br",
      from: process.env.SENDGRID_FROM_EMAIL || "noreply@tagit.com.br",
      subject: `Nova Solicitação de Demo - ${data.nome}`,
      html: emailContent,
      replyTo: data.email,
    });

    // Opcional: Enviar confirmação para o cliente
    const confirmationEmail = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00B4FF 0%, #7B3EFF 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .footer { color: #999; font-size: 12px; text-align: center; padding-top: 20px; border-top: 1px solid #ddd; }
          .highlight { color: #00B4FF; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Obrigado pelo seu interesse!</h1>
          </div>
          
          <div class="content">
            <p>Olá <span class="highlight">${data.nome}</span>,</p>
            
            <p>Recebemos sua solicitação de demo e agradecemos muito pelo seu interesse na <span class="highlight">Tag It</span>.</p>
            
            <p>Nossa equipe de vendas entrará em contato com você em breve através do telefone <strong>${data.telefone}</strong> ou email <strong>${data.email}</strong> para agendar sua demonstração.</p>
            
            <p><strong>Tempo de resposta:</strong> Normalmente respondemos dentro de 24 horas úteis.</p>
            
            <p>Se tiver dúvidas urgentes, você também pode nos contatar diretamente pelo WhatsApp: <strong>+55 16 99753-4316</strong></p>
            
            <p>Até breve!</p>
            <p><strong>Equipe Tag It</strong></p>
          </div>
          
          <div class="footer">
            <p>© 2026 Tag It. Todos os direitos reservados.</p>
            <p>Este email foi enviado por nosso sistema automático. Não responda diretamente neste email.</p>
          </div>
        </div>
      </body>
    </html>
    `;

    await sg.send({
      to: data.email,
      from: process.env.SENDGRID_FROM_EMAIL || "noreply@tagit.com.br",
      subject: "Confirmação de Recebimento - Solicitação de Demo Tag It",
      html: confirmationEmail,
    });

    return {
      success: true,
      message: "Email enviado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw error;
  }
}
