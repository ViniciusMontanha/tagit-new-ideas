# 🚀 Deploy - Backend + Frontend

## Visão Geral da Arquitetura em Produção

```
https://tagit.com.br (Vercel)          https://seu-backend-xxxxx.railway.app (Railway)
        ↓ (Vite + React)                        ↓ (Express + Node.js)
   ContactModal.tsx                        src/server.js
   POST request                           Validação + Brevo
        ↓                                       ↓
   .env.production                     Envia 2 emails
   VITE_API_URL=https://backend-url   contato@tagit.com.br
```

## 📋 Checklist de Deploy

### BACKEND (Railway.app)

- [ ] Código pronto em `/backend`
- [ ] `.env` com `BREVO_API_KEY` e `BREVO_FROM_EMAIL`
- [ ] `npm install` executado
- [ ] `npm run dev` testado localmente
- [ ] `package.json` com scripts (start, dev)
- [ ] Conta Railway criada
- [ ] GitHub conectado ao Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy automático ativado
- [ ] URL pública obtida

### FRONTEND (Vercel)

- [ ] `.env.production` atualizado com URL do backend
- [ ] Build testado localmente
- [ ] Conta Vercel criada
- [ ] GitHub conectado ao Vercel
- [ ] Deploy automático ativado
- [ ] Site rodando em produção

---

## PASSO A PASSO: Backend no Railway

### 1. Criar Conta Railway

1. Acesse [railway.app](https://railway.app)
2. Clique **"Start a New Project"**
3. Clique **"Deploy from GitHub"**
4. Autorize Railway no GitHub
5. Selecione seu repositório `tagit-new-ideas`

### 2. Configurar Projeto Railway

1. **New Project** → Confirmar repositório
2. **Settings** → **Root Directory**
   - Clique em "Root Directory"
   - Digite: `backend`
   - Clique **"Save"**

### 3. Configurar Variáveis de Ambiente

1. **Variables** → **Add**
   
   | Key | Value |
   |-----|-------|
   | `BREVO_API_KEY` | `xsmtpsib-d665b495...` |
   | `BREVO_FROM_EMAIL` | `noreply@tagit.com.br` |
   | `PORT` | `3001` |
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | `https://tagit.com.br` |

2. Clique **"Deploy"**

### 4. Obter URL Pública

Após deploy:
1. **Deployments** → Último deployment
2. **View Deployment**
3. URL pública: `https://seu-app-xxxxx.railway.app`

**Copie essa URL!** Você vai usar no frontend.

### 5. Testar Backend em Produção

```bash
curl https://seu-app-xxxxx.railway.app/api/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "brevoConfigured": true
}
```

---

## PASSO A PASSO: Frontend no Vercel

### 1. Preparar Frontend

Atualize `.env.production`:

```env
VITE_API_URL=https://seu-app-xxxxx.railway.app
```

Commit e push:
```bash
git add .env.production
git commit -m "Configure production API URL"
git push origin main
```

### 2. Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique **"New Project"**
3. Selecione seu repositório
4. Configuração:
   - **Root Directory**: `.` (raiz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Configurar Variáveis de Ambiente

1. **Environment Variables**
   
   | Key | Value | Scope |
   |-----|-------|-------|
   | `VITE_API_URL` | `https://seu-app-xxxxx.railway.app` | Production |

2. Clique **"Deploy"**

### 4. Aguardar Deploy

- Vercel faz build automaticamente
- Hospeda em `https://seu-projeto-vercel-url.vercel.app`

### 5. Configurar Domínio

Se tiver domínio `tagit.com.br`:

1. **Settings** → **Domains**
2. Adicione: `tagit.com.br`
3. Siga instruções DNS

---

## Fluxo Completo de Deploy

```bash
# 1. BACKEND - Push código
cd /workspaces/tagit-new-ideas
git add backend/
git commit -m "Add Express backend with Brevo"
git push origin main

# 2. BACKEND - Railway detecta novo push
# Automático: Railway faz npm install & npm start

# 3. BACKEND - Pega URL: https://seu-backend-xxxxx.railway.app

# 4. FRONTEND - Atualizar .env.production
echo "VITE_API_URL=https://seu-backend-xxxxx.railway.app" > .env.production
git add .env.production
git commit -m "Update API URL for production"
git push origin main

# 5. FRONTEND - Vercel detecta novo push
# Automático: Vercel faz npm run build & deploy

# 6. FRONTEND - Acessar: https://seu-projeto-vercel-url.vercel.app
```

---

## Monitorar em Produção

### Backend Logs (Railway)

1. Railway Dashboard → Seu projeto
2. **Deployments** → Último
3. **Logs**
4. Veja:
   - ✅ "Email enviado com sucesso"
   - ❌ "Erro ao enviar email"

### Frontend Logs (Vercel)

1. Vercel Dashboard → Seu projeto
2. **Deployments** → Último
3. **Logs**
4. Veja erros de build/deploy

### Monitorar Emails (Brevo)

1. Dashboard Brevo
2. **Transactional Emails** → **Activity**
3. Veja cada email enviado
4. Status: Success, Bounced, Opened, etc

---

## Troubleshooting Produção

| Problema | Solução |
|----------|---------|
| 502 Bad Gateway | Verificar logs Railway, variáveis de env |
| CORS error | Adicionar URL frontend em CORS do backend |
| Email não chega | Verificar BREVO_API_KEY, domínio verificado |
| Build falha | Verificar `npm run build` localmente |
| Variáveis não aparecem | Redeployar após adicionar variáveis |

---

## URLs Importantes

| Serviço | URL |
|---------|-----|
| Seu App | https://tagit.com.br |
| Backend | https://seu-backend-xxxxx.railway.app |
| Railway Dashboard | https://railway.app/dashboard |
| Vercel Dashboard | https://vercel.com/dashboard |
| Brevo Dashboard | https://app.brevo.com |

---

## 🎉 Após Deploy

1. ✅ Testar formulário em https://tagit.com.br
2. ✅ Preencher demo request
3. ✅ Validar 2 emails (empresa + confirmação)
4. ✅ Verificar status em Brevo
5. ✅ Monitorar logs diários

---

**Documentação Útil:**
- Railway Docs: https://docs.railway.app/
- Vercel Docs: https://vercel.com/docs
- Brevo Docs: https://developers.brevo.com/

---

Qualquer dúvida, revisar este guia ou os READMEs nos diretórios!
