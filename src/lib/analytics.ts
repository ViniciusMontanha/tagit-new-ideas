import { getConsent, GOOGLE_ADS_ID } from "@/lib/consent";

type ContactEvent = "contact_open" | "whatsapp_click" | "generate_lead";
const sentLeads = new Set<string>();
// Only labels controlled by the site are sent, never form fields, query strings or WhatsApp messages.
export function trackContactEvent(event: ContactEvent, source = "Site", requestId?: string) {
  if (typeof window === "undefined" || getConsent() !== "accepted") return;
  if (event === "generate_lead" && requestId) {
    if (sentLeads.has(requestId)) return;
    sentLeads.add(requestId);
  }
  window.gtag?.("event", event, { contact_source: source.slice(0, 80), page_location: `${location.origin}${location.pathname}` });
  const label = import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL;
  if (event === "generate_lead" && label) {
    window.gtag?.("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}`, transaction_id: requestId });
  }
}
export function initializeContactTracking() {
  document.addEventListener("click", event => {
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!anchor) return;
    try {
      const url = new URL(anchor.href);
      if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) trackContactEvent("whatsapp_click", anchor.dataset.contactSource || "Site");
    } catch { /* Ignore malformed links without blocking navigation. */ }
  });
}

