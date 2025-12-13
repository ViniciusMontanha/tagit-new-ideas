import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Tag It" className="h-12 w-12" />
            <span className="text-2xl font-bold text-gray-900">Localização inteligente</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#empresas" className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors">
              Para Empresas
            </a>
            <a href="#para-voce" className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors">
              Para Você
            </a>
            <a href="#solucoes" className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors">
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
