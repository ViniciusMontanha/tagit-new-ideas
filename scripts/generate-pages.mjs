import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { pageMetadata, getPageMetadata, structuredData } from "../src/lib/seo-data.js";
import { escapeHtml } from "../backend/src/contact-utils.js";

process.env.NODE_ENV = "production";
const { render: renderApp } = await import("../dist-ssr/entry-server.js");
const source = await readFile("dist/index.html", "utf8");
async function render(path) {
  const data = getPageMetadata(path);
  const schema = JSON.stringify(structuredData(path)).replace(/</g, "\\u003c");
  const content = await renderApp(path);
  return source.replace('<div id="root"></div>', `<div id="root">${content}</div>`).replace(/<!-- TAGIT_SEO_START -->[\s\S]*?<!-- TAGIT_SEO_END -->/, `
    <title>${escapeHtml(data.title)}</title>
    <meta name="description" content="${escapeHtml(data.description)}" />
    <meta name="robots" content="${data.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}" />
    <link rel="canonical" href="${data.canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(data.title)}" />
    <meta property="og:description" content="${escapeHtml(data.description)}" />
    <meta property="og:url" content="${data.canonical}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Tag It" />
    <meta property="og:image" content="https://tagit.com.br/tagit-compartilhamento-2026.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Tag It — Localização inteligente" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(data.title)}" />
    <meta name="twitter:description" content="${escapeHtml(data.description)}" />
    <meta name="twitter:image" content="https://tagit.com.br/tagit-compartilhamento-2026.png" />
    <meta name="twitter:image:alt" content="Tag It — Localização inteligente" />
    <script id="tagit-schema" type="application/ld+json">${schema}</script>`);
}
for (const path of [...Object.keys(pageMetadata), "/admin/carrossel"]) {
  if (path === "/") { await writeFile("dist/index.html", await render(path)); continue; }
  const file = `dist${path}.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, await render(path));
}
await writeFile("dist/404.html", await render("/404"));
const urls = Object.keys(pageMetadata).map(path => `  <url><loc>https://tagit.com.br${path}</loc></url>`).join("\n");
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log("Metadados de páginas e sitemap gerados.");
