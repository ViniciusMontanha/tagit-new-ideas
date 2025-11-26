import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Users, Lock } from "lucide-react";

const benefits = [
  {
    icon: Lock,
    title: "Proteja seus ativos",
    description: "Gerencie e rastreie equipamentos, ferramentas e inventário da empresa com segurança total.",
  },
  {
    icon: TrendingUp,
    title: "Aumente a produtividade",
    description: "Reduza tempo perdido procurando equipamentos e mantenha operações fluindo sem interrupções.",
  },
  {
    icon: Users,
    title: "Gestão centralizada",
    description: "Plataforma única para toda equipe gerenciar e monitorar ativos empresariais em tempo real.",
  },
  {
    icon: Building2,
    title: "Escalável para sua empresa",
    description: "Solução que cresce com seu negócio, desde pequenas equipes até grandes corporações.",
  },
];

export const Enterprise = () => {
  return (
    <section id="empresas" className="py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Para <span className="bg-gradient-hero bg-clip-text text-transparent">Empresas</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            Transforme a forma como sua empresa gerencia ativos com tecnologia de rastreamento inteligente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-10 h-full hover:shadow-soft transition-all duration-500 border hover:border-accent/20 bg-card/50 backdrop-blur-sm group">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-gradient-accent rounded-2xl shadow-soft group-hover:scale-105 transition-transform duration-500">
                    <benefit.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" className="text-base px-10 py-7 rounded-full shadow-blue hover:shadow-strong transition-all">
            Solicitar Proposta Comercial
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
