// Uso: node scripts/generate-brand-assets.mjs /caminho/para/matriz.png
// Requer as dependências de backend instaladas. A matriz original fica fora do site.
import { createRequire } from "node:module";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const require = createRequire(new URL("../backend/package.json", import.meta.url));
const sharp = require("sharp");
const source = process.argv[2];
if (!source) throw new Error("Informe a matriz PNG vertical da Tag It.");
const metadata = await sharp(source).metadata();
if (metadata.width !== 10823 || metadata.height !== 12440) {
  throw new Error("Esta configuração de recortes requer a matriz original de 10823 × 12440 pixels.");
}
const root = fileURLToPath(new URL("../", import.meta.url));
const outputs = [];
async function save(pipeline, path) {
  const info = await pipeline.toFile(root + path);
  outputs.push({ path, width: info.width, height: info.height, bytes: (await stat(root + path)).size });
}
// Recortes entre as faixas transparentes: símbolo, nome e assinatura.
// Os elementos originais são apenas redimensionados e posicionados; não são redesenhados.
async function section(top, height) {
  const cropped = await sharp(source).extract({ left: 0, top, width: 10823, height }).png().toBuffer();
  return sharp(cropped).trim().png().toBuffer();
}
const symbol = await section(0, 8000);
const name = await section(8100, 3250);
const tagline = await section(11500, 940);
const horizontal = await sharp({ create: { width: 900, height: 320, channels: 4, background: "#00000000" } })
  .composite([
    { input: await sharp(symbol).resize({ height: 300 }).png().toBuffer(), left: 10, top: 10 },
    { input: await sharp(name).resize({ width: 560 }).png().toBuffer(), left: 306, top: 44 },
    { input: await sharp(tagline).resize({ width: 560 }).png().toBuffer(), left: 306, top: 234 },
  ]).png().toBuffer();
for (const width of [225, 450, 675]) {
  await save(sharp(horizontal).resize({ width }).webp({ quality: 92, alphaQuality: 100, effort: 6 }), `src/assets/logo-${width}.webp`);
}
await save(sharp(symbol).resize(48, 48, { fit: "contain", background: "#00000000" }).png({ compressionLevel: 9 }), "public/favicon-48.png");
await save(sharp(symbol).resize(148, 148, { fit: "contain", background: "#ffffff" }).extend({ top: 16, bottom: 16, left: 16, right: 16, background: "#ffffff" }).png({ compressionLevel: 9 }), "public/apple-touch-icon.png");
// Mantém a URL pública usada no cadastro da organização, agora com o logo completo.
await save(sharp(source).resize(512, 512, { fit: "contain", background: "#ffffff" }).flatten({ background: "#ffffff" }).png({ compressionLevel: 9 }), "public/favicon.png");
const socialLogo = await sharp(source).resize({ height: 510 }).png().toBuffer();
const social = sharp({ create: { width: 1200, height: 630, channels: 3, background: "#ffffff" } })
  .composite([{ input: socialLogo, gravity: "centre" }]);
await save(social.clone().png({ compressionLevel: 9 }), "public/tagit-compartilhamento-2026.png");
await save(social.clone().png({ compressionLevel: 9 }), "public/og-image.png");
console.table(outputs);
