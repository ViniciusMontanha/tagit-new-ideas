# Copilot Instructions for Tag It Project

## Project Overview
**Tag It** é uma landing page moderna de localização inteligente de ativos. Construída com Vite, TypeScript, React Router, e shadcn-ui components, otimizada para **SEO conforme diretrizes do Google** e **padrões Schema.org/JSON-LD**.

**Stack Tecnológico:**
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS + shadcn-ui (Radix UI primitives)
- **State Management**: TanStack React Query
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Temas**: next-themes (suporte dark mode)
- **Notificações**: Sonner + Radix Toast
- **Ícones**: Lucide React

---

## SEO & Google Best Practices

### 1. **Estrutura de Dados (Schema.org/JSON-LD)**

Todos os schemas estruturados estão no `index.html` como scripts JSON-LD. **Nunca remova ou altere estes scripts sem validar no Google Schema Validator.**

**Schemas implementados:**

```json
// Organization - Identidade da empresa
{
  "@type": "Organization",
  "name": "Tag It",
  "url": "https://tagit.com.br",
  "logo": "https://tagit.com.br/logo.png",
  "contactPoint": { "telephone": "+55-16-99129-5203" }
}

// Product - Informações do produto
{
  "@type": "Product",
  "name": "Tag It - Rastreador de Ativos",
  "aggregateRating": { "ratingValue": "4.8", "ratingCount": "150" }
}

// FAQPage - Perguntas frequentes
{
  "@type": "FAQPage",
  "mainEntity": [
    { "name": "Como funciona?", "acceptedAnswer": { "text": "..." } }
  ]
}

// BreadcrumbList - Navegação estruturada
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://tagit.com.br" }
  ]
}
```

**Para adicionar novo schema:**
1. Abra `index.html`
2. Crie novo `<script type="application/ld+json">` antes de `</head>`
3. Valide em [Google Schema Validator](https://validator.schema.org/)

### 2. **Meta Tags & Open Graph**

Otimizados em `index.html`:
- `<title>`: 60 caracteres, com palavra-chave primária e CTQ
- `<meta name="description">`: 155 caracteres, chamada clara à ação
- `og:image`: 1200x630px (OG padrão)
- `twitter:card`: summary_large_image
- `canonical`: Sempre aponta para domínio real (substitua `https://tagit.com.br`)

**Diretrizes do Google para títulos:**
- Inclua palavra-chave primária no início
- Adicione marca/diferencial
- Máximo 60 caracteres

### 3. **Hierarquia de Headings (H1-H6)**

**Regra crítica: UMA única `<h1>` por página.**

```tsx
// ✅ CORRETO
<h1>A Melhor Tecnologia de Localização para Seus Ativos</h1>
<h2>Para Empresas</h2>
<h3>Proteja seus ativos</h3>

// ❌ ERRADO
<h1>Hero Title</h1>
<h1>Outro H1</h1>  // Google penaliza múltiplos H1
```

**Mapping atual:**
- `Hero.tsx` → `<h1>` (principal)
- `Enterprise.tsx` → `<h2>` (seção)
- `Personal.tsx` → `<h2>` (seção)
- Benefit titles → `<h3>` (subtópicos)

### 4. **Acessibilidade (WCAG 2.1 AA) - Impacta SEO do Google**

Implementado em todos os componentes:

```tsx
// ✅ Atributos ARIA obrigatórios
<header role="banner" aria-label="Cabeçalho principal">
<nav role="navigation" aria-label="Navegação principal">
<section role="region" aria-labelledby="section-id">
<button aria-label="Descrição clara da ação">

// ✅ Imagens com alt text descritivo
<img 
  alt="Produto Tag It - Rastreador GPS com tecnologia avançada"
  loading="lazy"  // Para imagens below-the-fold
  loading="eager"  // Para imagens LCP (Hero)
/>

// ✅ Sem aria-hidden em conteúdo importante
<span aria-hidden="true">•</span>  // OK para ícones decorativos
```

**Impacto: Google favorece sites acessíveis no ranking.**

### 5. **Core Web Vitals Optimization**

Implementadas para melhor ranking:

**LCP (Largest Contentful Paint) < 2.5s:**
- Hero image com `loading="eager"` e preconnect
- Preload de Google Fonts

**FID (First Input Delay) < 100ms:**
- React SWC compiler (mais rápido que Babel)
- Event handlers otimizados

**CLS (Cumulative Layout Shift) < 0.1:**
- Imagens com `width` e `height` definidos
- Reserve espaço para elementos dinâmicos

### 6. **Microdata (itemScope/itemProp)**

Adiciona contexto para buscadores:

```tsx
<section itemScope itemType="https://schema.org/Service">
  <h2 itemProp="name">Para Empresas</h2>
  <p itemProp="description">Transforme a forma como...</p>
  
  <div role="list">
    {benefits.map(b => (
      <div itemScope itemType="https://schema.org/Thing">
        <h3 itemProp="name">{b.title}</h3>
        <p itemProp="description">{b.description}</p>
      </div>
    ))}
  </div>
</section>
```

---

## Architecture & Component Organization

### Landing Page Structure
Conteúdo único em rota `/` via `src/pages/Index.tsx`:

```tsx
<main>
  <Header />        // Navbar sticky, H1 em contexto
  <Hero />          // H1 principal, CTA
  <Enterprise />    // H2: Para Empresas
  <Personal />      // H2: Para Você
  <Features />      // H2: Recursos
  <Solutions />     // H2: CTA final
</main>
```

### Components
- **Header.tsx**: Navegação semântica com roles ARIA
- **Hero.tsx**: H1 principal, imagem LCP, CTAs com âncoras internas
- **Enterprise.tsx**: H2, lista de benefícios com schema
- **Personal.tsx**: H2, conteúdo análogo
- **Features.tsx**: H2, showcase de funcionalidades
- **Solutions.tsx**: H2, CTA final com contato
- **WhatsAppWidget.tsx**: Button acessível, always global
- **SEOHead.tsx**: Componente helper para schema estruturado

### Global Providers (`src/App.tsx`)
```tsx
<QueryClientProvider>
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <WhatsAppWidget />  // Global em todas rotas
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>
```

---

## Build & Development Commands

```bash
npm run dev         # Vite dev server, localhost:8080
npm run build       # Produção minificada
npm run build:dev   # Debug sem minificação
npm run lint        # ESLint + TypeScript check
npm run preview     # Preview da build local
```

---

## Styling & Tailwind CSS

### Design System
Cores em HSL (recomendado por Google para acessibilidade de contraste):

```css
--primary: 198 100% 50%;        /* Azul Ciano */
--secondary: 254 100% 62%;      /* Roxo */
--accent: 275 85% 60%;          /* Magenta */
```

### Padrões
- **Layout**: `container mx-auto px-4`
- **Tipografia**: Inter (Google Fonts com preconnect)
- **Animações**: Framer Motion (não Tailwind `animate-*`)
- **Z-index**: Header `z-50`, Modals acima

---

## Forms & Validation (Ready to implement)

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email inválido"),
  message: z.string().min(10)
});

