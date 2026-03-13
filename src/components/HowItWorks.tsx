import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    title: "Ative sua Tag It",
    description: "Configure em poucos minutos, sem complexidade técnica.",
  },
  {
    number: "2",
    title: "Acompanhe no aplicativo",
    description: "Visualize ativos e movimentações no aplicativo de forma intuitiva.",
  },
  {
    number: "3",
    title: "Receba alertas e aja rápido",
    description: "Antecipe riscos e tome decisão antes de virar problema.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-b from-primary/5 to-background" role="region" aria-labelledby="como-funciona-heading">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="como-funciona-heading" className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Como funciona em <span className="bg-gradient-hero bg-clip-text text-transparent">3 passos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Simples de usar, rápido para começar e focado em resultado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full border hover:border-primary/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline" className="rounded-full px-8">
            <a href="/para-voce">Quero ver para uso pessoal</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
