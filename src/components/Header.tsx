import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Tag It</span>
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
