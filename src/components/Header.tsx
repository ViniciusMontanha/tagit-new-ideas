import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ContactModal } from "@/components/ContactModal";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const menuLinks = [
    { href: "#empresas", label: "Para Empresas", ariaLabel: "Ir para seção Para Empresas" },
    { href: "#para-voce", label: "Para Você", ariaLabel: "Ir para seção Para Pessoas Físicas" },
    { href: "#recursos", label: "Recursos", ariaLabel: "Ir para seção de Recursos" },
  ];

  // Hook para detectar seção ativa ao scrollar
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuLinks.map(link => link.href.substring(1)); // Remove o #
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Se a seção está visível na viewport (considerando o header fixo)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Detectar também ao clicar em um link
    const handleHashChange = () => {
      setActiveSection(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

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
              className="flex items-center transition-opacity hover:opacity-80 flex-shrink-0"
              aria-label="Tag It - Ir para a página inicial"
              title="Tag It - Rastreamento de Ativos"
            >
              <img 
                src={logo} 
                alt="Tag It - Rastreamento Inteligente de Ativos"
                className="h-[104px] w-auto object-contain"
                loading="eager"
              />
            </a>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {menuLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={`text-sm font-semibold transition-all duration-200 relative pb-2 ${
                    activeSection === link.href 
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-label={link.ariaLabel}
                  aria-current={activeSection === link.href ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Right Section - E-mail, Demo, Login */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="mailto:contato@tagit.com.br" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 text-primary font-semibold text-xs hover:shadow-[0_0_12px_hsl(198_100%_50%_/_0.15)] transition-all duration-200"
                aria-label="Enviar e-mail para contato@tagit.com.br"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="hidden lg:inline">contato@tagit.com.br</span>
              </a>
              <Button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm"
                aria-label="Abrir formulário de contato"
              >
                Solicitar Demo
              </Button>
              <Button 
                variant="ghost" 
                className="text-sm font-semibold text-foreground hover:text-primary hidden lg:flex"
                aria-label="Acessar área de login"
                asChild
              >
                <a href="https://web.iatag.com.br/login">Login</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                  aria-label="Abrir menu de navegação"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  {/* Header do Menu Mobile */}
                  <div className="p-4 border-b border-border">
                    <span className="font-semibold text-foreground">Menu</span>
                  </div>

                  {/* Links do Menu Mobile */}
                  <div className="flex flex-col gap-2 p-4">
                    {menuLinks.map((link) => (
                      <a 
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                          activeSection === link.href
                            ? "bg-primary/20 text-primary border-l-2 border-primary"
                            : "text-foreground hover:bg-primary/10 hover:text-primary"
                        }`}
                        aria-label={link.ariaLabel}
                        aria-current={activeSection === link.href ? "page" : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                    <a 
                      href="mailto:contato@tagit.com.br"
                      className="px-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary font-semibold flex items-center gap-2 hover:border-primary/40 transition-colors"
                      aria-label="Enviar e-mail para contato@tagit.com.br"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      contato@tagit.com.br
                    </a>
                  </div>

                  {/* Buttons do Menu Mobile */}
                  <div className="mt-auto p-4 border-t border-border flex flex-col gap-2">
                    <Button 
                      onClick={() => {
                        setIsContactModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                      aria-label="Abrir formulário de contato"
                    >
                      Solicitar Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full font-semibold"
                      aria-label="Acessar área de login"
                      asChild
                    >
                      <a href="/login">Login</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
