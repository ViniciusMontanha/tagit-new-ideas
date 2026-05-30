import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Users, Globe, Award, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";
import founderImage from "@/assets/executivo.jpeg";
import viniciusImage from "@/assets/viniciusmedeiros.jpeg";

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
          className="relative flex items-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-14 sm:pb-16 lg:pb-20 overflow-hidden bg-gradient-to-br from-cyan-light via-blue-medium to-purple-medium"
          role="region"
          aria-label="Seção principal - Sobre a Tag It"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-primary-foreground max-w-4xl mx-auto"
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                itemProp="headline"
              >
                Conheça a Tag It
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-95">
                A melhor solução em localização inteligente de ativos do Brasil
              </p>
            </motion.div>
          </div>
        </section>

        {/* Seção Nossa História */}
        <section
          className="py-16 sm:py-20 lg:py-28 bg-background"
          role="region"
          aria-labelledby="historia-heading"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  {/* Conteúdo de texto */}
                  <div className="space-y-6">
                    <div>
                      <h2
                        id="historia-heading"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                        itemProp="name"
                      >
                        Nossa História
                      </h2>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                        A <span className="font-semibold">Tag IT Localização</span> nasceu 
                        da necessidade de oferecer soluções inteligentes, acessíveis e confiáveis 
                        para localização e gestão de ativos, veículos e pessoas. Observando as 
                        dificuldades enfrentadas por empresas e usuários no controle, segurança e 
                        localização, surgiu a ideia de criar uma tecnologia prática, 
                        eficiente e adaptada à realidade do mercado.
                      </p>
                      <div>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                          <span className="font-semibold">Vinicius Medeiros</span> executivo com sólida experiência em gestão financeira, administração estratégica e tecnologia aplicada ao rastreamento e monitoramento via satélite. Atua há mais de 13 anos no segmento de gerenciamento de veículos, cargas e frotas, desenvolvendo soluções voltadas à segurança, controle operacional, redução de custos e eficiência logística.
                        </p>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                          À frente da Tag It, lidera projetos de localização inteligente de ativos e patrimônios empresariais, rastreamento Global  e monitoramento em larga escala, oferecendo soluções completas e inovadoras para empresas de diversos segmentos. A empresa se destaca pela utilização de tecnologias avançadas voltadas à gestão de ativos, proteção patrimonial, controle logístico e otimização operacional, contribuindo para operações mais seguras, estratégicas e eficientes.
                        </p>
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                          Possui ampla expertise em análise operacional, gestão de equipes, implantação de soluções tecnológicas e desenvolvimento de processos voltados ao gerenciamento via satélite, logística e mobilidade corporativa. Sua atuação é marcada pela inovação, excelência no atendimento e foco em resultados, sempre integrando tecnologia, inteligência de dados e eficiência operacional para gerar maior segurança, produtividade e performance aos clientes
                        </p>
                      </div>

                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 mt-[5rem]">
                        <span className="font-semibold">José Luiz</span> começou sua trajetória com uma experiência vasta em tecnologia. Tenho 12 anos de experiência técnica no segmento de eletrônicos, com um vasto conhecimento em multifuncionais, impressoras, sistemas digitais e GED (gerenciamento eletrônico), além de um conhecimento sólido em TI e áreas afins.
                      </p>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                        Após esses 12 anos, transicionei para a área comercial, onde aprofundei meus conhecimentos em análise de desempenho, gestão de projetos, demandas e workflow. Hoje, atuo representando grandes empresas, com foco em inovação, agilidade e transformação digital. Meu propósito é impulsionar negócios, transformando-os em grandes projetos tecnológicos e trazendo tecnologia para o dia a dia.
                      </p>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                        Unimos inovação, tecnologia e conhecimento para desenvolver soluções de 
                        localização que tragam mais segurança, controle e tranquilidade aos nossos clientes.
                      </p>
                    </div>
                  </div>

                  {/* Cards: Vinicius Medeiros (acima) e José Luiz (abaixo) */}
                  <div className="relative flex flex-col items-start space-y-24">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="w-full flex justify-center mt-[7rem]"
                    >
                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="group w-full max-w-xs text-left transition-all duration-300"
                        aria-label="Conheça Vinicius Medeiros"
                      >
                        <div className="relative overflow-hidden rounded-lg mb-4 h-auto bg-muted/20 flex items-center justify-center min-h-64 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                          <img
                            src={viniciusImage}
                            alt="Vinicius Medeiros - Fundador e CEO"
                            className="w-full h-auto object-contain transition-opacity duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 right-4 bg-primary rounded-full p-2.5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                            <ArrowRight className="w-4 h-4 text-primary-foreground" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="h-0.5 w-10 bg-primary group-hover:w-14 transition-all duration-300" />
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Vinicius Medeiros</h3>
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary mt-1">Founder & CEO</p>
                          </div>
                          <p className="text-sm text-muted-foreground italic leading-relaxed border-l-2 border-primary/30 pl-3">
                            "Liderando inovação em localização inteligente de ativos"
                          </p>
                          <div className="pt-2 flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            <span>Conheça a história</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.35 }}
                      viewport={{ once: true }}
                      className="absolute right-0 w-full flex justify-center top-[55rem] md:top-[55rem] lg:top-[55rem]"
                    >
                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="group w-full max-w-xs text-left transition-all duration-300"
                        aria-label="Conheça José Luiz"
                      >
                        <div className="relative overflow-hidden rounded-lg mb-4 h-auto bg-muted/20 flex items-center justify-center min-h-64 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                          <img
                            src={founderImage}
                            alt="José Luiz - Equipe Tag It"
                            className="w-full h-auto object-contain transition-opacity duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 right-4 bg-primary rounded-full p-2.5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                            <ArrowRight className="w-4 h-4 text-primary-foreground" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="h-0.5 w-10 bg-primary group-hover:w-14 transition-all duration-300" />
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground">José Luiz</h3>
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary mt-1">CCO & Co-Founder</p>
                          </div>
                          <p className="text-sm text-muted-foreground italic leading-relaxed border-l-2 border-primary/30 pl-3">
                            "Transformando experiências práticas em soluções inovadoras"
                          </p>
                          <div className="pt-2 flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            <span>Conheça a história</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Seção Valores */}
        <section
          className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-primary/5 to-background"
          role="region"
          aria-labelledby="valores-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2
                id="valores-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              >
                Nossos Valores
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Princípios que guiam cada decisão e inovação na Tag It
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-5 sm:p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                    itemScope
                    itemType="https://schema.org/Thing"
                  >
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                    <h3
                      className="text-lg sm:text-xl font-bold mb-3"
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
          className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border"
          role="region"
          aria-label="Chamada para ação - Contatar Tag It"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Quer conhecer melhor a Tag It?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Estamos prontos para conversar sobre como podemos ajudar sua empresa
                ou proteger seus ativos pessoais.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full sm:w-auto"
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
