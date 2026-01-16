# 📧 Guia de Implementação: Brevo + Next.js

Este é um guia completo para usar Brevo (ex-Sendinblue) como serviço de email para o formulário de contato.

## ✅ O Que Já Está Pronto

- ✅ Pacote `@getbrevo/brevo` instalado
- ✅ Arquivo `src/api/send-contact-brevo.ts` com toda lógica de envio
- ✅ Templates HTML profissionais (empresa + confirmação cliente)
- ✅ Validação Zod integrada
- ✅ ContactModal já chama a API

## 1. Criar Conta no Brevo

1. Acesse [brevo.com](https://www.brevo.com/)
2. Clique em **"Sign Up"**
3. Preencha com seus dados (email, senha, empresa)
4. Confirme seu email
5. **Login** na conta

## 2. Gerar Chave de API

1. Na dashboard, clique em seu **nome/perfil** (canto superior direito)
2. Vá para **Settings → SMTP & API**
3. Na aba **"API Keys"**, clique **"Create a new API key"**
4. Escolha nome: `tag-it-contact-form`
5. Clique **"Generate"**
6. **Copie a chave** (aparece uma única vez!)

## 3. Configurar Variáveis de Ambiente

Crie ou edite um arquivo `.env.local` na raiz do projeto:

```env
# Brevo Configuration
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_FROM_EMAIL=noreply@tagit.com.br
```

### Encontrar a Chave

Se perdeu a chave, no Brevo:
1. Settings → SMTP & API
2. API Keys → Crie uma nova

## 4. Criar Rota Next.js da API

### Se você usa Next.js 13+ (App Router)

Crie: `src/app/api/send-contact/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { sendContactEmailBrevo, contactFormSchema } from "@/api/send-contact-brevo";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Validar método
    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Método não permitido" },
        { status: 405 }
      );
    }

    // Parse body
    const body = await request.json();

    // Validar com Zod
    const validatedData = contactFormSchema.parse(body);

    // Enviar email via Brevo
    const result = await sendContactEmailBrevo(validatedData);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Email enviado com sucesso!",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Erro ao enviar email",
          details: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Erro na API de contato:", error);

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

    return NextResponse.json(
      {
        error: "Erro ao enviar email",
        message: error instanceof Error ? error.message : "Desconhecido",
      },
      { status: 500 }
    );
  }
}
```

### Se você usa Next.js 12 ou Pages Router

Crie: `pages/api/send-contact.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { sendContactEmailBrevo, contactFormSchema } from "@/api/send-contact-brevo";
import { z } from "zod";

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
  details?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const validatedData = contactFormSchema.parse(req.body);
    const result = await sendContactEmailBrevo(validatedData);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Email enviado com sucesso!",
      });
    } else {
      return res.status(500).json({
        error: "Erro ao enviar email",
        details: result.error,
      });
    }
  } catch (error) {
    console.error("Erro:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: error.errors,
      });
    }

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}
```

## 5. Teste Local

```bash
# 1. Iniciar servidor de desenvolvimento
npm run dev

# 2. Abrir no navegador
open http://localhost:3000

# 3. Clicar em "Solicitar Demo"

# 4. Preencher formulário com dados reais:
#    - Nome: Seu Nome
#    - Email: seu-email@exemplo.com
#    - Telefone: +5516999999999
#    - Mensagem: Olá, gostaria de agendar uma demo

# 5. Verificar:
#    - Sucesso no modal (✅ Confirmação)
#    - Email recebido em contato@tagit.com.br (formulário)
#    - Email recebido em seu-email@exemplo.com (confirmação)
#    - Logs no console do Next.js
```

## 6. Verificar Emails no Brevo

1. Dashboard do Brevo
2. Menu lateral → **Transactional Emails** ou **Message Activity**
3. Veja:
   - ✅ **Emails enviados**: Lista de todos
   - 📊 **Taxa de entrega**: Quantos chegaram
   - ⏱️ **Horário**: Quando foram enviados

### Solucionar Problemas

**Email não enviado:**
- ❌ Verificar se `BREVO_API_KEY` está em `.env.local`
- ❌ Verificar se a chave é válida no Brevo (Settings → API Keys)
- ❌ Verificar console do Next.js para erros
- ❌ Confirmar que `BREVO_FROM_EMAIL` é válido

**Email foi para spam:**
- ✅ Isso é normal no início
- ✅ Brevo aprende com tempo (deixe emails irem para inbox)
- ✅ Configure SPF/DKIM no seu domínio (veja seção abaixo)

## 7. Configurar SPF/DKIM (Recomendado)

Para melhor entrega, adicione registros DNS:

### Verificar Domínio no Brevo

1. Brevo Dashboard → **Settings → Domains**
2. Clique **"Add a domain"**
3. Digite seu domínio: `tagit.com.br`
4. Brevo te mostra registros DNS para adicionar:
   - **SPF Record** (TXT)
   - **DKIM Record** (CNAME ou TXT)
5. Adicione em seu provedor DNS (Godaddy, Namecheap, etc)
6. Clique **"Verify"** após 24h

**Benefícios:**
- ✅ Taxa de entrega 99%+
- ✅ Menos emails em spam
- ✅ Marca autenticada

## 8. Deploy em Produção

### Vercel

1. **Push no GitHub:**
```bash
git add .
git commit -m "Add Brevo email integration"
git push origin main
```

2. **Configurar Variáveis no Vercel:**
   - Acesse: https://vercel.com/dashboard
   - Selecione seu projeto
   - **Settings → Environment Variables**
   - Adicione:
     ```
     BREVO_API_KEY=xkeysib-xxxxx
     BREVO_FROM_EMAIL=noreply@tagit.com.br
     ```

3. **Redeploy:**
   - Clique em "Redeploy"
   - Aguarde build completar

### Outros Hosts (Railway, Render, etc)

- Adicione `BREVO_API_KEY` e `BREVO_FROM_EMAIL` nas variáveis de ambiente
- Faça push do código
- Reinicie aplicação

## 9. Monitoramento & Logs

### Ver Atividade no Brevo

Dashboard → **Transactional Emails → Activity**
- Veja cada email enviado
- Status (Success, Bounced, Clicked, etc)
- Horário e destinatário

### Ver Logs Locais

```bash
# Terminal onde está rodando npm run dev
# Procure por linhas como:
# ✅ Email enviado com sucesso para xxx@email.com
# ❌ Erro ao enviar email via Brevo: ...
```

### Ver Logs em Produção (Vercel)

1. https://vercel.com/dashboard
2. Seu projeto → **Deployments**
3. Último deploy → **Logs**
4. Procure por "Email enviado" ou "Erro"

## 10. ✅ Checklist Final

- [ ] Conta Brevo criada
- [ ] API Key gerada
- [ ] `.env.local` configurado com `BREVO_API_KEY`
- [ ] `.env.local` configurado com `BREVO_FROM_EMAIL`
- [ ] Rota API criada (`src/app/api/send-contact/route.ts`)
- [ ] npm install (pacotes instalados)
- [ ] Testado localmente com sucesso
- [ ] Email recebido em contato@tagit.com.br
- [ ] Email de confirmação recebido
- [ ] Variáveis de ambiente configuradas em Vercel
- [ ] Deploy em produção
- [ ] SPF/DKIM adicionado (opcional mas recomendado)

## 📞 Suporte

**Documentação Brevo:**
- API Docs: https://developers.brevo.com/
- Dashboard: https://app.brevo.com/

**Problemas Comuns:**

| Problema | Solução |
|----------|---------|
| "Invalid API key" | Verificar se a chave em `.env.local` está correta |
| Email não chega | Verificar spam, ativar domínio verificado |
| Rate limit | Brevo permite 300 emails/dia na versão gratuita |
| Email em HTML ruim | Usar os templates incluídos em `send-contact-brevo.ts` |

---

**Pronto!** 🎉 Seu formulário de contato está enviando emails via Brevo!

