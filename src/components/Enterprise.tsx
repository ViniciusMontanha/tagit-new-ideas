import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { Building2, TrendingUp, Users, Lock } from "lucide-react";
import tagPossibilities from "@/assets/tag-possibilities.webp";
import professionalTool from "@/assets/tag_preta_cm.webp";

const benefits = [
  {
    icon: Lock,
    title: "Proteja seus ativos",
    description:
      "Gerencie e localize equipamentos de alto valor, ferramentas e inventário da empresa em uma única plataforma.",
  },
  {
    icon: TrendingUp,
    title: "Aumente a produtividade",
    description: "Reduza tempo perdido procurando equipamentos e mantenha operações fluindo sem interrupções.",
  },
  {
    icon: Users,
    title: "Gestão centralizada",
    description: "Plataforma única para toda equipe gerenciar e monitorar ativos empresariais.",
  },
  {
    icon: Building2,
    title: "Escalável para sua empresa",
    description: "Solução que cresce com seu negócio, desde pequenas equipes até grandes corporações.",
  },
];

export const Enterprise = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <section
        id="empresas"
        className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden bg-background"
        role="region"
        aria-labelledby="empresas-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h1
            id="empresas-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight"
            itemProp="name"
          >
            Para <span className="bg-gradient-hero bg-clip-text text-transparent">Empresas</span>
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed"
            itemProp="description"
          >
            Transforme a forma como sua empresa gerencia ativos com tecnologia de localização inteligente.
          </p>

          <div className="max-w-4xl mx-auto mt-6 text-left space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>Localize ferramentas, equipamentos e outros ativos móveis em uma plataforma de consulta. A Tag It ajuda sua equipe a organizar informações e agir quando um item precisa ser encontrado.</p>
            <p>Aplicações incluem operações logísticas, construção e equipamentos técnicos. A equipe avalia com você o modelo, a compatibilidade e as condições de cobertura do local.</p>
            <p>A localização remota utiliza uma rede de dispositivos compatíveis. A disponibilidade e o intervalo entre atualizações variam conforme o ambiente.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 sm:mb-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 space-y-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-accent opacity-10 blur-[100px] rounded-full"></div>
              <motion.img
                src={professionalTool}
                alt="Mini Tag ao lado de uma régua, para referência de tamanho"
                className="relative w-full max-w-lg mx-auto drop-shadow-2xl rounded-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
            <div className="relative">
              <motion.img
                src={tagPossibilities}
                alt="Possibilidades de localização Tag It - equipamentos, veículos, ferramentas e ativos empresariais"
                className="relative w-full rounded-2xl shadow-strong"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            {/* Lista de benefícios com microdata */}
            <div
              className="grid grid-cols-1 gap-6"
              role="list"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/Thing"
                >
                  <Card className="p-5 sm:p-6 md:p-8 hover:shadow-soft transition-all duration-500 border hover:border-primary/20 bg-card/80 backdrop-blur-sm group">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-gradient-accent rounded-2xl shadow-soft group-hover:scale-105 transition-transform duration-500">
                        <benefit.icon
                          className="w-8 h-8 text-primary-foreground"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-xl sm:text-2xl font-semibold mb-3 text-foreground"
                          itemProp="name"
                        >
                          {benefit.title}
                        </h3>
                        <p
                          className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed"
                          itemProp="description"
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
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
          <Button
            size="lg"
            className="text-base px-6 sm:px-10 py-6 sm:py-7 rounded-full shadow-blue hover:shadow-strong transition-all bg-primary hover:bg-primary/90 w-full sm:w-auto"
            onClick={() => setIsContactModalOpen(true)}
          >
            Solicitar Proposta Comercial
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Modal de Contato */}
    <ContactModal
      isOpen={isContactModalOpen}
      onOpenChange={setIsContactModalOpen}
    />
    </>
  );
};
