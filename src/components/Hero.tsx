import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import tagProduct from "@/assets/tag_branca_logo.png";

export const Hero = () => {
  return (
    <section 
      className="relative flex items-center pt-20 pb-32 overflow-hidden bg-gradient-to-br from-cyan-light via-blue-medium to-purple-medium"
      role="region"
      aria-label="Seção principal - Hero"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary-foreground"
          >
            {/* H1 Principal - Uma única por página */}
            <h1 
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              itemProp="headline"
            >
              A Melhor Tecnologia de Localização para Seus Ativos
            </h1>
            
            {/* Descrição semântica com SEO */}
            <p 
              className="text-xl md:text-2xl mb-8 font-light leading-relaxed opacity-95"
              itemProp="description"
            >
              <span className="font-semibold">Tag It</span> usa <span className="font-semibold">Tecnologia Avançada</span> para proteger 
              seus ativos empresariais e pessoais com rastreamento, 
              tudo de forma <span className="font-semibold">simples e segura</span>.
            </p>

            {/* CTAs com âncoras semânticas */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full font-bold shadow-lg hover:scale-105 transition-transform bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <a href="#empresas">PARA EMPRESAS</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-full font-bold border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all"
                asChild
              >
                <a href="#para-voce">PESSOA FÍSICA</a>
              </Button>
            </div>
          </motion.div>

          {/* Imagem Hero otimizada para LCP (Largest Contentful Paint) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col gap-8 items-center"
          >
            <picture>
              <img
                src={tagProduct}
                alt="Produto Tag It - Rastreador de Ativos com Tecnologia GPS Avançada"
                className="w-full h-auto max-w-sm mx-auto drop-shadow-2xl"
                loading="eager"
                itemProp="image"
                width={400}
                height={400}
              />
            </picture>
          </motion.div>
        </div>
      </div>

      {/* Banda animada com benefícios - ARIA Live Region */}
      <div 
        className="absolute bottom-0 left-0 right-0 overflow-hidden h-16"
        role="region"
        aria-live="polite"
        aria-label="Destaques: Rastreamento, Bateria de longa duração, Criptografia ponta a ponta"
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 py-4 bg-foreground/20 backdrop-blur-sm transform -skew-y-2 h-full items-center"
          style={{ width: '300%' }}
          aria-hidden="true"
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-primary-foreground font-bold text-sm">
              <span>✓ Rastreamento</span>
              <span className="mx-4">•</span>
              <span>✓ Bateria de Longa Duração</span>
              <span className="mx-4">•</span>
              <span>✓ Criptografia Ponta a Ponta</span>
              <span className="mx-4">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
