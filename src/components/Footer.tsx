import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePrivacyPolicy } from "@/contexts/PrivacyPolicyContext";

export const Footer = () => {
  const { isOpen, openPrivacyPolicy, closePrivacyPolicy } = usePrivacyPolicy();

  return (
    <>
      <footer
        className="w-full bg-background border-t border-border py-6 mt-16"
        role="contentinfo"
        aria-label="Rodapé do site"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Tag It. Todos os direitos reservados.</span>
          <Button
            variant="link"
            className="text-sm p-0 h-auto underline underline-offset-2"
            aria-label="Abrir política de privacidade"
            onClick={openPrivacyPolicy}
          >
            Política de Privacidade
          </Button>
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
