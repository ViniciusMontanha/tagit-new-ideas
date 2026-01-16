# ✅ SEO Validation Checklist - Tag It

## 🎯 Pre-Launch Validation

### Antes de fazer deploy, valide cada item:

---

## 1. 📄 HTML & Meta Tags

- [ ] **Language**: `<html lang="pt-BR">` está declarado
- [ ] **Title**: 60-70 caracteres, com keyword primária
  - Atual: "Tag It - Rastreamento Inteligente de Ativos | Localização em Tempo Real"
- [ ] **Meta Description**: 155 caracteres, com CTA clara
  - Atual: "Solução completa de rastreamento GPS para empresas..."
- [ ] **Canonical URL**: Aponta para domínio real (não localhost/staging)
  - Verificar: `<link rel="canonical" href="https://tagit.com.br/" />`
- [ ] **OG:Image**: 1200x630px presente e acessível
  - Atualizar `https://tagit.com.br/og-image.png`
- [ ] **Mobile viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
- [ ] **Charset UTF-8**: `<meta charset="UTF-8" />`

---

## 2. 🗂️ Schema.org JSON-LD

Valide em: https://validator.schema.org/

### Organization Schema
```bash
✓ @type: Organization
✓ name: "Tag It"
✓ url: https://tagit.com.br
✓ logo: https://tagit.com.br/logo.png
✓ contactPoint: telephone + email
```

- [ ] Validado sem erros
- [ ] Logo URL retorna 200 OK
- [ ] Telefone em formato internacional (+55...)

### Product Schema
```bash
✓ @type: Product
✓ name: "Tag It - Rastreador de Ativos"
✓ aggregateRating: ratingValue + ratingCount
✓ offers: disponibilidade + priceCurrency
```

- [ ] Validado sem erros
- [ ] Rating entre 0-5
- [ ] Review count >= 10 (para aparecer em estrelas no Google)

### FAQPage Schema
```bash
✓ @type: FAQPage
✓ mainEntity: array de Question/Answer
✓ Mínimo 3 perguntas relevantes
```

- [ ] Validado sem erros
- [ ] Respostas > 50 caracteres
- [ ] Perguntas correspondem a real intent

### BreadcrumbList
```bash
✓ @type: BreadcrumbList
✓ itemListElement: array com position 1, 2, 3...
✓ Cada item com name + item (URL)
```

- [ ] Validado sem erros
- [ ] URLs correspondem às seções
- [ ] Position numérico correto

---

## 3. ♿ Acessibilidade (WCAG 2.1 AA)

### Validation Tool
Use: https://www.axe.com/tools (axe DevTools)

- [ ] **Headings**: Um único H1, H2s em ordem lógica
  - H1: "A Melhor Tecnologia..."
  - H2s: "Para Empresas", "Para Você", "Recursos"
- [ ] **Images**: Todas com `alt` descritivo
  - ❌ Evite: alt="image" ou alt="photo"
  - ✅ Use: alt="Tag It - Rastreador GPS com tecnologia avançada"
- [ ] **Links**: Texto descritivo, não "clique aqui"
  - ❌ `<a href="#empresas">Clique aqui</a>`
  - ✅ `<a href="#empresas">Para Empresas</a>`
- [ ] **ARIA Labels**: Botões, regiões, navegação com labels
  - `<button aria-label="Enviar mensagem via WhatsApp">`
  - `<nav aria-label="Navegação principal">`
  - `<section aria-labelledby="section-id">`
- [ ] **Color Contrast**: 4.5:1 para texto normal, 3:1 para grande
- [ ] **Keyboard Navigation**: Tab através de todos elementos interativos
- [ ] **Focus Indicators**: Visíveis quando tabbing

**Command Line Test**:
```bash
npm run lint  # ESLint com acessibilidade
```

---

## 4. 📱 Mobile Responsiveness

Use Chrome DevTools: F12 → Toggle device toolbar

### Breakpoints
- [ ] **Mobile** (320px): Layout single-column, legível
- [ ] **Tablet** (768px): Grid adapta, imagens escalam
- [ ] **Desktop** (1440px): Versão completa com sidebars

### Checklist
- [ ] Text readable sem zoom (16px+ font)
- [ ] Buttons clickable (48x48px+ recomendado)
- [ ] No horizontal scroll
- [ ] Images não overflow
- [ ] Spacing responsivo (px-4 mobile, px-12 desktop)

---

## 5. 🖼️ Imagens & Assets

### Otimização
- [ ] **Formato**: WEBP com fallback PNG/JPG
- [ ] **Tamanho**: 
  - Hero: max 200KB
  - Card: max 100KB
- [ ] **Dimensões**: width/height definidos (evita CLS)
- [ ] **Loading**: 
  - Hero: `loading="eager"`
  - Others: `loading="lazy"`
- [ ] **Alt Text**: Descritivo, 120 caracteres max

### Ferramentas
```bash
# Verificar imagens
find src/assets -type f \( -name "*.png" -o -name "*.jpg" \) | xargs ls -lh

# Comprimir (online tools)
https://tinypng.com/
https://imagemin.io/
```

---

## 6. ⚡ Core Web Vitals

Use: https://pagespeed.web.dev/

### Métricas Alvo
- [ ] **LCP** (Largest Contentful Paint): < 2.5s
  - Héroe image carrega rápido com preconnect
- [ ] **FID** (First Input Delay): < 100ms
  - React SWC compiler ativado
- [ ] **CLS** (Cumulative Layout Shift): < 0.1
  - Imagens com dimensions definidas

