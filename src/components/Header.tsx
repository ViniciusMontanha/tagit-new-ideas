import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-24">
          <div className="flex items-center">
            {/* Aumentamos a altura para h-20 (80px) para a logo ficar bem visível sem o texto */}
            <img 
              src={logo} 
              alt="Tag It" 
              className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" 
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#empresas" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Para Empresas
            </a>
            <a href="#para-voce" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Para Você
            </a>
            
            {/* Aqui você pode manter o link ou já substituir pelo Dialog do Modal que planejamos */}
            <a href="#solucoes" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Solicitar Demo
            </a>

            <Button variant="ghost" className="text-sm font-semibold text-primary hover:text-primary/80">
              Login
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
