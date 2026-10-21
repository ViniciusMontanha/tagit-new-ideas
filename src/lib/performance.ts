import { getConsent } from "./consent";

export async function initializePerformanceTracking() {
  // Collect only after consent; no report is sent after consent is withdrawn.
  if (getConsent() !== "accepted") return;
  const { onCLS, onINP, onLCP } = await import("web-vitals");
  const report = ({ name, value, rating }: { name: string; value: number; rating: string }) => {
    if (getConsent() !== "accepted") return;
    window.gtag?.("event", "web_vitals", { metric_name: name, metric_value: name === "CLS" ? Math.round(value * 1000) / 1000 : Math.round(value), metric_rating: rating, page_path: location.pathname, page_location: `${location.origin}${location.pathname}` });
  };
  onCLS(report); onINP(report); onLCP(report);
}
