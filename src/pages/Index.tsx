import { Header } from "@/components/Header";
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
      
      {/* Footer será adicionado em versão completa */}
    </main>
  );
};

export default Index;
