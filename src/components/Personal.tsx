import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Heart, PawPrint } from "lucide-react";
import tagProduct from "@/assets/tag-product.png";
import familyWithPet from "@/assets/family-with-pet.jpg";

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
    title: "Monitore seu Pet com conforto e tecnologia",
    description: "Saiba exatamente onde esta seu pet.",
  },
  {
    icon: PawPrint,
    title: "Fácil de usar",
    description: "Interface intuitiva que qualquer pessoa pode usar, sem complicações.",
  },
];

export const Personal = () => {
  return (
    <section id="para-voce" className="py-32 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Para <span className="bg-gradient-hero bg-clip-text text-transparent">Você</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            Proteja o que é importante com tecnologia inteligente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-1 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 hover:shadow-soft transition-all duration-500 border hover:border-secondary/20 bg-card/50 backdrop-blur-sm group">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-gradient-purple rounded-2xl shadow-soft group-hover:scale-105 transition-transform duration-500">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-purple opacity-10 blur-[100px] rounded-full"></div>
              <motion.img 
                src={tagProduct} 
                alt="Tag It - Dispositivo de rastreamento inteligente" 
                className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="relative">
              <motion.img 
                src={familyWithPet} 
                alt="Família feliz com seu pet protegido pela Tag It" 
                className="relative w-full rounded-2xl shadow-strong"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" className="text-base px-10 py-7 rounded-full shadow-blue hover:shadow-strong transition-all">
            Comprar Agora
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
