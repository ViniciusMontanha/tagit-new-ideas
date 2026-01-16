# 🚀 Backend Tag It - Guia Rápido

## ✅ O Que Foi Criado

```
backend/
├── package.json          ✅ Dependências (Express, Brevo, CORS, Zod)
├── .env                  ✅ Chave Brevo configurada
├── .gitignore            ✅ Ignorar node_modules
├── README.md             ✅ Documentação completa
└── src/
    ├── server.js         ✅ Servidor Express na porta 3001
    └── brevo.js          ✅ Lógica de envio de emails
```

## 🎯 3 Passos para Rodar

### 1️⃣ Instalar (Já Feito! ✅)
```bash
cd backend
npm install
```

### 2️⃣ Iniciar o Backend
```bash
cd backend
npm run dev
```

Saída esperada:
```
🚀 Backend Tag It rodando em http://localhost:3001
📧 API de contato: http://localhost:3001/api/send-contact
✅ Health check: http://localhost:3001/api/health
🔑 Brevo API Key: ✓ Configurada
```

### 3️⃣ Iniciar o Frontend (Em outro terminal)
```bash
npm run dev
```

Saída esperada:
```
➜  Local:   http://localhost:5173/
```

## 🧪 Testar

1. Abrir http://localhost:5173
2. Clicar em **"Solicitar Demo"**
3. Preencher formulário:
   - Nome: Seu Nome
   - Email: seu-email@teste.com
   - Telefone: +5516999999999
   - Mensagem: Uma mensagem de teste
4. Clicar **"Enviar"**
5. Ver ✅ Confirmação
6. Verificar emails (2):
   - 📧 contato@tagit.com.br (seu formulário)
   - 📧 seu-email@teste.com (confirmação)

## 📊 Arquitetura

```
Frontend (Vite + React)          Backend (Express + Node.js)
http://localhost:5173     →      http://localhost:3001
     ↓ (POST)                           ↓
  ContactModal                    Validação (Zod)
   Form Data              →            ↓
                                 Brevo API
                                      ↓
                            Email 1: contato@tagit.com.br
                            Email 2: seu-email@teste.com
```

## 🔗 Conexão Frontend-Backend

Frontend enviará POST para:
```
http://localhost:3001/api/send-contact
```

Definido em:
- `.env.development`: `VITE_API_URL=http://localhost:3001`
- `.env.production`: `VITE_API_URL=https://seu-backend-url.railway.app`

## 📁 Estrutura do Backend

```
src/server.js
├── Imports: express, cors, dotenv, zod
├── Middleware: JSON, CORS
├── GET /api/health           → Status do servidor
├── POST /api/send-contact    → Enviar email
└── Error Handling            → Zod errors, exceptions

src/brevo.js
├── contactFormSchema         → Validação Zod
├── getAdminEmailTemplate()   → Email empresa
├── getClientEmailTemplate()  → Email confirmação
└── sendContactEmailBrevo()   → Lógica Brevo
```

## 💾 Variáveis de Ambiente

**Backend (backend/.env):**
```env
BREVO_API_KEY=xsmtpsib-...              ✅ Configurada
BREVO_FROM_EMAIL=noreply@tagit.com.br   ✅ Configurada
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env.development):**
```env
VITE_API_URL=http://localhost:3001      ✅ Configurada
```

## 🔒 Segurança

- ✅ CORS configurado para localhost:5173
- ✅ Validação Zod em todos os campos
- ✅ Erro handling robusto
- ✅ Email sanitizado (XSS prevention)

## 📈 Próximas Etapas

### Para Produção:

1. **Deploy Backend** (Railway.app - recomendado)
   ```bash
   # 1. Push no GitHub
   git add .
   git commit -m "Add backend infrastructure"
   git push origin main
   
   # 2. Railway Dashboard
   # - New Project → Deploy from GitHub
   # - Selecionar pasta: backend
   # - Configurar variáveis de ambiente
   # - Deploy automático
   
   # 3. Pegar URL pública: https://seu-app-xxxxx.railway.app
   ```

2. **Atualizar Frontend**
   ```env
   # .env.production
   VITE_API_URL=https://seu-app-xxxxx.railway.app
   ```

3. **Deploy Frontend** (Vercel ou seu host)

## ✅ Checklist Atual

- [x] Backend criado com Express
- [x] Brevo integrado
- [x] Validação Zod
- [x] CORS configurado
- [x] npm install completo
- [x] .env configurado
- [x] Frontend atualizado
- [ ] Backend rodando localmente (próximo passo)
- [ ] Teste funcional (formulário → emails)
- [ ] Deploy em produção

## 🚀 Próximo Comando

**Terminal 1 (Backend):**
```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

**Terminal 3 (Teste - Opcional):**
```bash
curl -X POST http://localhost:3001/api/send-contact \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "seu-email@gmail.com",
    "telefone": "+5516999999999",
    "mensagem": "Testando o sistema de email"
  }'
```

---

**Tudo pronto!** Agora é só rodar os servidores e testar. 🎉
