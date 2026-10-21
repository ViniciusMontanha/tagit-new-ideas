const STORAGE_KEY = "tagit-cookie-consent";
export const GOOGLE_ADS_ID = "AW-17854563274";
export const CONSENT_EVENT = "tagit:consent-preferences";
type Consent = "accepted" | "rejected" | null;
let currentChoice: Consent | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): Consent {
  if (currentChoice !== undefined) return currentChoice;
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" ? "accepted" : ["rejected", "dismissed"].includes(value || "") ? "rejected" : null;
  } catch { return null; }
}

let initialized = false;
let configured = false;
const permissions = (accepted: boolean) => ({
  ad_storage: accepted ? "granted" : "denied",
  analytics_storage: accepted ? "granted" : "denied",
  ad_user_data: accepted ? "granted" : "denied",
  ad_personalization: accepted ? "granted" : "denied",
});

function applyConsent(accepted: boolean) {
  window.gtag?.("consent", "update", permissions(accepted));
  if (accepted && !configured) {
    configured = true;
    window.gtag?.("js", new Date());
    window.gtag?.("config", GOOGLE_ADS_ID, { page_location: `${location.origin}${location.pathname}` });
    const analyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    if (analyticsId) window.gtag?.("config", analyticsId, { page_location: `${location.origin}${location.pathname}` });
    void import("./performance").then(module => module.initializePerformanceTracking());
    const script = document.createElement("script");
    script.id = "tagit-google-ads";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(script);
  }
}

export function initializeConsent() {
  if (initialized) return;
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  // O formato Arguments é o contrato da fila gtag.js documentado pelo Google.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag("consent", "default", permissions(false));
  if (getConsent() === "accepted") applyConsent(true);
}

export function setConsent(value: Exclude<Consent, null>) {
  currentChoice = value;
  try { localStorage.setItem(STORAGE_KEY, value); } catch { /* Respeita a escolha nesta página mesmo sem armazenamento. */ }
  applyConsent(value === "accepted");
  if (value === "rejected") {
    // Remove somente cookies conhecidos de medição/publicidade deste domínio.
    for (const entry of document.cookie.split(";")) {
      const name = entry.split("=")[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl_)/.test(name)) continue;
      for (const domain of ["", location.hostname, `.${location.hostname}`, ...(location.hostname.endsWith(".tagit.com.br") ? ["tagit.com.br", ".tagit.com.br"] : [])]) {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ""}`;
      }
    }
    // Uma tag já executada não pode ser descarregada. Recarregar impede novos pedidos.
    if (configured) location.reload();
  }
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
