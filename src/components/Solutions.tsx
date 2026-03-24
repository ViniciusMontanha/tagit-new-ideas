import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { PlayCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Solutions = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <section id="contato" className="py-24 bg-gradient-to-br from-blue-medium via-primary to-secondary" role="region" aria-labelledby="cta-final-heading">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="cta-final-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-primary-foreground">
              Pronto para ter <span className="font-bold">mais controle e menos perdas</span>?
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto font-light">
              Fale com um especialista e veja a configuração ideal para seu cenário.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-10"
          >
            <Card className="p-8 md:p-10 border-primary-foreground/20 bg-background/95 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Veja a Tag It em ação em 30 segundos</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Simule uma localização na plataforma e entenda como reduzir perdas na prática.
                  </p>
                </div>
                <Button asChild size="lg" className="rounded-full px-8">
                  <a href="/para-empresas" className="inline-flex items-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Ver demonstração
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="rounded-full px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => setIsContactModalOpen(true)}
            >
              Solicitar demonstração
            </Button>
            <Button asChild size="lg" className="rounded-full px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <a href="https://api.whatsapp.com/send/?phone=5516991295203&text=Ol%C3%A1%21+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+a+Tag+It.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
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
