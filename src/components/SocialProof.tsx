import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "+500", label: "clientes ativos" },
  { value: "+25 mil", label: "ativos localizados" },
  { value: "98%", label: "satisfação" },
];

const testimonials = [
  {
    quote: "Ganhamos mais previsibilidade e reduzimos perdas já no primeiro mês.",
    author: "Operação logística",
  },
  {
    quote: "Hoje temos visibilidade total dos ativos críticos da equipe.",
    author: "Gestão industrial",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-20 bg-background" role="region" aria-labelledby="prova-social-heading">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="prova-social-heading" className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Resultados que <span className="bg-gradient-hero bg-clip-text text-transparent">aparecem na rotina</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Menos perda de tempo, mais controle operacional e decisões mais rápidas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 text-center border hover:border-primary/20 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm md:text-base">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full border hover:border-primary/20 transition-all duration-300">
                <p className="text-foreground text-lg leading-relaxed mb-3">“{item.quote}”</p>
                <p className="text-muted-foreground text-sm font-medium">{item.author}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild className="rounded-full px-8">
            <a href="/para-empresas">Ver solução para minha operação</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
