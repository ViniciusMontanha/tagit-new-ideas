import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { Building2, TrendingUp, Users, Lock } from "lucide-react";
import tagPossibilities from "@/assets/tag-possibilities.png";
import professionalTool from "@/assets/tag_preta_cm.png";

const benefits = [
  {
    icon: Lock,
    title: "Proteja seus ativos",
    description:
      "Gerencie e localize equipamentos de alto valor, ferramentas e inventário da empresa com segurança total.",
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
        className="py-32 relative overflow-hidden bg-background"
        role="region"
        aria-labelledby="empresas-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 
            id="empresas-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            itemProp="name"
          >
            Para <span className="bg-gradient-hero bg-clip-text text-transparent">Empresas</span>
          </h2>
          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed"
            itemProp="description"
          >
            Transforme a forma como sua empresa gerencia ativos com tecnologia de localização inteligente.
          </p>

          <div className="max-w-4xl mx-auto mt-8 text-left space-y-5">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A Tag IT é uma plataforma avançada de localização e segurança de ativos baseada em tecnologia crowdsourced, desenvolvida para gerar dados globais de posicionamento com alta confiabilidade e escala.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Projetada para ambientes corporativos que exigem controle, segurança e eficiência operacional, a solução permite ampliar significativamente a visibilidade sobre ativos críticos dentro de operações complexas.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A tecnologia foi desenvolvida para atender organizações que precisam proteger e gerir ativos móveis e bens fixos de alto valor como:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed" role="list" aria-label="Ativos de alto valor atendidos pela Tag IT">
              <li>recursos logísticos estratégicos</li>
              <li>equipamentos médicos hospitalares</li>
              <li>ferramentas operacionais</li>
              <li>dispositivos técnicos</li>
              <li>equipamentos de alta tecnologia</li>
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Com uma arquitetura escalável e adaptável a diferentes setores, a plataforma posiciona-se como uma nova infraestrutura tecnológica para gestão e proteção de ativos no ambiente corporativo moderno.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-center max-w-7xl mx-auto">
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
                alt="Ferramenta profissional de alto valor sendo rastreada com Tag It GPS"
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
                  <Card className="p-8 hover:shadow-soft transition-all duration-500 border hover:border-primary/20 bg-card/80 backdrop-blur-sm group">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-gradient-accent rounded-2xl shadow-soft group-hover:scale-105 transition-transform duration-500">
                        <benefit.icon 
                          className="w-8 h-8 text-primary-foreground" 
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="text-2xl font-semibold mb-3 text-foreground"
                          itemProp="name"
                        >
                          {benefit.title}
                        </h3>
                        <p 
                          className="text-muted-foreground text-lg font-light leading-relaxed"
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
            className="text-base px-10 py-7 rounded-full shadow-blue hover:shadow-strong transition-all bg-primary hover:bg-primary/90"
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
