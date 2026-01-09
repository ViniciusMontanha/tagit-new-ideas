import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png"; // Certifique-se de que o arquivo na pasta assets tenha este nome ou ajuste aqui

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4">
        {/* Mantivemos h-48 para dar espaço à logo aumentada (12rem = h-48 no Tailwind) */}
        <nav className="flex items-center justify-between h-48">
          <div className="flex items-center">
            {/* Logo aumentada para 12rem (h-48) conforme solicitado */}
            <img 
              src={logo} 
              alt="Tag It - Localização Inteligente" 
              className="h-48 w-auto object-contain" 
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#empresas" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Para Empresas
            </a>
            <a href="#para-voce" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Para Você
            </a>
            
            {/* Link que abrirá o seu formulário com reCAPTCHA */}
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