export const ContactForm = () => {
  const form = useForm({ resolver: zodResolver(schema) });
  // ...
};
```

---

## Integration Points

### WhatsApp Widget
- **Localização**: Bottom-right, fixed, z-50
- **Telefone**: `+55-16-99129-5203`
- **Mensagem padrão**: "Olá! Gostaria de mais informações sobre a Tag It."
- **Implementação**: `window.open('wa.me/{numero}')`
- **SEO**: Sem impacto (não indexável)

### Assets
Stored em `src/assets/`:
```tsx
import logo from "@/assets/logo.png";
import tagProduct from "@/assets/tag-product.png";
```

### Routing
Single-page com 404:
```tsx
<Route path="/" element={<Index />} />
<Route path="*" element={<NotFound />} />
```

**Ancoras internas (fragment identifiers):**
- `#empresas` → Enterprise
- `#para-voce` → Personal
- `#features` → Features
- `#contato` → Solutions

---

## Common Tasks & SEO

### Adding a New Section

1. **Crie componente** em `src/components/SectionName.tsx`:
```tsx
export const SectionName = () => (
  <section 
    id="section-id"
    role="region"
    aria-labelledby="section-heading"
    itemScope
    itemType="https://schema.org/Service"
  >
    <h2 id="section-heading" itemProp="name">Título</h2>
    <p itemProp="description">Descrição</p>
  </section>
);
```

2. **Importe em** `src/pages/Index.tsx`
3. **Adicione em ordem lógica** (respeita hierarquia H)
4. **Use Framer Motion** para entrada
5. **Valide schema** em [validator.schema.org](https://validator.schema.org/)

### Optimizing Images for SEO

```tsx
<picture>
  <img
    src={image}
    alt="Descrição clara e rica em keywords"  // ✅ Alt text crítico
    loading="eager"                           // Hero, LCP
    loading="lazy"                            // Below-the-fold
    width={400}
    height={300}
  />
</picture>
```

### Internal Linking Strategy

Sempre use âncoras semânticas:
```tsx
<a href="#empresas" aria-label="Ir para seção Para Empresas">
  Para Empresas
</a>
```

**Benefício SEO**: Google rastreia fluxo de usuários; âncoras internas melhoram estrutura.

### Updating Theme Colors for Accessibility

Cores em `src/index.css` com contraste WCAG AA:
```css
:root {
  --primary: 198 100% 50%;     /* HSL para acessibilidade */
  --foreground: 217 29% 15%;
}

.dark {
  --primary: 200 100% 60%;     /* Ajuste para contraste */
}
```

---

## Type Safety & Best Practices

- **TypeScript 5.8.3**, strict mode ativado
- Tipagem explícita em todos componentes
- Use `@/` path alias para imports (config em vite.config.ts)

---

## Testing & Performance Audits

Use ferramentas do Google para validar:
1. **[Google PageSpeed Insights](https://pagespeed.web.dev/)** → Core Web Vitals
2. **[Google Search Console](https://search.google.com/search-console/)** → Indexação
3. **[Google Schema Validator](https://validator.schema.org/)** → Dados estruturados
4. **[Lighthouse](chrome://inspect)** → SEO audit completo

**Métricas alvo:**
- **SEO Score**: 95+
- **Performance**: 90+
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

---

## Debugging & Console Commands

```javascript
// No navegador console
// Validar dados estruturados
window.console.log(JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent));

// Verificar acessibilidade
document.querySelectorAll('img:not([alt])');  // Imagens sem alt text
document.querySelectorAll('button:not([aria-label])');  // Buttons sem label
```

---

## Portuguese Conventions

- **Comentários**: Preserve comentários em português
- **Conteúdo**: Toda copy em português (pt-BR)
- **Meta tags**: Português com natureza local (pt_BR em og:locale)
- **Alt text**: Descritivo em português

---

## Quick Reference: SEO Checklist

- [ ] H1 único e descritivo
- [ ] Meta description (155 chars, CTA claro)
- [ ] Alt text em todas imagens
- [ ] Headings em ordem (H1 → H2 → H3)
- [ ] Schema.org JSON-LD validado
- [ ] Imagens com width/height (evita CLS)
- [ ] Links internos com aria-label
- [ ] Preconnect para Google Fonts
- [ ] Mobile responsive (tested)
- [ ] Core Web Vitals no Google PageSpeed