### Debug Local
```bash
npm run build:dev
npm run preview
# Abra localhost:4173 em incognito + slow 3G
```

---

## 7. 🔗 Linking Structure

### Internal Links
- [ ] Todos os links internos usam âncoras (`#empresas`, `#para-voce`)
- [ ] Âncoras correspondem aos section IDs
- [ ] Links acessíveis com `aria-label`

### External Links
- [ ] Links externos com `rel="noopener noreferrer"`
- [ ] Não há links quebrados (404s)
- [ ] WhatsApp link funciona: `https://wa.me/5516997534316?text=...`

---

## 8. 🔍 SEO On-Page

### Keyword Optimization
- [ ] **Primary Keyword**: "rastreamento de ativos" || "GPS tracker"
  - Presente em: Title, H1, meta description, 2-3x no corpo
- [ ] **Secondary Keywords**: "gestão de ativos", "localização em tempo real"
  - Distribuídos naturalmente nas seções

### Content Structure
- [ ] H1 descreve main topic
- [ ] Cada seção (H2) cobre subtopic
- [ ] Parágrafos focados (2-3 sentenças)
- [ ] Sem keyword stuffing (LSI keywords naturais)

### Readability
- [ ] Flesch Reading Ease Score: 60+ (fácil de ler)
- [ ] Sentenças: 15-20 palavras média
- [ ] Parágrafos: máx 4 linhas

---

## 9. 🚀 Performance

### Build
```bash
npm run build
```

### Análise
- [ ] **Bundle Size**:
  - JS: < 150KB gzipped (ideal < 100KB)
  - CSS: < 50KB gzipped
- [ ] **Load Time**: < 3 segundos (3G)
- [ ] **Time to Interactive**: < 4.5 segundos

### Tools
```bash
# Analizar bundle
npm install -g webpack-bundle-analyzer
# Depois configure no vite.config.ts
```

---

## 10. 🔐 Security & Compliance

### Headers (configure no servidor)
- [ ] **Content-Security-Policy**: Bloqueia scripts não autorizados
- [ ] **X-Content-Type-Options**: nosniff
- [ ] **X-Frame-Options**: SAMEORIGIN
- [ ] **Referrer-Policy**: strict-origin-when-cross-origin

### Cookies & Tracking
- [ ] **Google Analytics**: Implementado com consentimento
- [ ] **Cookie Banner**: Se cookies salvos
- [ ] **Privacy Policy**: Link no footer
- [ ] **GDPR Compliant**: Se usuários europeus

---

## 11. 📊 Google Search Console

### Setup
1. [ ] Verificar propriedade (DNS/HTML tag)
2. [ ] Submeter sitemap.xml
3. [ ] Configurar domínio preferido (www vs non-www)

### Monitoring
- [ ] Impressões: > 0 em 4 semanas
- [ ] CTR: > 2%
- [ ] Média Position: < 10 (primeira página)
- [ ] Sem erros de cobertura

### Testar Rich Results
```bash
# Google Rich Results Test
https://search.google.com/test/rich-results
```

---

## 12. 📋 Sitemap & Robots

### `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tagit.com.br/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] Criado e válido XML
- [ ] Submeter no GSC

### `public/robots.txt`
```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://tagit.com.br/sitemap.xml
```

- [ ] Permite googlebot
- [ ] Bloqueia caminhos sensíveis

---

## 13. 🔄 Duplicate Content & Canonical

- [ ] **Canonical Tag**: `<link rel="canonical" href="https://tagit.com.br/" />`
- [ ] **Trailing Slash**: Consistente (sempre com ou sem)
- [ ] **HTTPS Only**: Sem conteúdo HTTP
- [ ] **www Consistency**: Redirecionar www ↔ non-www

---

## 14. 📧 Structured Data Testing

### Ferramentas
1. **Google Schema Validator**: https://validator.schema.org/
2. **Google Rich Results Test**: https://search.google.com/test/rich-results
3. **Google Mobile-Friendly Test**: https://search.google.com/mobile-friendly-test

### Para Cada Tool
- [ ] Testar homepage URL
- [ ] 100% válido (sem warnings)
- [ ] Rich result preview visível (se aplicável)

---

## 15. 🎉 Launch Checklist

**Final Steps Before Going Live**:

- [ ] Backup de banco de dados (se aplicável)
- [ ] DNS apontando para servidor correto
- [ ] SSL certificate válido (HTTPS)
- [ ] CDN configurado (se usar)
- [ ] Analytics implementado
- [ ] Search Console verificado
- [ ] Email de suporte funcional
- [ ] 404 page customizada
- [ ] Monitoring/alertas configurados
- [ ] Plano de rollback se necessário

---

## 🔍 Quick Verification Commands

```bash
# Lint + type check
npm run lint

# Build production
npm run build

# Preview production
npm run preview

# Check for broken links
npm install -g broken-link-checker
blc https://localhost:4173 -r

# Test accessibility
npm install -g pa11y-ci
pa11y-ci https://localhost:4173

# Check Core Web Vitals (local simulation)
# Use Google PageSpeed Insights
```

---

## 📞 Support URLs

- **Google Search Central**: https://developers.google.com/search
- **Schema.org Documentation**: https://schema.org/
- **Web.dev SEO Guide**: https://web.dev/lighthouse-seo/
- **Webmaster Guidelines**: https://support.google.com/webmasters/answer/35769

---

**Last Updated**: January 15, 2026  
**Status**: Ready for Launch ✅
