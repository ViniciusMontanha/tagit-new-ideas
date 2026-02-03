import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Users, Globe, Award } from "lucide-react";
import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";

const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const values = [
    {
      icon: Zap,
      title: "Inovação",
      description: "Desenvolvemos tecnologia de ponta em rastreamento e localização de ativos para o mercado.",
    },
    {
      icon: Users,
      title: "Confiança",
      description: "Nossos clientes confiam em nós para proteger seus ativos mais valiosos 24/7.",
    },
    {
      icon: Globe,
      title: "Alcance Global",
      description: "Operamos com cobertura internacional, conectando empresas e pessoas em todo o mundo.",
    },
    {
      icon: Award,
      title: "Qualidade",
      description: "Cada produto é desenvolvido com excelência, passando por rigorosos testes de qualidade.",
    },
  ];

  const milestones = [
    { year: "2023", event: "Fundação da Tag It" },
    { year: "2024", event: "Expansão para América Latina" },
    { year: "2025", event: "Lançamento da plataforma integrada" },
    { year: "2026", event: "Alcance de 10.000+ usuários ativos" },
  ];

  return (
    <>
      <main
        className="min-h-screen"
        role="main"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Header com navegação */}
        <Header />

        {/* Seção Hero da página Sobre */}
        <section
          className="relative flex items-center pt-40 pb-20 overflow-hidden bg-gradient-to-br from-cyan-light via-blue-medium to-purple-medium"
          role="region"
          aria-label="Seção principal - Sobre a Tag It"
        >
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-primary-foreground max-w-4xl mx-auto"
            >
              <h1
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                itemProp="headline"
              >
                Conheça a Tag It
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed opacity-95">
                A melhor solução em rastreamento inteligente de ativos do Brasil
              </p>
            </motion.div>
          </div>
        </section>

        {/* Seção Nossa História */}
        <section
          className="py-32 bg-background"
          role="region"
          aria-labelledby="historia-heading"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h2
                    id="historia-heading"
                    className="text-4xl md:text-5xl font-bold mb-4"
                    itemProp="name"
                  >
                    Nossa História
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    A <span className="font-semibold">Tag It</span> nasceu de uma visão
                    simples: oferecer a tecnologia de rastreamento mais avançada,
                    confiável e acessível para proteger os ativos das pessoas e empresas.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Com uma equipe dedicada de engenheiros e especialistas em localização,
                    desenvolvemos soluções que combinam inovação com facilidade de uso,
                    sempre colocando a segurança e privacidade dos nossos clientes em primeiro lugar.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Saiba Mais
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Seção Valores */}
        <section
          className="py-32 bg-gradient-to-b from-primary/5 to-background"
          role="region"
          aria-labelledby="valores-heading"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                id="valores-heading"
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Nossos Valores
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Princípios que guiam cada decisão e inovação na Tag It
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                    itemScope
                    itemType="https://schema.org/Thing"
                  >
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3
                      className="text-xl font-bold mb-3"
                      itemProp="name"
                    >
                      {value.title}
                    </h3>
                    <p
                      className="text-muted-foreground leading-relaxed"
                      itemProp="description"
                    >
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Seção Timeline */}
        <section
          className="py-32 bg-background"
          role="region"
          aria-labelledby="timeline-heading"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                id="timeline-heading"
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Nossa Jornada
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Marcos importantes na história da Tag It
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex gap-8 mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className="flex-1 text-right md:text-left">
                    <div className="p-6 bg-card border border-border rounded-lg">
                      <p className="text-primary font-bold text-lg mb-2">
                        {milestone.year}
                      </p>
                      <p className="text-foreground font-semibold">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    {index < milestones.length - 1 && (
                      <div className="w-1 h-24 bg-primary/30" />
                    )}
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção CTA Final */}
        <section
          className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border"
          role="region"
          aria-label="Chamada para ação - Contatar Tag It"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Quer conhecer melhor a Tag It?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Estamos prontos para conversar sobre como podemos ajudar sua empresa
                ou proteger seus ativos pessoais.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={() => setIsContactModalOpen(true)}
              >
                Entre em Contato
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>

      {/* Modal de Contato */}
      <ContactModal
        isOpen={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </>
  );
};

export default About;
