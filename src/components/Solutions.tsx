import { companyWhatsApp } from "@/lib/contact";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Solutions = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <section id="contato" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-medium via-primary to-secondary" role="region" aria-labelledby="cta-final-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 id="cta-final-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-primary-foreground">
              Pronto para ter <span className="font-bold">mais controle e menos perdas</span>?
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto font-light">
              Fale com um especialista e veja a configuração ideal para seu cenário.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-8 sm:mb-10"
          >
            <Card className="p-5 sm:p-6 md:p-10 border-primary-foreground/20 bg-background/95 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-2">Conheça a solução para sua empresa</h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Veja os cenários de uso e converse com nossa equipe sobre a sua operação.
                  </p>
                </div>
                <Button asChild size="lg" className="rounded-full px-6 sm:px-8 w-full md:w-auto">
                  <a href="/para-empresas" className="inline-flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Conhecer a solução
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="rounded-full px-6 sm:px-8 w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => setIsContactModalOpen(true)}
            >
              Solicitar demonstração
            </Button>
            <Button asChild size="lg" className="rounded-full px-6 sm:px-8 w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <a href={companyWhatsApp()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </>
  );
};
