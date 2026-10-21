import { companyWhatsApp } from "../../backend/src/contact-utils.js";

export function normalizeHeroLink(href) {
  try {
    const url = new URL(href, "https://tagit.com.br");
    if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) {
      const number = (url.searchParams.get("phone") || url.pathname.slice(1)).replace(/\D/g, "");
      if (["5516991295203", "5516996403745", "5516997493996", "5516997021741"].includes(number)) return companyWhatsApp(url.searchParams.get("text") || undefined);
    }
    return ["https:", "http:"].includes(url.protocol) ? href : "/#contato";
  } catch { return "/#contato"; }
}
export function normalizePublicSlide(slide) {
  const title = slide.title.replace("Localize e proteja seus ativos em segundos", "Mais visibilidade sobre seus ativos").replace("Tenha visibilidade total dos seus ativos pessoais na plataforma", "Consulte a localização dos seus ativos").replace("Controle seus ativos sem instalação!", "Localização com instalação simples").replace("Nossas tags tem", "Nossas tags têm");
  const description = slide.description.replace("Fixou, começou a localizar. Tecnologia compacta de 3cm, pronto para uso, ideal para reduzir perdas e melhorar a gestão operacional.", "Fixe a tag, ative o dispositivo e consulte a localização disponível. A equipe orienta a configuração e avalia com você as condições de uso.");
  const primaryCtaHref = normalizeHeroLink(slide.primaryCtaHref);
  const secondaryCtaHref = normalizeHeroLink(slide.secondaryCtaHref);
  const label = (href, text) => /https:\/\/(wa.me|api.whatsapp.com|web.whatsapp.com)\//.test(href) ? "Falar pelo WhatsApp" : text;
  let image = slide.image;
  try {
    const url = new URL(image, "https://tagit.com.br");
    if (!["https:", "http:"].includes(url.protocol)) throw new Error("Invalid image URL");
    const versions = url.searchParams.getAll("v");
    if (versions.length) { url.searchParams.delete("v"); url.searchParams.set("v", versions.at(-1)); }
    image = image.startsWith("/") ? url.pathname + url.search : url.toString();
  } catch { image = "/carousel/slide-1-1775002282608-black-tag-sfundo.webp"; }
  return { ...slide, title, description, image, imageAlt: /GPS|banheiros químico/i.test(slide.imageAlt) ? title : slide.imageAlt, primaryCtaHref, secondaryCtaHref, primaryCtaLabel: label(primaryCtaHref, slide.primaryCtaLabel), secondaryCtaLabel: label(secondaryCtaHref, slide.secondaryCtaLabel) };
}
export function publicSlidesFromRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(row => ({ id: row.id, title: row.title, description: row.description, image: row.image, imageAlt: row.image_alt, primaryCtaLabel: row.primary_cta_label, primaryCtaHref: row.primary_cta_href, secondaryCtaLabel: row.secondary_cta_label, secondaryCtaHref: row.secondary_cta_href }))
    .filter(slide => Object.values(slide).every(value => typeof value === "string") && slide.id && slide.title && slide.image).map(normalizePublicSlide);
}
