import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Heart, Smartphone } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Nunca mais perca seus pertences",
    description: "Localize suas chaves, mochila, carteira e muito mais em segundos através do app.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description: "Receba notificações quando esquecer algo importante para trás.",
  },
  {
    icon: Heart,
    title: "Tranquilidade diária",
    description: "Viva sem preocupações sabendo que seus itens estão sempre ao alcance.",
  },
  {
    icon: Smartphone,
    title: "Fácil de usar",
    description: "Interface intuitiva que qualquer pessoa pode usar, sem complicações.",
  },
];

export const Personal = () => {
  return (
    <section id="para-voce" className="py-24 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <User className="w-4 h-4" />
            Para Você
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simplifique sua vida com{" "}
            <span className="bg-gradient-purple bg-clip-text text-transparent">
              tecnologia inteligente
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cuide dos seus pertences pessoais e nunca mais perca tempo procurando o que importa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full hover:shadow-blue transition-all duration-300 border-2 hover:border-secondary/30 bg-card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-purple rounded-xl shadow-blue group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
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
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground">
            <User className="w-5 h-5 mr-2" />
            Comprar Agora
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
