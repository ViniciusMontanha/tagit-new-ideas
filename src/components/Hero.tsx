import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Target } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background pt-20 pb-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight"
          >
            Rastreie o que importa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl md:text-2xl font-semibold mb-3 bg-gradient-hero bg-clip-text text-transparent"
          >
            Fácil e seguro
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-4 max-w-4xl mx-auto leading-relaxed"
          >
            Tecnologia de localização avançada para gestão de ativos empresariais e pessoais. Rastreamento em tempo real
            com precisão avançada, bateria de longa duração 12 e 24 meses e privacidade garantida por criptografia de
            ponta a ponta.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base md:text-lg text-muted-foreground/90 mb-6 max-w-4xl mx-auto leading-relaxed"
          >
            Super anatomica, formato discreto, de fácil fixação e adequada para aplicação em ativos, máquinas,
            equipamentos eletronicos e demais patrimônios operacionais, assegurando rápida identificação e
            rastreabilidade sem comprometer a estética ou o uso do equipamento.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-24"
          >
            <Button
              size="lg"
              className="text-base px-8 py-6 rounded-full shadow-blue hover:shadow-strong transition-all"
            >
              Solicitar Demo
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-base px-8 py-6 rounded-full hover:bg-accent/10 transition-all text-primary font-semibold"
            >
              Saiba Mais <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
