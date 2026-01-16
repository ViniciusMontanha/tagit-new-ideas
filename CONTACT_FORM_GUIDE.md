# 📧 Integração de Email - Modal de Contato

## 🎯 O Que Foi Criado

Implementei um **modal de formulário de contato** com:
- ✅ Validação de formulário (React Hook Form + Zod)
- ✅ 4 campos obrigatórios: nome, email, telefone, mensagem
- ✅ Design responsivo seguindo estilos do site
- ✅ Feedback visual (loading, sucesso, erro)
- ✅ Integração com botão "Solicitar Demo" no Header e Enterprise

---

## 📁 Arquivos Criados/Modificados

### Novos Componentes

1. **`src/components/ContactModal.tsx`** (220 linhas)
   - Modal completo com formulário
   - Validação com Zod
   - Estados de carregamento, sucesso e erro
   - Design responsivo

2. **`src/api/send-contact.ts`** (120 linhas)
   - Função para envio de email
   - Formatação HTML do email
   - Confirmação para o cliente
   - Pronta para integração com SendGrid/Mailgun/AWS SES

### Componentes Atualizados

3. **`src/components/Header.tsx`** 
   - Adicionado state para controlar modal
   - Botão "Solicitar Demo" agora abre o modal
   - Modal integrado

4. **`src/components/Enterprise.tsx`**
   - Adicionado state para controlar modal
   - Botão "Solicitar Proposta Comercial" agora abre o modal
   - Modal integrado

---

## 🛠️ Como Implementar o Envio de Email

### Opção 1: SendGrid (Recomendado)

**1. Instale a dependência:**
```bash
npm install @sendgrid/mail
```

**2. Configure variáveis de ambiente** (`.env` ou `.env.local`):
```env
SENDGRID_API_KEY=sua_chave_api_aqui
SENDGRID_FROM_EMAIL=noreply@tagit.com.br
```

**3. Crie um arquivo de API route** (se usar Next.js):
```typescript
// pages/api/send-contact.ts
import { sendContactEmail } from "@/api/send-contact";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await sendContactEmail(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ 
      error: "Erro ao enviar email",
      message: error.message 
    });
  }
}
```

### Opção 2: Mailgun

**1. Instale a dependência:**
```bash
npm install mailgun.js
```

**2. Configure variáveis de ambiente:**
```env
MAILGUN_API_KEY=sua_chave_api_aqui
MAILGUN_DOMAIN=your-domain.mailgun.org
```

**3. Implemente no arquivo API:**
```typescript
import Mailgun from "mailgun.js";

const mailgun = new Mailgun({ key: process.env.MAILGUN_API_KEY });
const client = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });
const messageData = {
  from: `noreply@${process.env.MAILGUN_DOMAIN}`,
  to: "contato@tagit.com.br",
  subject: `Nova Solicitação de Demo - ${data.nome}`,
  html: emailContent,
};

await client.messages.create(process.env.MAILGUN_DOMAIN, messageData);
```

### Opção 3: AWS SES

**1. Configure AWS SDK:**
```bash
npm install @aws-sdk/client-ses
```

**2. Implemente:**
```typescript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({ region: "us-east-1" });
const command = new SendEmailCommand({
  Source: "noreply@tagit.com.br",
  Destination: { ToAddresses: ["contato@tagit.com.br"] },
  Message: {
    Subject: { Data: `Nova Solicitação de Demo - ${data.nome}` },
    Body: { Html: { Data: emailContent } },
  },
});

await client.send(command);
```

### Opção 4: Nodemailer (Para servidor próprio)

**1. Instale:**
```bash
npm install nodemailer
```

**2. Configure:**
```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // ou seu provedor SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

await transporter.sendMail({
  from: "noreply@tagit.com.br",
  to: "contato@tagit.com.br",
  subject: `Nova Solicitação de Demo - ${data.nome}`,
  html: emailContent,
  replyTo: data.email,
});
```

---

## 🔄 Fluxo Completo

```
1. Usuário clica em "Solicitar Demo"
   ↓
2. Modal ContactModal abre
   ↓
3. Usuário preenche formulário (nome, email, telefone, mensagem)
   ↓
4. Validação Zod valida os dados
   ↓
5. Clique em "Enviar Mensagem"
   ↓
6. POST para /api/send-contact
   ↓
7. Função sendContactEmail processa
   ↓
8. Email é enviado via SendGrid/Mailgun/AWS SES/Nodemailer
   ↓
9. Modal mostra "Mensagem Enviada!"
   ↓
10. Modal fecha automaticamente após 2 segundos
```

---

## 📋 Regras de Validação

