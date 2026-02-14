import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Users, Globe, Award, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";
import josyImage from "@/assets/josy.jpeg";

const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const values = [
    {
      icon: Zap,
      title: "Inovação",
      description: "Desenvolvemos tecnologia de ponta em localização e gestão de ativos para o mercado.",
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
                A melhor solução em localização inteligente de ativos do Brasil
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
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  {/* Conteúdo de texto */}
                  <div className="space-y-6">
                    <div>
                      <h2
                        id="historia-heading"
                        className="text-4xl md:text-5xl font-bold mb-4"
                        itemProp="name"
                      >
                        Nossa História
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        A <span className="font-semibold">Tag IT Localização</span> nasceu 
                        da necessidade de oferecer soluções inteligentes, acessíveis e confiáveis 
                        para localização e gestão de ativos, veículos e pessoas. Observando as 
                        dificuldades enfrentadas por empresas e usuários no controle, segurança e 
                        localização em tempo real, surgiu a ideia de criar uma tecnologia prática, 
                        eficiente e adaptada à realidade do mercado.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                        Unimos inovação, tecnologia e conhecimento para desenvolver soluções de 
                        localização que tragam mais segurança, controle e tranquilidade aos nossos clientes.
                      </p>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        <span className="font-semibold">Josy Dizaro</span> é uma empreendedora 
                        que iniciou sua trajetória no setor da estética, onde o contato direto com as 
                        clientes revelou dores reais relacionadas à segurança, controle e organização. 
                        A partir dessas necessidades e opiniões, surgiu a motivação para expandir sua 
                        atuação para o ramo da tecnologia, transformando experiências práticas em 
                        soluções inovadoras, unindo sensibilidade ao mercado, visão empreendedora e tecnologia.
                      </p>
                    </div>
                  </div>

                  {/* Card da Josy - Melhorado */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="group w-full max-w-xs text-left transition-all duration-300"
                      aria-label="Conheça a fundadora - Josy Dizaro"
                    >
                      {/* Imagem com Overlay */}
                      <div className="relative overflow-hidden rounded-lg mb-4 h-auto bg-muted/20 flex items-center justify-center min-h-64 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={josyImage}
                          alt="Josy Dizaro - Fundadora da Tag IT Localização"
                          className="w-full h-auto object-contain transition-opacity duration-500"
                          loading="lazy"
                        />
                        {/* Overlay Gradient - Só aparece no hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Indicador de Clique */}
                        <div className="absolute bottom-4 right-4 bg-primary rounded-full p-2.5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                          <ArrowRight className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>

                      {/* Informações */}
                      <div className="space-y-3">
                        {/* Divider */}
                        <div className="h-0.5 w-10 bg-primary group-hover:w-14 transition-all duration-300" />
                        
                        {/* Nome e Cargo */}
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">Josy Dizaro</h3>
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary mt-1">Fundadora & CEO</p>
                        </div>

                        {/* Quote */}
                        <p className="text-sm text-muted-foreground italic leading-relaxed border-l-2 border-primary/30 pl-3">
                          "Transformando experiências práticas em soluções inovadoras"
                        </p>

                        {/* CTA */}
                        <div className="pt-2 flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                          <span>Conheça a história</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  </motion.div>
                </div>
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
