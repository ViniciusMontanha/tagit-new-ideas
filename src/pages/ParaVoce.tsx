import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Personal } from "@/components/Personal";

const ParaVoce = () => {
  return (
    <main
      className="min-h-screen"
      role="main"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <Header />
      <Personal />
      <Footer />
    </main>
  );
};

export default ParaVoce;
