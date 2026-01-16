# 📖 Tag It SEO - Examples & Usage Guide

## Quick Start: Usando a Landing Page Refatorada

---

## 1️⃣ Estrutura Básica de uma Seção

### Template Reutilizável

```tsx
// src/components/MySection.tsx
import { motion } from "framer-motion";

export const MySection = () => {
  return (
    <section 
      id="minha-secao"                    // ID para âncora
      role="region"                       // ARIA role
      aria-labelledby="section-heading"   // Referência ao H2
      itemScope                           // Schema.org
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto px-4 py-32">
        
        {/* Heading com ID para aria-labelledby */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 
            id="section-heading"
            className="text-5xl font-bold mb-6"
            itemProp="name"
          >
            Minha Seção
          </h2>
          <p 
            className="text-xl text-muted-foreground"
            itemProp="description"
          >
            Descrição clara e descritiva da seção.
          </p>
        </motion.div>

        {/* Conteúdo */}
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Content here */}
        </div>

      </div>
    </section>
  );
};
```

---

## 2️⃣ Adicionando Links Internos (Navigation)

### Correto ✅
```tsx
// Header com links semânticos
<nav aria-label="Navegação principal">
  <a 
    href="#empresas"
    aria-label="Ir para seção Para Empresas"
    className="hover:text-primary transition-colors"
  >
    Para Empresas
  </a>
</nav>

// No Index.tsx, adicione a seção com ID correspondente
<section id="empresas">...</section>
```

### Incorreto ❌
```tsx
// Evite
<button onClick={() => scrollToSection('empresas')}>
  Para Empresas
</button>
// ou
<Link to="/empresas">Para Empresas</Link>  // Essa é uma rota separada
```

---

## 3️⃣ Otimizando Imagens para SEO & Performance

### Exemplo Completo
```tsx
import featuredImage from "@/assets/featured.png";

export const ImageSection = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Imagem Hero - carrega rápido (LCP) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <picture>
            <img
              src={featuredImage}
              alt="Rastreador Tag It mostrando localização em tempo real no mapa"
              loading="eager"           // Hero: carregamento imediato
              width={600}               // Define dimensão (evita CLS)
              height={400}
              className="rounded-2xl shadow-strong"
              itemProp="image"          // Schema.org
            />
          </picture>
        </motion.div>

        {/* Outra imagem abaixo - carrega sob demanda */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <picture>
            <img
              src={secondaryImage}
              alt="Dashboard Tag It com gráficos de localização e analytics"
              loading="lazy"            // Fora do viewport inicial
              width={600}
              height={400}
              className="rounded-2xl"
            />
          </picture>
        </motion.div>

      </div>
    </section>
  );
};
```

### Tamanhos Recomendados
```
Hero Image: 1200x800px (máx 200KB)
Card Image: 600x400px (máx 100KB)
Thumbnail: 300x200px (máx 50KB)
OG Image: 1200x630px (máx 300KB)
```

---

## 4️⃣ Criando Listas Estruturadas com Schema

### Exemplo: Lista de Benefícios
```tsx
const benefits = [
  {
    icon: Lock,
    title: "Segurança Total",
    description: "Criptografia ponta a ponta para todos os dados.",
  },
  // ... mais itens
];

export const BenefitsList = () => {
  return (
    <div role="list" className="grid grid-cols-1 gap-6">
      {benefits.map((benefit) => (
        <div 
          key={benefit.title}
          role="listitem"
          itemScope
          itemType="https://schema.org/Thing"
          className="p-8 rounded-lg border"
        >
          <div className="flex items-start gap-4">
            {/* Ícone */}
            <benefit.icon 
              className="w-8 h-8"
              aria-hidden="true"  // Ícone decorativo
            />
            
            {/* Conteúdo com schema */}
            <div>
              <h3 itemProp="name" className="text-2xl font-semibold">
                {benefit.title}
              </h3>
              <p itemProp="description" className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
```

---

## 5️⃣ Implementando FAQ (Estruturado)

### No index.html - Schema FAQPage
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como funciona o rastreamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O rastreamento funciona através de tecnologia GPS avançada..."
      }
    },
    {
      "@type": "Question",
      "name": "Quais dados são coletados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coletamos apenas dados de localização e status do dispositivo..."
      }
    }
  ]
}
</script>
```

### No componente React
```tsx
const faqs = [
  {
    question: "Como funciona o rastreamento?",
    answer: "O rastreamento funciona através de tecnologia GPS avançada...",
  },
  // ...
];

