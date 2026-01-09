import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png"; // Certifique-se de que o arquivo na pasta assets tenha este nome ou ajuste aqui

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4">
        {/* Mantivemos h-24 para dar um respiro elegante para a logo HD */}
        <nav className="flex items-center justify-between h-24">
          <div className="flex items-center">
            {/* Ajustamos para h-16 ou h-20. 
              Como a logo já tem o slogan interno, h-20 (80px) garante a leitura do texto pequeno.
            */}
            <img 
              src={logo} 
              alt="Tag It - Localização Inteligente" 
              className="h-20 w-auto object-contain" 
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
