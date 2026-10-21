import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SEOHead } from "./components/SEOHead";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { CookieBanner } from "./components/CookieBanner";
const About = lazy(() => import("./pages/About"));
const Empresas = lazy(() => import("./pages/Empresas"));
const ParaVoce = lazy(() => import("./pages/ParaVoce"));
const AdminCarousel = lazy(() => import("./pages/AdminCarousel"));
const Seguimento = lazy(() => import("./pages/Seguimento"));
const Devices = lazy(() => import("./pages/Devices"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ClientArea = lazy(() => import("./pages/ClientArea"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    let id = hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* An invalid fragment must not interrupt navigation. */ }
    const reveal = () => { const element = document.getElementById(id); if (element) { element.scrollIntoView(); return true; } return false; };
    if (reveal()) return;
    const observer = new MutationObserver(() => { if (reveal()) observer.disconnect(); });
    observer.observe(document.getElementById("root")!, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);
    return () => { observer.disconnect(); clearTimeout(timeout); };
  }, [pathname, hash]);
  return <TooltipProvider><Toaster /><Sonner /><WhatsAppWidget /><CookieBanner /><SEOHead /><Suspense fallback={<main id="conteudo" className="p-8 pt-28" role="status">Carregando página...</main>}><Routes>
    <Route path="/" element={<Index />} /><Route path="/quem-somos" element={<About />} /><Route path="/para-empresas" element={<Empresas />} /><Route path="/para-voce" element={<ParaVoce />} /><Route path="/segmento" element={<Seguimento />} /><Route path="/segmento/:slug" element={<Seguimento />} /><Route path="/seguimento" element={<Seguimento />} /><Route path="/seguimento/:slug" element={<Seguimento />} /><Route path="/dispositivos" element={<Devices />} /><Route path="/privacidade" element={<Privacy />} /><Route path="/area-do-cliente" element={<ClientArea />} /><Route path="/admin/carrossel" element={<AdminCarousel />} /><Route path="*" element={<NotFound />} />
  </Routes></Suspense></TooltipProvider>;
}
