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
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto leading-relaxed"
          >
            Tecnologia de localização avançada para gestão de ativos empresariais e pessoais. 
            Rastreamento em tempo real com precisão de centímetros, bateria que dura meses e 
            privacidade garantida por criptografia de ponta a ponta.
          </motion.p>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8"
          >
            {[
              { value: "99.9%", label: "Precisão" },
              { value: "12 meses", label: "Bateria" },
              { value: "10.000+", label: "Empresas" },
              { value: "24/7", label: "Suporte" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12"
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
