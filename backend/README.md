# Backend Tag It - Guia Completo

## 🚀 Estrutura

```
backend/
├── package.json          # Dependências do backend
├── .env                  # Variáveis de ambiente
├── .gitignore            # Ignorar node_modules
└── src/
    ├── server.js         # Servidor Express
    └── brevo.js          # Lógica de envio de email
```

## 📦 Instalar Dependências

```bash
cd backend
npm install
```

Isso vai instalar:
- **express**: Framework web
- **cors**: Permitir requisições do frontend
- **dotenv**: Ler variáveis de `.env`
- **@getbrevo/brevo**: SDK Brevo
- **zod**: Validação de dados

## ▶️ Rodar o Backend

### Desenvolvimento (com auto-reload)

```bash
cd backend
npm run dev
```

Output esperado:
```
🚀 Backend Tag It rodando em http://localhost:3001
📧 API de contato: http://localhost:3001/api/send-contact
✅ Health check: http://localhost:3001/api/health
🔑 Brevo API Key: ✓ Configurada
```

### Produção

```bash
cd backend
npm start
```

## 🔌 Endpoints da API

### GET `/api/health` - Health Check

```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2026-01-16T10:30:00.000Z",
  "brevoConfigured": true
}
```

### POST `/api/send-contact` - Enviar Email

```bash
curl -X POST http://localhost:3001/api/send-contact \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "+5516999999999",
    "mensagem": "Gostaria de agendar uma demo do Tag It"
  }'
```

Response (Sucesso):
```json
{
  "success": true,
  "message": "Email enviado com sucesso!",
  "timestamp": "2026-01-16T10:30:00.000Z"
}
```

Response (Erro):
```json
{
  "error": "Dados inválidos",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
# Brevo
BREVO_API_KEY=xsmtpsib-xxxxx...     # Sua chave Brevo
BREVO_FROM_EMAIL=noreply@tagit.com.br  # Email remetente

# Server
PORT=3001                             # Porta do servidor
NODE_ENV=development                  # development ou production

# Frontend
FRONTEND_URL=http://localhost:5173    # URL do frontend para CORS

# Supabase (somente backend/infra)
SUPABASE_DB_PASSWORD=CHANGE_ME
```

> Importante: nunca use senha de banco em variáveis `VITE_*`, pois elas ficam públicas no frontend.

## 🔄 Fluxo Completo

```
1. Frontend (Vite) - http://localhost:5173
   ↓ (POST /api/send-contact)
2. Backend (Express) - http://localhost:3001
   ↓ (Validação com Zod)
3. Brevo API
   ↓ (Envia 2 emails)
4. Empresa recebe: contato@tagit.com.br
5. Cliente recebe: confirmação em seu-email@teste
```

## 🧪 Testar Localmente

### Terminal 1: Backend

```bash
cd backend
npm run dev

# Output:
# 🚀 Backend Tag It rodando em http://localhost:3001
```

### Terminal 2: Frontend

```bash
npm run dev

# Output:
# ➜  Local:   http://localhost:5173/
```

### Terminal 3: Teste Manual

```bash
curl -X POST http://localhost:3001/api/send-contact \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "seu-email@gmail.com",
    "telefone": "+5516999999999",
    "mensagem": "Este é um teste de envio de email"
  }'
```

## 📱 Atualizar Frontend

O arquivo `src/components/ContactModal.tsx` já aponta para `/api/send-contact`.

Para **desenvolvimento local**, ele vai fazer POST em:
```
http://localhost:5173/api/send-contact
```

Mas como não existe essa rota, você precisa usar a URL completa do backend.

**Atualize em `src/components/ContactModal.tsx`:**

```tsx
// Encontre esta linha (por volta de linha 60):
const response = await fetch("/api/send-contact", {

// Mude para:
const response = await fetch("http://localhost:3001/api/send-contact", {
```

Ou crie um `.env` no frontend:

```env
VITE_API_URL=http://localhost:3001
```

E use:

```tsx
const apiUrl = import.meta.env.VITE_API_URL || "";
const response = await fetch(`${apiUrl}/api/send-contact`, {
```

## 🚀 Deploy em Produção

### Opção 1: Railway.app (Recomendado)

1. **GitHub:** Push seu código
```bash
git add .
git commit -m "Add backend for email"
git push origin main
```

2. **Railway:**
   - Acesse [railway.app](https://railway.app/)
   - Clique "New Project" → "Deploy from GitHub"
   - Selecione seu repositório
   - Selecione pasta: `backend`
   - Configure variáveis:
     ```
     BREVO_API_KEY=xsmtpsib-xxxxx
     BREVO_FROM_EMAIL=noreply@tagit.com.br
     PORT=3001
     NODE_ENV=production
     FRONTEND_URL=https://tagit.com.br
     ```

3. **Pegue a URL pública:**
   - Railway vai gerar: `https://seu-app-xxxxx.railway.app`

4. **Atualize Frontend:**
   - `.env.production`: `VITE_API_URL=https://seu-app-xxxxx.railway.app`

### Opção 2: Vercel

```bash
# Vercel não recomenda Node.js no `/backend`
# Usar serverless functions em `/api` dentro de `src/`
```

### Opção 3: Heroku (Deprecado, não recomendado)

## 📊 Monitorar Logs

### Local

```bash
# Terminal do backend mostra logs em tempo real
npm run dev

# Exemplo de output:
# ✅ Email enviado com sucesso para joao@example.com
# 👤 Cliente: João Silva | 📱 Telefone: +5516999999999
```

### Produção (Railway)

1. Railway Dashboard → Seu projeto → **Logs**
2. Veja todos os logs do servidor em tempo real

## 🔒 Segurança

### CORS Configurado

Backend aceita requisições de:
- `http://localhost:5173` (Vite dev)
- `http://localhost:3000`
- `https://tagit.com.br` (produção)

### Validação Zod

Todos os campos validados:
- **nome**: 3-100 caracteres
- **email**: formato válido
- **telefone**: padrão Brasil (+55...)
- **mensagem**: 10-1000 caracteres

### Erro Handling

- Trata Z odError (validação)
- Trata Error (geral)
- Trata exceções não capturadas

## ❓ Troubleshooting

| Problema | Solução |
|----------|---------|
| "BREVO_API_KEY not found" | Verificar `.env` no backend |
| "EADDRINUSE :::3001" | Porta 3001 ocupada, mude `PORT` |
| CORS error | Adicionar URL do frontend em `cors` |
| Email não enviado | Verificar logs, validar Brevo key |
| Frontend não conecta | Verificar `VITE_API_URL` |

## 📞 Suporte

- **Documentação Express:** https://expressjs.com/
- **Documentação Brevo:** https://developers.brevo.com/
- **Documentação Zod:** https://zod.dev/

---

**Pronto para rodar!** 🚀

1. `cd backend && npm install`
2. Verificar `.env` com Brevo API Key
3. `npm run dev`
4. Frontend faz POST para `http://localhost:3001/api/send-contact`