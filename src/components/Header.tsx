import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Tag It" className="h-10 w-10" />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight">Tag It</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide leading-tight">Localização Inteligente</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#recursos" className="text-sm font-medium hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#empresas" className="text-sm font-medium hover:text-primary transition-colors">
              Para Sua Empresa
            </a>
            <a href="#solucoes" className="text-sm font-medium hover:text-primary transition-colors">
              Soluções
            </a>
          </div>

          <Button className="shadow-blue">
            Fale Conosco
          </Button>
        </nav>
      </div>
    </header>
  );
};
