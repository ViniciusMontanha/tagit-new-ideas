import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Empresas from "./pages/Empresas";
import ParaVoce from "./pages/ParaVoce";
import AdminCarousel from "./pages/AdminCarousel";
import Seguimento from "./pages/Seguimento";
import NotFound from "./pages/NotFound";
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
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quem-somos" element={<About />} />
              <Route path="/para-empresas" element={<Empresas />} />
              <Route path="/para-voce" element={<ParaVoce />} />
              <Route path="/seguimento" element={<Seguimento />} />
              <Route path="/seguimento/:slug" element={<Seguimento />} />
              <Route path="/admin/carrossel" element={<AdminCarousel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PrivacyPolicyProvider>
    </QueryClientProvider>
  );
};

export default App;
