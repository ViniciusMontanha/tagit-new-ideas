#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${PROJECT_ROOT}"

SUPABASE_DB_HOST="db.qgmbkapiegbidektnlab.supabase.co"
SUPABASE_DB_PORT="5432"
SUPABASE_DB_NAME="postgres"
SUPABASE_DB_USER="postgres"

SKIP_SERVICE_ROLE="false"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-service-role)
      SKIP_SERVICE_ROLE="true"
      shift
      ;;
    *)
      echo "Argumento inválido: $1"
      echo "Uso: ./scripts/vercel-set-supabase-db-env.sh [--skip-service-role]"
      exit 1
      ;;
  esac
done

if [[ ! -f ".vercel/project.json" ]]; then
  echo "Projeto não está linkado ao Vercel neste diretório."
  echo "Execute: vercel link"
  exit 1
fi

if [[ -z "${SUPABASE_DB_PASSWORD:-}" ]]; then
  read -r -s -p "Digite a senha do banco Supabase (não será exibida): " SUPABASE_DB_PASSWORD
  echo
fi

if [[ "${SKIP_SERVICE_ROLE}" == "false" && -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]]; then
  read -r -s -p "Digite a SUPABASE_SERVICE_ROLE_KEY (não será exibida): " SUPABASE_SERVICE_ROLE_KEY
  echo
fi

if [[ -z "${SUPABASE_DB_PASSWORD}" ]]; then
  echo "Senha vazia. Abortando."
  exit 1
fi

if [[ "${SKIP_SERVICE_ROLE}" == "false" && -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]]; then
  echo "SUPABASE_SERVICE_ROLE_KEY vazia. Abortando."
  exit 1
fi

DATABASE_URL="postgresql://${SUPABASE_DB_USER}:${SUPABASE_DB_PASSWORD}@${SUPABASE_DB_HOST}:${SUPABASE_DB_PORT}/${SUPABASE_DB_NAME}?sslmode=require"

echo "Configurando variáveis no Vercel (development, preview, production)..."
for ENVIRONMENT in development preview production; do
  echo "- Ambiente: ${ENVIRONMENT}"
  printf '%s' "${SUPABASE_DB_PASSWORD}" | vercel env add SUPABASE_DB_PASSWORD "${ENVIRONMENT}" --force >/dev/null
  printf '%s' "${DATABASE_URL}" | vercel env add DATABASE_URL "${ENVIRONMENT}" --force >/dev/null
  if [[ "${SKIP_SERVICE_ROLE}" == "false" ]]; then
    printf '%s' "${SUPABASE_SERVICE_ROLE_KEY}" | vercel env add SUPABASE_SERVICE_ROLE_KEY "${ENVIRONMENT}" --force >/dev/null
  fi
done

echo "Variáveis configuradas com sucesso no Vercel."
