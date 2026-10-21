import { readFile, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";
import { publicSlidesFromRows, normalizePublicSlide } from "../src/lib/hero-content.js";
const filename = new URL("../src/data/hero-slides.snapshot.json", import.meta.url);
const saved = JSON.parse(await readFile(filename, "utf8"));
const env = loadEnv("production", process.cwd(), "VITE_");
const api = (process.env.VITE_API_URL || env.VITE_API_URL || "").replace(/\/$/, "");
let slides = saved.map(normalizePublicSlide);
if (api) {
  try {
    const response = await fetch(`${api}/api/hero-slides`, { signal: AbortSignal.timeout(7000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const fresh = publicSlidesFromRows((await response.json()).slides);
    if (!fresh.length) throw new Error("Empty slides");
    slides = fresh;
    console.log("Banners públicos atualizados para pré-renderização.");
  } catch { console.warn("API de banners indisponível: usando a última cópia publicada válida."); }
}
if (!slides.length) throw new Error("Nenhum banner válido para publicar.");
await writeFile(filename, JSON.stringify(slides, null, 2) + "\n");
