import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Enterprise } from "@/components/Enterprise";

const Empresas = () => {
  return (
    <main
      className="min-h-screen"
      role="main"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <Header />
      <Enterprise />
      <Footer />
    </main>
  );
};

export default Empresas;
