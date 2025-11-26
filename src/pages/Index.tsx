import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Personal } from "@/components/Personal";
import { Enterprise } from "@/components/Enterprise";
import { Solutions } from "@/components/Solutions";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Personal />
      <Enterprise />
      <Hero />
      <Features />
      <Solutions />
    </main>
  );
};

export default Index;
