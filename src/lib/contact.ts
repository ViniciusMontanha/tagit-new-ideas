export { COMPANY, companyWhatsApp, normalizeBrazilianPhone, isValidBrazilianPhone } from "../../backend/src/contact-utils.js";

import { companyWhatsApp } from "../../backend/src/contact-utils.js";

// Corrige também os contatos antigos já salvos no carrossel remoto.
export function normalizeCompanyLink(href: string): string {
  try {
    const url = new URL(href, "https://tagit.com.br");
    if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) {
      const number = (url.searchParams.get("phone") || url.pathname.slice(1)).replace(/\D/g, "");
      if (["5516991295203", "5516996403745"].includes(number)) {
        return companyWhatsApp(url.searchParams.get("text") || undefined);
      }
    }
    return ["https:", "http:"].includes(url.protocol) ? href : "/#contato";
  } catch {
    return "/#contato";
  }
}
