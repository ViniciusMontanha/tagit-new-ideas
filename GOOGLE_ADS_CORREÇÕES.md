# 🔧 Correções Google Ads - Implementação

## INSTRUÇÕES: Forneça os Valores Reais

Para corrigir **TODOS os problemas críticos**, você precisa fornecer:

```txt
┌─────────────────────────────────────────────────────────────┐
│ INFORMAÇÕES OBRIGATÓRIAS PARA CORREÇÃO                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. DOMÍNIO DE PRODUÇÃO                                      │
│    Exemplos:                                                │
│    - https://tagit.com.br                                  │
│    - https://www.seudominio.com.br                         │
│    - https://seu-site-custom.com.br                        │
│    Seu valor: _____________________________                 │
│                                                              │
│ 2. EMAIL DE CONTATO (FUNCIONANDO)                           │
│    Exemplos:                                                │
│    - contato@tagit.com.br                                  │
│    - suporte@seudominio.com.br                             │
│    - vendas@empresa.com.br                                 │
│    Seu valor: _____________________________                 │
│                                                              │
│ 3. TELEFONE WHATSAPP (VERIFICADO)                           │
│    Exemplos:                                                │
│    - +55 16 99753-4316                                     │
│    - +55 11 98765-4321                                     │
│    Seu valor: _____________________________                 │
│                                                              │
│ 4. PÁGINA FACEBOOK (SE TIVER)                              │
│    Exemplos:                                                │
│    - https://www.facebook.com/tagit.oficial                │
│    - https://www.facebook.com/seudominio                   │
│    - [Deixar vazio se não tiver]                           │
│    Seu valor: _____________________________                 │
│                                                              │
│ 5. PÁGINA INSTAGRAM (SE TIVER)                             │
│    Exemplos:                                                │
│    - https://www.instagram.com/tagit.oficial               │
│    - https://www.instagram.com/seudominio                  │
│    - [Deixar vazio se não tiver]                           │
│    Seu valor: _____________________________                 │
│                                                              │
│ 6. PÁGINA LINKEDIN (SE TIVER)                              │
│    Exemplos:                                                │
│    - https://www.linkedin.com/company/tagit-br             │
│    - https://www.linkedin.com/company/seudominio           │
│    - [Deixar vazio se não tiver]                           │
│    Seu valor: _____________________________                 │
│                                                              │
│ 7. IMAGEM OPENGRAPH (ARQUIVO)                              │
│    Local do arquivo:                                        │
│    - public/og-image.png (1200x630px)                      │
│    Status: [ ] Arquivo pronto / [ ] Precisa criar         │
│                                                              │
│ 8. LOGO DA EMPRESA                                          │
│    Local do arquivo:                                        │
│    - public/logo.png                                        │
│    Status: [ ] Arquivo pronto / [ ] Precisa criar         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## IMPLEMENTAÇÃO AUTOMÁTICA

Uma vez que você forneça os valores reais, executarei automaticamente:

### ✅ Correção 1: Atualizar Todos os URLs
```
Arquivos a modificar:
└─ index.html
   ├─ <link rel="canonical" href="..." />
   ├─ <meta property="og:url" ... />
   ├─ <meta property="og:image" ... />
   ├─ <meta name="twitter:image" ... />
   ├─ Schema Organization (url, logo, image)
   ├─ Schema Product (image)
   └─ ContactPoint (email)
```

### ✅ Correção 2: Validar/Atualizar Links Sociais
```
Schema.org "sameAs" em index.html será:
├─ Removido se links não existem, OU
└─ Atualizado com links reais verificados
```

### ✅ Correção 3: Atualizar Contato
```
Arquivos a modificar:
├─ index.html (Schema ContactPoint)
└─ src/components/WhatsAppWidget.tsx
   ├─ phoneNumber = seu telefone real
   └─ email (se adicionar)
```

### ✅ Correção 4: Adicionar Imagens
```
Arquivos necessários em public/:
├─ og-image.png (1200x630px)
└─ logo.png
```

---

## 🚀 PRÓXIMO PASSO

**Você pode:**

**Opção A**: Fornecer informações aqui (recomendado)
```
Responda este formato:

DOMÍNIO: https://...
EMAIL: ...@...
TELEFONE: +55...
FACEBOOK: https://... (ou deixar vazio)
INSTAGRAM: https://... (ou deixar vazio)
LINKEDIN: https://... (ou deixar vazio)
OG-IMAGE: [Tem arquivo pronto? Sim/Não]
LOGO: [Tem arquivo pronto? Sim/Não]
```

**Opção B**: Eu faço correção com template seguro
- Remover todas URLs inválidas
- Remover links sociais falsos
- Deixar apenas informações verificáveis
- Resultado: Site com 0 warnings, mas sem SEO social completo

---

## ⏰ TIMELINE

- **Opção A** (com valores reais): 15 minutos de implementação
- **Opção B** (template seguro): 5 minutos de implementação

Qual você prefere? 🎯
