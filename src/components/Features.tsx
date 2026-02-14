import { motion } from "framer-motion";
import { Truck, Hammer, PawPrint, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Truck,
    title: "Logística",
    description: "Mais controle de cargas, equipamentos e prazos de entrega com visibilidade na plataforma.",
  },
  {
    icon: Hammer,
    title: "Construção",
    description: "Localize ferramentas e máquinas no canteiro e reduza perdas operacionais.",
  },
  {
    icon: PawPrint,
    title: "Pet",
    description: "Acompanhe a localização do seu pet com mais tranquilidade no dia a dia.",
  },
  {
    icon: Briefcase,
    title: "Uso Pessoal",
    description: "Tenha seus itens essenciais sempre no radar e evite perder tempo procurando.",
  },
];

export const Features = () => {
  return (
    <section id="recursos" className="pt-8 pb-16 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Casos reais por <span className="bg-gradient-hero bg-clip-text text-transparent">segmento</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Veja como a Tag It se adapta rápido ao seu cenário de operação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-soft transition-all duration-500 border hover:border-primary/20 bg-card/80 backdrop-blur-sm group">
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-2xl group-hover:bg-gradient-hero transition-all duration-500">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
