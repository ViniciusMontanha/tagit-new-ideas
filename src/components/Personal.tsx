import { companyWhatsApp } from "@/lib/contact";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Heart, PawPrint } from "lucide-react";
import tagProduct from "@/assets/tag_branca_logo.webp";
import coleirGolden from "@/assets/Coleira_golden.webp";

const benefits = [
  {
    icon: Heart,
    title: "Ajuda para encontrar seus pertences",
    description: "Consulte a localização disponível de chaves, mochila e outros objetos pelo aplicativo compatível.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description: "Receba notificações quando esquecer algo importante para trás.",
  },
  {
    icon: Heart,
    title: "Monitore seu Pet com conforto e tecnologia",
    description: "Um apoio à localização do seu pet, sujeito às condições da rede e sem substituir a supervisão.",
  },
  {
    icon: PawPrint,
    title: "Fácil de usar",
    description: "Interface intuitiva que qualquer pessoa pode usar, sem complicações.",
  },
];

export const Personal = () => {
  return (
    <section id="para-voce" className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight">
            Para <span className="bg-gradient-purple bg-clip-text text-transparent">Você</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            Encontre objetos do dia a dia com tecnologia de localização inteligente.
          </p>
        </motion.div>

        <p className="max-w-3xl mx-auto mb-8 text-center text-muted-foreground">A Mini Tag desta ficha é compatível com iOS. Antes da compra, confirme com nossa equipe o aplicativo e as condições de uso do modelo escolhido.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 sm:mb-16 items-center max-w-7xl mx-auto">
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
                  <Card className="p-5 sm:p-6 md:p-8 hover:shadow-soft transition-all duration-500 border hover:border-secondary/20 bg-card/80 backdrop-blur-sm group">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-gradient-purple rounded-2xl shadow-purple group-hover:scale-105 transition-transform duration-500">
                        <benefit.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                        <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed">{benefit.description}</p>
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
          <Button size="lg" className="text-base px-6 sm:px-10 py-6 sm:py-7 rounded-full shadow-purple hover:shadow-strong transition-all bg-secondary hover:bg-secondary/90 w-full sm:w-auto" asChild>
            <a href={companyWhatsApp()} target="_blank" rel="noopener noreferrer">
            Consultar compra pelo WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
