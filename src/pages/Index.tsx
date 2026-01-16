import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Personal } from "@/components/Personal";
import { Enterprise } from "@/components/Enterprise";
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
      
      {/* Seção Para Empresas */}
      <Enterprise />
      
      {/* Seção Para Pessoas Físicas */}
      <Personal />
      
      {/* Seção de Recursos/Features */}
      <Features />
      
      {/* Seção CTA - Contato/Demo */}
      <Solutions />
      
      {/* Footer com política de privacidade */}
      <Footer />
    </main>
  );
};

export default Index;
