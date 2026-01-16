import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-soft"
        role="banner"
        aria-label="Cabeçalho principal do site"
      >
        <div className="container mx-auto px-4">
          <nav 
            className="flex items-center justify-between h-24"
            role="navigation"
            aria-label="Navegação principal"
          >
            {/* Logo - Link para Home */}
            <a 
              href="/"
              className="flex items-center transition-opacity hover:opacity-80"
              aria-label="Tag It - Ir para a página inicial"
              title="Tag It - Rastreamento de Ativos"
            >
              <img 
                src={logo} 
                alt="Tag It - Rastreamento Inteligente de Ativos"
                className="h-24 w-auto object-contain"
                loading="eager"
              />
            </a>

            {/* Menu de Navegação Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {/* Links Internos com âncoras semânticas */}
              <a 
                href="#empresas" 
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                aria-label="Ir para seção Para Empresas"
              >
                Para Empresas
              </a>
              <a 
                href="#para-voce" 
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                aria-label="Ir para seção Para Pessoas Físicas"
              >
                Para Você
              </a>
              <a 
                href="#features" 
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                aria-label="Ir para seção de Features"
              >
                Features
              </a>
              <Button 
                onClick={() => setIsContactModalOpen(true)}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                variant="ghost"
                aria-label="Abrir formulário de contato"
              >
                Solicitar Demo
              </Button>

              <Button 
                variant="ghost" 
                className="text-sm font-semibold text-primary hover:text-primary/80"
                aria-label="Acessar área de login"
                asChild
              >
                <a href="/login">Login</a>
              </Button>
            </div>

            {/* Menu Mobile será adicionado em versão completa */}
          </nav>
        </div>
      </header>

      {/* Modal de Contato */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onOpenChange={setIsContactModalOpen} 
      />
    </>
  );
};
