# 📧 Exemplo Prático: SendGrid + Next.js

Este é um exemplo completo e pronto para usar de como implementar o envio de emails com SendGrid.

## 1. Instalação

```bash
npm install @sendgrid/mail
```

## 2. Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# SendGrid Configuration
NEXT_PUBLIC_SITE_URL=https://tagit.com.br
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@tagit.com.br
```

**Onde obter a chave SendGrid:**
1. Acesse https://app.sendgrid.com/
2. Crie uma conta gratuita
3. Vá para Settings → API Keys
4. Crie uma nova API Key
5. Copie e cole em `.env.local`

## 3. Criar API Route (Next.js 13+)

Se você estiver usando **Next.js 13+ com App Router**, crie este arquivo:

**`src/app/api/send-contact/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

// Schema de validação
const contactSchema = z.object({
  nome: z.string().min(3).max(100),
  email: z.string().email(),
  telefone: z.string().regex(/^\+?55?\d{10,11}$/),
  mensagem: z.string().min(10).max(1000),
});

type ContactData = z.infer<typeof contactSchema>;

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// Template de email para a empresa
function getAdminEmailTemplate(data: ContactData): string {
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
              <div class="message-box">${data.mensagem}</div>
            </div>

            <div style="background: #e8f4ff; padding: 15px; border-radius: 4px; margin-top: 20px;">
              <p style="margin: 0; font-size: 13px; color: #0066cc;">
                <strong>⏰ Próximo Passo:</strong> 
                Entre em contato com este cliente em até 24 horas via:
              </p>
              <ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 13px;">
                <li>WhatsApp: <a href="https://wa.me/${data.telefone}" class="link" target="_blank">${data.telefone}</a></li>
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

// Template de email para o cliente
function getClientEmailTemplate(data: ContactData): string {
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
          .checkmark { 
            display: inline-block;
            width: 50px;
            height: 50px;
            background: #4CAF50;
            border-radius: 50%;
            margin-bottom: 20px;
          }
          .checkmark:after {
            content: '✓';
            color: white;
            font-size: 32px;
            line-height: 50px;
            text-align: center;
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
            
            <div style="background: white; border-left: 4px solid #00B4FF; padding: 15px; margin: 20px 0; border-radius: 4px;">
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
              <li>☎️ WhatsApp: <a href="https://wa.me/${data.telefone}" style="color: #00B4FF; text-decoration: none;">${data.telefone}</a></li>
              <li>📧 Email: ${data.email}</li>
            </ul>
            
            <p><strong>💡 Dúvidas Urgentes?</strong></p>
            <p>Entre em contato conosco diretamente:</p>
            <ul style="margin: 10px 0;">
              <li>🌐 Website: <a href="https://tagit.com.br" style="color: #00B4FF; text-decoration: none;">tagit.com.br</a></li>
              <li>📞 WhatsApp: <a href="https://wa.me/5516997534316" style="color: #00B4FF; text-decoration: none;">+55 16 99753-4316</a></li>
              <li>⏰ Horário: Segunda a Sexta, 9h-18h (Brasília)</li>
            </ul>
            
            <center>
              <a href="https://wa.me/5516997534316" class="button">Fale Conosco via WhatsApp</a>
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

// Tratador da requisição POST
export async function POST(request: NextRequest) {
  try {
    // Validar método
    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Método não permitido" },
        { status: 405 }
      );
    }

    // Validar CORS (opcional)
    const origin = request.headers.get("origin");
    if (
      origin &&
      !["https://tagit.com.br", "localhost:3000", "localhost:8080"].includes(
        new URL(origin).hostname
      )
    ) {
      return NextResponse.json(
        { error: "CORS não permitido" },
        { status: 403 }
      );
    }

    // Fazer parsing do body
    const body = await request.json();

    // Validar dados com Zod
    const validatedData = contactSchema.parse(body);

    // Formatar telefone para WhatsApp
    const whatsappPhone = validatedData.telefone.replace(/\D/g, "");

    // Enviar email para a empresa
    await sgMail.send({
      to: "contato@tagit.com.br",
      from: process.env.SENDGRID_FROM_EMAIL || "noreply@tagit.com.br",
      subject: `[NOVO CONTATO] ${validatedData.nome} - Solicitação de Demo`,
      html: getAdminEmailTemplate(validatedData),
      replyTo: validatedData.email,
      // Adicionar headers customizados
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
      },
    });

    // Enviar email de confirmação para o cliente
    await sgMail.send({
      to: validatedData.email,
      from: process.env.SENDGRID_FROM_EMAIL || "noreply@tagit.com.br",
      subject: "✅ Confirmação de Recebimento - Tag It",
      html: getClientEmailTemplate(validatedData),
    });

    // Log de sucesso (opcional)
    console.log(`📧 Email enviado para ${validatedData.email}`);
    console.log(`👤 Cliente: ${validatedData.nome}`);
    console.log(`📱 Telefone: ${validatedData.telefone}`);

    // Retornar sucesso
    return NextResponse.json(
      {
        success: true,
        message: "Email enviado com sucesso!",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    // Tratamento de erro
    console.error("❌ Erro ao enviar email:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Erro ao enviar email",
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Erro desconhecido ao enviar email",
      },
      { status: 500 }
    );
  }
}

// Tratador de requisições não-POST
export async function GET() {
  return NextResponse.json(
    { error: "Método GET não permitido. Use POST." },
    { status: 405 }
  );
}
```

## 4. Testar Localmente

```bash
# 1. Iniciar o servidor de desenvolvimento
npm run dev

# 2. Abrir no navegador
open http://localhost:3000

# 3. Clicar em "Solicitar Demo"

# 4. Preencher o formulário com dados de teste

# 5. Verificar:
#    - Email da empresa: contato@tagit.com.br
#    - Email do cliente: o email que você inseriu
#    - Console do NextJS para logs
```

## 5. Deploy em Produção

### Vercel
```bash
# 1. Fazer push no GitHub
git push origin main

# 2. Ir para Vercel Dashboard
# https://vercel.com/dashboard

# 3. Configurar variáveis de ambiente:
# Settings → Environment Variables
# - SENDGRID_API_KEY
# - SENDGRID_FROM_EMAIL

# 4. Deploy automático após push
```

### Outros Hosts
```bash
# 1. Guardar as variáveis de ambiente no seu host
# 2. Fazer push do código
# 3. Reiniciar aplicação
# 4. Testar em produção
```

## 6. Monitoramento

### Verificar SendGrid Activity
```bash
# 1. Acesse: https://app.sendgrid.com/
# 2. Vá para: Mail Send → Activity
# 3. Verifique:
#    - Emails entregues
#    - Bounces/Rejeições
#    - Taxa de abertura
```

### Logs de Erro
```bash
# No vercel/host, verificar logs:
npm run dev  # Local
# Production logs no dashboard do host
```

## ✅ Checklist Final

- [ ] SendGrid conta criada
- [ ] API Key gerada
- [ ] `.env.local` configurado
- [ ] Arquivo de API route criado
- [ ] npm install @sendgrid/mail
- [ ] Testado localmente
- [ ] Email enviado com sucesso
- [ ] Email de confirmação recebido
- [ ] Deploy em produção
- [ ] Variáveis de ambiente configuradas
- [ ] Monitoramento ativo

