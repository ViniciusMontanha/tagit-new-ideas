import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Dispositivo } from "@/components/Dispositivo";
import { BeforeAfter } from "@/components/BeforeAfter";
import { EducationalTips } from "@/components/EducationalTips";
import { HomeFaq } from "@/components/HomeFaq";
import { Solutions } from "@/components/Solutions";

const Index = () => {
  return (
    <main 
      className="min-h-screen"
      role="main"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      {/* Header com navegação semântica */}
      <Header />
      
      {/* Seção Hero - Apresentação Principal */}
      <Hero />

      {/* Prova social */}
      <SocialProof />

      {/* Como funciona em 3 passos */}
      <HowItWorks />
      
      {/* Casos reais por segmento */}
      <Features />

      {/* Seção Dispositivo */}
      <Dispositivo />

      {/* Antes e Depois */}
      <BeforeAfter />

      {/* Conteúdo educativo */}
      <EducationalTips />

      {/* Perguntas frequentes */}
      <HomeFaq />
      
      {/* Seção CTA - Contato/Demo */}
      <Solutions />
      
      {/* Footer com política de privacidade */}
      <Footer />
    </main>
  );
};

export default Index;
