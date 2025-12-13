import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import tagProduct from "@/assets/tag-product.png";
import tagDeviceHero from "@/assets/tag-device-hero.png";
export const Hero = () => {
  return (
    <section className="relative flex items-center pt-20 pb-32 overflow-hidden bg-primary">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary-foreground"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              A MELHOR TECNOLOGIA DE LOCALIZAÇÃO PARA SEUS ATIVOS
            </h1>

            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
              A <span className="font-bold">Tag It</span> usa{" "}
              <span className="font-bold">Tecnologia Avançada</span> para
              proteger seus ativos empresariais e pessoais com rastreamento em
              tempo real, tudo de forma{" "}
              <span className="font-bold">simples e segura</span>.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full font-bold shadow-lg hover:scale-105 transition-transform bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                PARA EMPRESAS
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full font-bold border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all"
              >
                PESSOA FÍSICA
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col gap-6 items-center justify-center"
          >
            <img
              src={tagDeviceHero}
              alt="Tag It Device"
              className="w-full h-auto max-w-xs mx-auto drop-shadow-2xl"
            />
            <img
              src={tagProduct}
              alt="Tag It Product"
              className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Animated diagonal bands */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-16">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 py-4 bg-foreground/30 transform -skew-y-2 h-full items-center"
          style={{ width: "300%" }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-primary-foreground font-bold text-sm"
            >
              <span>RASTREAMENTO EM TEMPO REAL</span>
              <span className="mx-4">•</span>
              <span>BATERIA DE LONGA DURAÇÃO</span>
              <span className="mx-4">•</span>
              <span>CRIPTOGRAFIA PONTA A PONTA</span>
              <span className="mx-4">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
