import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ContactModal } from "@/components/ContactModal";
import logo from "@/assets/logo.png";
import { Menu, Info, Briefcase, Users, Zap, Sparkles, Mail, LogIn } from "lucide-react";

export const Header = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const menuLinks = [
    { href: "/quem-somos", label: "Quem Somos", ariaLabel: "Ir para página Quem Somos da Tag It", isExternal: true, icon: Info },
    { href: "#empresas", label: "Para Empresas", ariaLabel: "Ir para seção Para Empresas", isExternal: false, icon: Briefcase },
    { href: "#para-voce", label: "Para Você", ariaLabel: "Ir para seção Para Pessoas Físicas", isExternal: false, icon: Users },
    { href: "#recursos", label: "Recursos", ariaLabel: "Ir para seção de Recursos", isExternal: false, icon: Zap },
  ];

  // Função para obter o href correto baseado na página atual
  const getLinkHref = (link: typeof menuLinks[0]) => {
    if (link.isExternal) {
      return link.href;
    }
    // Se estiver fora da página principal, adiciona o prefixo "/"
    if (window.location.pathname !== "/") {
      return "/" + link.href;
    }
    return link.href;
  };

  // Hook para detectar seção ativa ao scrollar
  useEffect(() => {
    const handleScroll = () => {
      // Filtrar apenas os links que começam com # (âncoras internas)
      const internalLinks = menuLinks.filter(link => link.href.startsWith("#"));
      const sections = internalLinks.map(link => link.href.substring(1)); // Remove o #
      
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
    
    // Detectar mudança de página
    const handlePathChange = () => {
      if (window.location.pathname !== "/") {
        setActiveSection("");
      }
    };
    window.addEventListener("popstate", handlePathChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handlePathChange);
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
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {menuLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a 
                    key={link.href}
                    href={getLinkHref(link)}
                    className={`group flex items-center gap-2 font-semibold transition-all duration-200 relative ${
                      activeSection === link.href || (link.isExternal && window.location.pathname === link.href)
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    }`}
                    aria-label={link.ariaLabel}
                    aria-current={activeSection === link.href ? "page" : undefined}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" />}
                    <span className="relative text-sm pb-0.5">
                      {link.label}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        activeSection === link.href || (link.isExternal && window.location.pathname === link.href)
                          ? "w-full" 
                          : "w-0 group-hover:w-full"
                      }`} />
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Desktop Right Section - E-mail, Demo, Login */}
            <div className="hidden md:flex items-center gap-3">
              <a 
                href="mailto:contato@tagit.com.br" 
                className="group flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Enviar e-mail para contato@tagit.com.br"
              >
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110 duration-300" />
                <span className="hidden lg:inline text-sm font-medium">contato@tagit.com.br</span>
              </a>
              <Button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:shadow-primary/40 font-semibold text-sm transition-all duration-300 flex items-center gap-2"
                aria-label="Abrir formulário de contato"
              >
                <Sparkles className="w-4 h-4" />
                Solicitar Demo
              </Button>
              <Button 
                variant="outline" 
                className="text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center gap-2"
                aria-label="Acessar área de login"
                asChild
              >
                <a href="https://web.iatag.com.br/login" target="_blank" rel="noopener noreferrer">
                  <LogIn className="w-4 h-4" />
                  Login
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden hover:bg-primary/10 transition-colors duration-200"
                  aria-label="Abrir menu de navegação"
                >
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <div className="flex flex-col h-full bg-background">
                  {/* Header do Menu Mobile */}
                  <div className="p-4 border-b border-border">
                    <span className="font-semibold text-foreground">Navegação</span>
                  </div>

                  {/* Links do Menu Mobile */}
                  <div className="flex flex-col gap-3 p-4">
                    {menuLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <a 
                          key={link.href}
                          href={getLinkHref(link)}
                          onClick={() => setIsMenuOpen(false)}
                          className={`group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            activeSection === link.href || (link.isExternal && window.location.pathname === link.href)
                              ? "bg-primary/20 text-primary border-l-2 border-primary"
                              : "text-foreground hover:bg-primary/10 hover:text-primary"
                          }`}
                          aria-label={link.ariaLabel}
                          aria-current={activeSection === link.href ? "page" : undefined}
                        >
                          {IconComponent && <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" />}
                          {link.label}
                        </a>
                      );
                    })}
                    <a 
                      href="mailto:contato@tagit.com.br"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-semibold transition-all duration-200"
                      aria-label="Enviar e-mail para contato@tagit.com.br"
                    >
                      <Mail className="w-4 h-4" />
                      contato@tagit.com.br
                    </a>
                  </div>

                  {/* Buttons do Menu Mobile */}
                  <div className="mt-auto p-4 border-t border-border flex flex-col gap-3">
                    <Button 
                      onClick={() => {
                        setIsContactModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg font-semibold transition-all duration-300 flex items-center gap-2"
                      aria-label="Abrir formulário de contato"
                    >
                      <Sparkles className="w-4 h-4" />
                      Solicitar Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
                      aria-label="Acessar área de login"
                      asChild
                    >
                      <a href="https://web.iatag.com.br/login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        Login
                      </a>
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
