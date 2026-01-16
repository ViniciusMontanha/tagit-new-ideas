import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já aceitou cookies
    const cookieConsent = localStorage.getItem("tagit-cookie-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("tagit-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("tagit-cookie-consent", "dismissed");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
      role="region"
      aria-label="Aviso de cookies"
      aria-live="polite"
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Texto do aviso */}
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">
              Utilizamos Cookies
            </h3>
            <p className="text-sm text-muted-foreground">
              Usamos cookies para melhorar sua experiência no site, personalizar conteúdo e analisar tráfego. 
              Ao continuar navegando, você concorda com nossa 
              <a href="#" onClick={(e) => { e.preventDefault(); }} className="text-primary hover:underline ml-1">
                Política de Privacidade
              </a>
              .
            </p>
          </div>

          {/* Botões */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDismiss}
              aria-label="Rejeitar cookies"
              className="flex-1 md:flex-none"
            >
              Rejeitar
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 md:flex-none"
              aria-label="Aceitar cookies"
            >
              Aceitar
            </Button>
            <button
              onClick={handleDismiss}
              className="hidden md:flex items-center justify-center p-1.5 rounded-md hover:bg-accent transition-colors"
              aria-label="Fechar aviso de cookies"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