export const FAQ = () => {
  return (
    <section id="faq">
      <h2>Perguntas Frequentes</h2>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details 
            key={faq.question}
            className="p-4 border rounded"
            itemScope
            itemType="https://schema.org/Question"
          >
            <summary 
              className="font-semibold cursor-pointer"
              itemProp="name"
            >
              {faq.question}
            </summary>
            
            <div 
              className="mt-4 text-muted-foreground"
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <p itemProp="text">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
```

---

## 6️⃣ Botões Acessíveis & Semânticos

### Padrão para Buttons
```tsx
import { Button } from "@/components/ui/button";

// CTA com link semântico
<Button 
  size="lg"
  className="px-8 py-6 rounded-full"
  asChild  // Renderiza como filho (Link)
>
  <a 
    href="#contato"
    aria-label="Ir para formulário de contato"
  >
    Solicitar Demo
  </a>
</Button>

// Botão com WhatsApp
<Button
  onClick={handleWhatsApp}
  aria-label="Enviar mensagem via WhatsApp"
>
  <MessageCircle aria-hidden="true" />
  <span>WhatsApp</span>
</Button>

// Botão com submenu
<Button
  aria-expanded={isOpen}
  aria-controls="menu-id"
  onClick={() => setIsOpen(!isOpen)}
>
  Menu
</Button>
{isOpen && <div id="menu-id">...</div>}
```

---

## 7️⃣ Validando SEO Localmente

### Terminal Commands
```bash
# Build production
npm run build

# Preview locally
npm run preview
# Acessa: http://localhost:4173

# Lint + TypeScript check
npm run lint

# Simular slow 3G
# Chrome DevTools → Network → Throttling: Slow 3G
```

### Validar HTML via W3C
1. Abra DevTools (F12)
2. Copie o HTML gerado
3. Vá para: https://validator.w3.org/
4. Cole no "Direct Input"
5. Validar

### Validar Schema.org
1. Acesse: https://validator.schema.org/
2. Cole a URL ou HTML
3. Procure por erros/warnings
4. Corrija se necessário

---

## 8️⃣ Implementando Breadcrumbs

### Na página (componente)
```tsx
export const Breadcrumbs = () => {
  return (
    <nav 
      aria-label="Breadcrumb"
      className="mb-8"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex gap-2">
        {[
          { name: "Home", url: "/" },
          { name: "Para Empresas", url: "/#empresas" },
          { name: "Rastreamento de Ativos", url: null }, // Current page
        ].map((item, index) => (
          <li key={index}>
            {item.url ? (
              <a 
                href={item.url}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name">{item.name}</span>
                <meta itemProp="position" content={String(index + 1)} />
                <meta itemProp="item" content={item.url} />
              </a>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
            {index < 2 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
```

### No index.html (JSON-LD)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://tagit.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Para Empresas",
      "item": "https://tagit.com.br/#empresas"
    }
  ]
}
</script>
```

---

## 9️⃣ Acessibilidade: Skip Links

```tsx
export const SkipLink = () => {
  return (
    <a 
      href="#main-content"
      className="absolute top-0 left-0 -translate-y-full px-4 py-2 bg-primary text-primary-foreground focus:translate-y-0 transition-transform"
      aria-label="Pular para conteúdo principal"
    >
      Pular para conteúdo
    </a>
  );
};

// No componente principal
export const Main = () => {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" role="main">
        {/* Content */}
      </main>
    </>
  );
};
```

---

## 🔟 Testando Core Web Vitals

### Google PageSpeed Insights
```
1. Acesse: https://pagespeed.web.dev/
2. Cole a URL: https://tagit.com.br/
3. Analise:
   - LCP: < 2.5s ✅
   - FID: < 100ms ✅
   - CLS: < 0.1 ✅
4. Implemente sugestões
```

### Simular Locally (Chrome DevTools)
```
1. F12 → Performance tab
2. Click "Record"
3. Reload page
4. Analise o timeline
5. Procure por:
   - Red bars (problemas)
   - Long tasks (JS pesado)
   - Layout shifts (imagens sem dimensão)
```

---

## 🎯 SEO Checklist - Antes de Deploy

```
✅ Meta tags
  - [ ] Title: 60-70 chars
  - [ ] Description: 155 chars
  - [ ] OG:Image: 1200x630px
  - [ ] Canonical URL correto

✅ Estrutura
  - [ ] H1 único
  - [ ] H2s em ordem
  - [ ] Alt text em todas imagens
  - [ ] ARIA labels em buttons/links

✅ Schema.org
  - [ ] Organization validado
  - [ ] Product com rating
  - [ ] FAQPage completo
  - [ ] Breadcrumbs correto

✅ Performance
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
  - [ ] Bundle < 150KB JS

✅ Acessibilidade
  - [ ] Keyboard navigation
  - [ ] Color contrast 4.5:1
  - [ ] Sem erros axe DevTools
  - [ ] Screen reader friendly

✅ Mobile
  - [ ] Responsive ao 320px
  - [ ] Buttons > 48x48px
  - [ ] Readable text (16px+)
  - [ ] Sem horizontal scroll
```

---

## 🚀 Deploying

### 1. Atualizar URLs
```bash
# Procure por:
https://tagit.com.br
lovable.dev

# Atualize:
index.html - todas as URLs
src/components - WhatsApp number
```

### 2. Build Final
```bash
npm run build
# Verifica: dist/index.html
```

### 3. Deploy
```bash
# Upload dist/ para servidor
# Ou integre com Vercel/Netlify
```

### 4. Validações Pós-Deploy
```bash
✓ HTTPS habilitado
✓ Canonical apontando correto
✓ Schema.org validado
✓ Core Web Vitals checado
✓ Google Search Console configurado
```

---

## 📚 Referências Rápidas

- **Google Search Central**: https://developers.google.com/search
- **Schema.org**: https://schema.org/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Web Fundamentals**: https://developers.google.com/web/fundamentals
- **MDN Web Docs**: https://developer.mozilla.org/

---

**Last Updated**: January 15, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
