import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePrivacyPolicy } from "@/contexts/PrivacyPolicyContext";
import { Link } from "react-router-dom";
import { Home, Info, Briefcase, Users, Shield, Instagram } from "lucide-react";

export const Footer = () => {
  const { isOpen, openPrivacyPolicy, closePrivacyPolicy } = usePrivacyPolicy();

  return (
    <>
      <footer
        className="w-full bg-background border-t border-border py-8"
        role="contentinfo"
        aria-label="Rodapé do site"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Informações de Contato */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Contato</h3>
              <address className="text-xs text-muted-foreground space-y-2 not-italic">
                <p itemProp="name" className="font-medium text-foreground">
                  Tag IT Tecnologia em Localização LTDA
                </p>
                <p itemProp="identifier" className="text-xs text-muted-foreground">
                  CNPJ: 64.407.101/0001-64
                </p>
                <div className="space-y-1">
                  <p itemProp="streetAddress">
                    Rua Doutor Paulo Tinoco Cabral 155
                  </p>
                  <p>
                    <span itemProp="addressLocality">Ribeirão Preto</span>,{" "}
                    <span itemProp="addressRegion">SP</span>{" "}
                    <span itemProp="postalCode">14020-270</span>
                  </p>
                </div>
                <p>
                  <a
                    href="tel:+5516996403745"
                    className="text-primary hover:underline transition-colors"
                    aria-label="Ligar para Tag It"
                    itemProp="telephone"
                  >
                    (16) 99640-3745
                  </a>
                </p>
              </address>
            </div>

            {/* Links de Navegação */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Navegação</h3>
              <nav aria-label="Links do rodapé" className="space-y-3">
                <a
                  href="#root"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Home className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="relative pb-0.5">
                    Início
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
                <Link
                  to="/quem-somos"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Info className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="relative pb-0.5">
                    Quem Somos
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
                <a
                  href="/#empresas"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Briefcase className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="relative pb-0.5">
                    Para Empresas
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
                <a
                  href="/#para-voce"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Users className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="relative pb-0.5">
                    Para Você
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </nav>
            </div>

            {/* Links Legais */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Políticas</h3>
              <nav aria-label="Links legais" className="space-y-3">
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                  aria-label="Abrir política de privacidade"
                  onClick={openPrivacyPolicy}
                >
                  <Shield className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="relative pb-0.5">
                    Política de Privacidade
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Button>
              </nav>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Redes Sociais</h3>
              <nav aria-label="Redes sociais" className="space-y-3">
                <a
                  href="https://www.instagram.com/tagitlocalizacaointeligente/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  aria-label="Seguir Tag It no Instagram"
                >
                  <Instagram className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="relative pb-0.5">
                    Instagram
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </nav>
            </div>
          </div>

          {/* Separador */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
              <p>
                © {new Date().getFullYear()} Tag It Tecnologia. Todos os direitos reservados.
              </p>
              <p itemProp="address" className="hidden">
                Rua Doutor Paulo Tinoco Cabral 155, Ribeirão Preto, SP 14020-270
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Política de Privacidade - Controlada pelo Context */}
      <Dialog open={isOpen} onOpenChange={closePrivacyPolicy}>
        <DialogContent className="max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle>Política de Privacidade</DialogTitle>
            <DialogDescription>
              Esta política descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar o site Tag It. Não compartilhamos seus dados com terceiros sem consentimento. Para dúvidas, entre em contato pelo e-mail contato@tagit.com.br.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2 text-sm text-foreground">
            <p>Coletamos apenas informações necessárias para contato e prestação de serviços. Você pode solicitar a exclusão dos seus dados a qualquer momento.</p>
            <p>Ao utilizar nossos formulários, você concorda com esta política.</p>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={closePrivacyPolicy} aria-label="Fechar modal">Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
