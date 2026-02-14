import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tips = [
  "Não priorizar ativos críticos para monitoramento.",
  "Operar sem alertas para deslocamento e risco.",
  "Não acompanhar indicadores de perda e tempo de resposta.",
];

export const EducationalTips = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5" role="region" aria-labelledby="erros-heading">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="erros-heading" className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            3 erros comuns na gestão de ativos
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Evite os gargalos mais frequentes e aumente a eficiência da operação.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card className="p-8 border hover:border-primary/20 transition-all duration-300">
            <ul className="space-y-4">
              {tips.map((tip, index) => (
                <li key={tip} className="flex items-start gap-3 text-lg text-muted-foreground">
                  <span className="mt-0.5 text-primary font-bold">{index + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button asChild className="rounded-full px-8">
            <a href="/para-empresas">Quero aplicar isso na minha operação</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
