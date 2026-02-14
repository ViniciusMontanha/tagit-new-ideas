import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "A bateria dura quanto tempo?",
    answer: "A autonomia varia conforme uso e frequência de atualização, mas o dispositivo é otimizado para longa duração e operação contínua.",
  },
  {
    question: "Qual o nível de precisão da localização?",
    answer: "A plataforma combina tecnologia de localização para oferecer alta precisão e resposta rápida na visualização de ativos.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim. A Tag It utiliza criptografia e boas práticas de segurança para proteger dados e acessos da sua conta.",
  },
  {
    question: "A instalação é simples?",
    answer: "Sim. A ativação é rápida e o processo foi pensado para facilitar o início sem necessidade de configuração complexa.",
  },
  {
    question: "Existe suporte para empresas e pessoa física?",
    answer: "Sim. Há fluxos e atendimento para cenários empresariais e também para uso pessoal.",
  },
];

export const HomeFaq = () => {
  return (
    <section className="py-20 bg-background" role="region" aria-labelledby="faq-heading">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Perguntas frequentes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tire dúvidas rápidas sobre bateria, precisão, segurança e suporte.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
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
