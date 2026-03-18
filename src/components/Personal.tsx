import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Heart, PawPrint } from "lucide-react";
import tagProduct from "@/assets/tag-product-new.png";
import coleirGolden from "@/assets/Coleira_golden.png";

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
    description: "Saiba exatamente onde está seu pet.",
  },
  {
    icon: PawPrint,
    title: "Fácil de usar",
    description: "Interface intuitiva que qualquer pessoa pode usar, sem complicações.",
  },
];

export const Personal = () => {
  return (
    <section id="para-voce" className="py-32 relative overflow-hidden bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Para <span className="bg-gradient-purple bg-clip-text text-transparent">Você</span>
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
                  <Card className="p-8 hover:shadow-soft transition-all duration-500 border hover:border-secondary/20 bg-card/80 backdrop-blur-sm group">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-gradient-purple rounded-2xl shadow-purple group-hover:scale-105 transition-transform duration-500">
                        <benefit.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
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
              <div className="absolute inset-0"></div>
              <motion.img 
                src={tagProduct} 
                alt="Tag It - Dispositivo de localização inteligente" 
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="relative">
              <motion.img 
                src={coleirGolden} 
                alt="Coleira Golden - Rastreador para pets Tag It" 
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-strong"
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
          <Button size="lg" className="text-base px-10 py-7 rounded-full shadow-purple hover:shadow-strong transition-all bg-secondary hover:bg-secondary/90" asChild>
            <a href="https://api.whatsapp.com/send/?phone=5516992058150&text=Ol%C3%A1%21+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+a+Tag+It.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            Comprar Agora
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
