import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Features } from "@/components/Features";

const Seguimento = () => {
  return (
    <main
      className="min-h-screen"
      role="main"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <Header />
      <Features enableRouting />
      <Footer />
    </main>
  );
};

export default Seguimento;
