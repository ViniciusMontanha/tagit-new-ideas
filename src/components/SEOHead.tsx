import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetadata, structuredData } from "@/lib/seo-data.js";

export const SEOHead = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const data = getPageMetadata(pathname);
    document.title = data.title;
    const update = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
    update('meta[name="description"]', data.description);
    update('meta[name="robots"]', data.noindex ? "noindex, nofollow" : "index, follow");
    update('meta[property="og:title"]', data.title);
    update('meta[property="og:description"]', data.description);
    update('meta[property="og:url"]', data.canonical);
    update('meta[name="twitter:title"]', data.title);
    update('meta[name="twitter:description"]', data.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", data.canonical);
    const schema = document.getElementById("tagit-schema");
    if (schema) schema.textContent = JSON.stringify(structuredData(pathname));
  }, [pathname]);
  return null;
};
