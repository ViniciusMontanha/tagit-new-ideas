import { motion } from "framer-motion";
import { Target, Shield, Zap, BarChart } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Target,
    title: "Precisão Avançada",
    description: "Tecnologia de localização de alta precisão que ajuda a encontrar ativos com facilidade e velocidade.",
  },
  {
    icon: Shield,
    title: "Privacidade Integrada",
    description: "Conexões seguras e dados protegidos por design — somente você terá acesso às informações.",
  },
  {
    icon: Zap,
    title: "Bateria Duradoura",
    description: "Energia para meses com uso diário. Fácil substituição quando necessário.",
  },
  {
    icon: BarChart,
    title: "Gestão Centralizada",
    description: "Plataforma única para toda equipe gerenciar e monitorar ativos empresariais em tempo real.",
  },
];

export const Features = () => {
  return (
    <section id="recursos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tecnologia de <span className="bg-gradient-hero bg-clip-text text-transparent">Ponta</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recursos avançados que garantem total controle sobre seus ativos empresariais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-strong transition-all duration-300 border-2 hover:border-primary/30 bg-card group">
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-xl group-hover:bg-gradient-hero transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
