import React, { Suspense, lazy } from "react";
import { SEOHead } from "./components/SEOHead";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
const About = lazy(() => import("./pages/About"));
const Empresas = lazy(() => import("./pages/Empresas"));
const ParaVoce = lazy(() => import("./pages/ParaVoce"));
const AdminCarousel = lazy(() => import("./pages/AdminCarousel"));
const Seguimento = lazy(() => import("./pages/Seguimento"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { CookieBanner } from "./components/CookieBanner";
import { PrivacyPolicyProvider } from "./contexts/PrivacyPolicyContext";

const queryClient = new QueryClient();

const App = () => {
  // Definir idioma do documento
  React.useEffect(() => {
    document.documentElement.lang = 'pt-BR';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PrivacyPolicyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          {/* Widget de contato WhatsApp - globalmente disponível */}
          <WhatsAppWidget />

          {/* Banner de Cookies - globalmente disponível */}
          <CookieBanner />

          <BrowserRouter>
            <SEOHead />
            <Suspense fallback={<main className="p-8 pt-28" role="status">Carregando página...</main>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quem-somos" element={<About />} />
              <Route path="/para-empresas" element={<Empresas />} />
              <Route path="/para-voce" element={<ParaVoce />} />
              <Route path="/seguimento" element={<Seguimento />} />
              <Route path="/seguimento/:slug" element={<Seguimento />} />
              <Route path="/segmento" element={<Seguimento />} />
              <Route path="/segmento/:slug" element={<Seguimento />} />
              <Route path="/admin/carrossel" element={<AdminCarousel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </PrivacyPolicyProvider>
    </QueryClientProvider>
  );
};

export default App;