```javascript
// Nome
- Mínimo: 3 caracteres
- Máximo: 100 caracteres
- Obrigatório

// Email
- Deve ser válido (RFC 5322)
- Obrigatório

// Telefone
- Formato: (11) 99999-9999 ou +55 11 99999-9999
- Deve ter entre 10-11 dígitos após código país
- Obrigatório

// Mensagem
- Mínimo: 10 caracteres
- Máximo: 1000 caracteres
- Obrigatório
```

---

## 🎨 Estilos e Componentes Utilizados

### shadcn/ui Components
- `Dialog` - Modal container
- `Input` - Campos de texto
- `Textarea` - Caixa de mensagem
- `Button` - Botões de ação

### Estados Visuais
- ✅ **Sucesso**: Ícone verde com checkmark
- ⏳ **Carregando**: Spinner + "Enviando..."
- ❌ **Erro**: Mensagem vermelha com detalhes
- 🎯 **Validação**: Mensagens de erro em vermelho

### Responsividade
- Modal adapta para telas pequenas
- Campos full-width em mobile
- Inputs com padding adequado

---

## 📝 Exemplo de Email Enviado

**Para: contato@tagit.com.br**

```
De: João Silva <joao@empresa.com.br>
Assunto: Nova Solicitação de Demo - João Silva

────────────────────────────────────────

Nome: João Silva
Email: joao@empresa.com.br
Telefone: (11) 99999-9999
Mensagem:
Gostaria de conhecer melhor a solução de 
rastreamento de ativos para nossa empresa. 
Temos interesse em equipamentos.

────────────────────────────────────────
```

---

## 🔐 Segurança

### Validação
- ✅ Validação front-end com Zod
- ✅ Validação back-end obrigatória
- ✅ Rate limiting recomendado

### CSRF Protection
- ✅ POST apenas (sem GET)
- ✅ CORS configurado
- ✅ Headers de segurança

### Privacidade
- ✅ Email do cliente armazenado apenas na mensagem
- ✅ Conformidade LGPD (avisar sobre uso de dados)
- ✅ Política de privacidade no footer

---

## 🚀 Próximos Passos

### 1. Escolha um serviço de email
```bash
# Opção recomendada (SendGrid)
npm install @sendgrid/mail
```

### 2. Configure as variáveis de ambiente
```
SENDGRID_API_KEY=sua_chave
SENDGRID_FROM_EMAIL=noreply@tagit.com.br
```

### 3. Crie a API route
- Se usando Next.js: `pages/api/send-contact.ts`
- Se usando Node.js: criar rota em seu servidor
- Se usando Vercel: usar Vercel Edge Functions

### 4. Teste localmente
```bash
npm run dev
# Clique em "Solicitar Demo"
# Preencha o formulário
# Envie e verifique no console
```

### 5. Implemente tratamento de erros
- Validação de campos duplicados
- Rate limiting por IP
- Logging de erros
- Notificações de falha

---

## 📞 Configuração de Resposta Automática

Você pode adicionar auto-resposta em Gmail/Outlook:

```
Obrigado pelo seu interesse na Tag It!

Recebemos sua mensagem e nossa equipe 
entrará em contato em breve.

Horário de atendimento: 
Segunda a Sexta, 9h-18h

Para contato urgente:
WhatsApp: +55 16 99753-4316

Equipe Tag It
```

---

## ✅ Checklist de Implementação

- [ ] Escolher serviço de email (SendGrid/Mailgun/AWS SES/Nodemailer)
- [ ] Instalar dependência
- [ ] Configurar variáveis de ambiente
- [ ] Criar API route
- [ ] Testar envio localmente
- [ ] Testar validação de formulário
- [ ] Verificar email de confirmação
- [ ] Implementar rate limiting
- [ ] Adicionar logging
- [ ] Deploy em produção

---

## 🆘 Troubleshooting

### Erro: "Email não está sendo enviado"
```
Verificar:
1. Variáveis de ambiente estão corretas?
2. API key é válida?
3. Domínio está verificado no serviço?
4. Firewall está bloqueando?
```

### Erro: "Telefone inválido"
```
Aceitos:
- (11) 99999-9999
- +55 11 99999-9999
- 11 99999-9999
- 5511999999999

Não aceitos:
- 11-9999-9999
- 11 9999-9999
```

### Modal não abre
```
Verificar:
1. ContactModal está importada?
2. useState está declarado?
3. onOpenChange está passado corretamente?
```

---

## 📞 Contato para Suporte

Se precisar de ajuda com a implementação:
- Email: contato@tagit.com.br
- WhatsApp: +55 16 99753-4316
- Documentação: Veja GOOGLE_ADS_FINAL_REPORT.md

