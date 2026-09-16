import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { question: "A bateria dura quanto tempo?", answer: "A Mini Tag usa uma bateria CR2032 substituível e tem autonomia de até 12 meses em standby, conforme a ficha do modelo. O uso e as condições de operação podem reduzir essa duração." },
  { question: "Como a localização é atualizada?", answer: "A Mini Tag utiliza Bluetooth e uma rede compatível de dispositivos para obter atualizações de localização. A disponibilidade e a frequência variam conforme o ambiente; a emissão Bluetooth não significa atualização remota a cada dois segundos." },
  { question: "Qual aplicativo e celular devo usar?", answer: "A Mini Tag é compatível com iOS / Android. Antes da compra, confirme com nossa equipe o aplicativo, a versão do sistema e a conta necessários ao seu modelo. O acesso à plataforma é orientado durante a ativação." },
  { question: "Posso usar a Mini Tag para acompanhar meu pet?", answer: "O dispositivo pode ajudar na localização, respeitando as condições da rede compatível. Ele não garante acompanhamento contínuo ou localização imediata em qualquer ambiente e não substitui supervisão e identificação do animal." },
  { question: "Como começo a usar?", answer: "Nossa equipe orienta sobre ativação, aplicativo e fixação da tag. Confirme a compatibilidade do seu celular e o cenário de uso antes de adquirir o dispositivo." },
  { question: "Existe suporte para empresas e uso pessoal?", answer: "Sim. Entre em contato pelo formulário ou WhatsApp para receber orientação sobre o modelo e o uso adequado à sua necessidade." },
];

export const HomeFaq = () => {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-background" role="region" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Perguntas frequentes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tire dúvidas rápidas sobre bateria, precisão, segurança e suporte.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg">{item.question}</AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
