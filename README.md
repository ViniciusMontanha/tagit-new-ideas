# Tag It — site institucional

Site público: https://tagit.com.br · Repositório: ViniciusMontanha/tagit-new-ideas.

## Desenvolvimento e validação

Use Node.js 22 e npm. O lockfile de referência é `package-lock.json`.

```sh
npm ci
npm run dev
npm run check
```

`check` executa o build, TypeScript, ESLint e os testes. O build obtém uma cópia dos banners públicos, gera os bundles de cliente/servidor e pré-renderiza todas as páginas públicas. A hidratação adiciona as interações ao HTML. O servidor de pré-renderização não é um serviço de produção: `dist-ssr` é apenas um artefato do build; a hospedagem serve `dist`.

Se a API de banners estiver indisponível durante o build, a cópia válida em `src/data/hero-slides.snapshot.json` mantém os destaques configurados. Depois da abertura da home, uma consulta limitada a cinco segundos busca alterações recentes, sem bloquear título e botões. Imagens têm espaço reservado. A rotação é opcional e começa desativada.

## Configuração pública

- `VITE_API_URL`: URL do backend (sem barra final). Produção configurada em `.env.production`; desenvolvimento em `.env.development`.
- `VITE_GOOGLE_ADS_LEAD_LABEL`: rótulo real da ação de conversão da conta AW-17854563274. Sem esse valor, o site não inventa uma conversão de Ads.
- `VITE_GOOGLE_ANALYTICS_ID`: propriedade GA4 opcional para os relatórios de eventos e Core Web Vitals.

As variáveis VITE são públicas. Nunca inserir chaves privadas nelas. Os eventos só são enviados com consentimento: `contact_open`, `whatsapp_click`, `generate_lead` e `web_vitals`. O lead é registrado depois da aceitação do formulário pela API. Nome, e-mail, telefone, empresa e mensagem não são parâmetros desses eventos. O link de WhatsApp registra intenção de contato, não prova que uma mensagem foi enviada.

## Publicação e recuperação

O commit ea24f15af0dde410dcfca397a8bb8c4db8071f23 é a referência anterior a esta revisão, já com o telefone atual. Os status do GitHub apresentam dois projetos Vercel: `website-revamp-pro` e `tagit-new-ideas`. O frontend chama a API pública `https://tagit-new-ideas-vincius-medeiros-s-projects.vercel.app`. Confirme no painel de Domains/Root Directory o vínculo de cada projeto antes de desativar ou excluir qualquer implantação.

O frontend usa `vercel.json` da raiz; o backend Express tem configuração própria em `backend/vercel.json`. Ambos devem passar após alterações compartilhadas. O domínio sem www é canônico e o www redireciona permanentemente. Não configurar um redirecionamento inverso no painel.

Antes de publicar: executar `npm run check`, verificar a prévia em larguras de celular/computador, testar teclado, navegação, abertura de biografias, políticas e estados de formulário. Depois: conferir os status dos dois projetos e as páginas públicas. Em caso de regressão, promover a implantação anterior no Vercel ou reverter o commit no GitHub, sem apagar o histórico.

## Conteúdo e operação

- Telefone, endereço e e-mail: `backend/src/contact-utils.js`.
- Segmentos: `src/data/segments.ts`.
- Fichas técnicas: `src/data/deviceTechnicalSheets.ts`; home resumida em `DeviceComparison`.
- O aplicativo próprio foi confirmado pela empresa. Links oficiais de lojas, versões mínimas, condições comerciais, imagens de implantações, depoimentos e resultados só devem ser publicados após confirmação/autorização. Não preencher esses itens com exemplos fictícios.
- O formulário encaminha assunto e campos empresariais opcionais à equipe. Nenhum teste automatizado usa o provedor real de e-mail.
- O limite de tentativas de contato/login é por instância. Verificar uma regra compartilhada no firewall Vercel para `/api/send-contact` e `/api/admin-session`; não afirmar proteção distribuída com base apenas no Map local.
- Configurar alertas de falha do backend e revisar os eventos `contact_delivery` por requestId. Não registrar o conteúdo de contatos em ferramentas de analytics.

## Checklist de aceite

1. Teclado: abrir/fechar Soluções; Tab não visita links ocultos; Escape fecha o menu; foco visível.
2. Quem Somos: cada biografia abre junto ao perfil; nenhuma sobreposição em 360, 390, 768 e 1440 px.
3. Contato: assunto correto, mensagens para campos inválidos, erro/retentativa e confirmação sem duplicar lead.
4. HTML: título, conteúdo principal e links disponíveis antes do JavaScript; nenhum erro de hidratação.
5. Cookies: rejeição impede medição; aceitação a habilita; retirada impede novos eventos e remove cookies conhecidos.
6. Produção: testar uma entrega real somente com destinatário de teste autorizado e conferir os eventos da Brevo; conferir a indexação no Search Console e os relatórios de desempenho quando houver acesso às contas.
