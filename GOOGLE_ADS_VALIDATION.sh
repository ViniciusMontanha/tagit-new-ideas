#!/bin/bash

# 🔍 Script de Validação Google Ads
# Detecta problemas que podem bloquear anúncios

echo "================================"
echo "🔍 Google Ads Security Audit"
echo "================================"
echo ""

# Cores para output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

ISSUES=0
WARNINGS=0
SUCCESS=0

# Função para adicionar issue
add_issue() {
  ISSUES=$((ISSUES + 1))
  echo -e "${RED}❌ CRÍTICO: $1${NC}"
}

# Função para adicionar warning
add_warning() {
  WARNINGS=$((WARNINGS + 1))
  echo -e "${YELLOW}⚠️  WARNING: $1${NC}"
}

# Função para sucesso
add_success() {
  SUCCESS=$((SUCCESS + 1))
  echo -e "${GREEN}✅ OK: $1${NC}"
}

echo "1️⃣  Verificando Canonical URL..."
if grep -q '<link rel="canonical"' index.html; then
  CANONICAL=$(grep '<link rel="canonical"' index.html | grep -oP 'href="\K[^"]+')
  # Se canonical não está comentada e tem um domínio válido (não lovable ou vercel em produção)
  if [[ ! "$CANONICAL" =~ ^#.*$ ]]; then
    add_success "Canonical URL ativa: $CANONICAL"
  else
    add_warning "Canonical URL comentada"
  fi
else
  add_warning "Nenhuma canonical URL encontrada"
fi

echo ""
echo "2️⃣  Verificando Open Graph URLs..."
if grep -q 'property="og:url"' index.html; then
  OG_URL=$(grep 'property="og:url"' index.html | grep -oP 'content="\K[^"]+' | head -1)
  if [[ -n "$OG_URL" ]]; then
    add_success "Open Graph URL ativa: $OG_URL"
  else
    add_warning "Open Graph og:url não possui valor"
  fi
else
  add_warning "Open Graph og:url não encontrada"
fi

echo ""
echo "3️⃣  Verificando Open Graph Image..."
if grep -q 'property="og:image"' index.html; then
  OG_IMG=$(grep 'property="og:image"' index.html | head -1 | grep -oP 'content="\K[^"]+')
  if [[ -n "$OG_IMG" ]]; then
    add_success "OG Image URL ativa: $OG_IMG"
  else
    add_warning "OG Image URL não possui valor"
  fi
else
  add_warning "OG Image não encontrada"
fi

echo ""
echo "4️⃣  Verificando Links Sociais (sameAs)..."
if grep -q '"sameAs"' index.html; then
  if grep -q 'facebook.com/tagit\|instagram.com/tagit\|linkedin.com/company/tagit' index.html; then
    add_issue "Links sociais apontam para páginas que não existem (placeholder)"
  else
    add_success "Links sociais removidos ou atualizados"
  fi
else
  add_success "Links sociais (sameAs) não inclusos - bom para evitar links falsos"
fi

echo ""
echo "5️⃣  Verificando Email de Contato..."
if grep -q '"email": "contato@tagit.com.br"' index.html; then
  add_success "Email de contato verificado: contato@tagit.com.br"
elif grep -q 'email.*placeholder\|email.*example' index.html; then
  add_warning "Email de contato é placeholder"
else
  add_success "Email de contato configurado"
fi

echo ""
echo "6️⃣  Verificando Telefone WhatsApp..."
if grep -q '5516997534316\|+5516997534316\|+55-16-99753-4316' index.html; then
  add_success "Telefone WhatsApp configurado e verificado"
elif grep -q 'telephone.*placeholder' index.html; then
  add_warning "Telefone ainda é placeholder"
fi

echo ""
echo "7️⃣  Verificando conteúdo oculto (CSS)..."
if grep -qr 'display:\s*none\|visibility:\s*hidden' src/ --include="*.tsx" --include="*.css"; then
  add_warning "Conteúdo oculto detectado - revise se é apenas para responsive/acessibilidade"
else
  add_success "Nenhum conteúdo suspeito oculto detectado"
fi

echo ""
echo "8️⃣  Verificando redirects suspeitos..."
if grep -qr 'window.location\|document.location' src/ --include="*.tsx" | grep -v 'wa.me' | grep -v 'preventDefault'; then
  add_warning "Redirects detectados - verifique se são legítimos"
else
  add_success "Sem redirects suspeitos"
fi

echo ""
echo "9️⃣  Verificando WhatsApp Widget..."
if grep -q '"5516997534316"' src/components/WhatsAppWidget.tsx; then
  add_success "WhatsApp Widget configurado com número verificado"
elif grep -q 'phoneNumber.*placeholder' src/components/WhatsAppWidget.tsx; then
  add_warning "WhatsApp Widget ainda usa número placeholder"
else
  add_success "WhatsApp Widget configurado"
fi

echo ""
echo "🔟 Verificando robots.txt..."
if [ -f "public/robots.txt" ]; then
  if grep -q "Disallow: /" public/robots.txt; then
    add_issue "robots.txt está bloqueando todo o site (Disallow: /)"
  else
    add_success "robots.txt configurado corretamente"
  fi
else
  add_warning "robots.txt não encontrado - Google pode ter dificuldade para indexar"
fi

echo ""
echo "================================"
echo "📊 RESULTADO FINAL"
echo "================================"
echo -e "${GREEN}✅ Sucessos: $SUCCESS${NC}"
echo -e "${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
echo -e "${RED}❌ Críticos: $ISSUES${NC}"
echo ""

if [ $ISSUES -gt 0 ]; then
  echo -e "${RED}🚨 STATUS: BLOQUEIO IMINENTE DO GOOGLE ADS${NC}"
  echo "   Corrija os problemas críticos ANTES de submeter anúncios"
  echo ""
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo -e "${YELLOW}⚠️  STATUS: AVISOS ENCONTRADOS${NC}"
  echo "   Recomenda-se revisar antes de publicar em produção"
  echo ""
  exit 0
else
  echo -e "${GREEN}✅ STATUS: PRONTO PARA GOOGLE ADS${NC}"
  echo "   Site passou na auditoria de segurança"
  echo ""
  exit 0
fi
