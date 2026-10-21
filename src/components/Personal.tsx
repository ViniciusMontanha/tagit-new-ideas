import { ContactActions } from "@/components/ContactActions";
import { companyWhatsApp } from "@/lib/contact";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Heart, PawPrint } from "lucide-react";
import tagProduct from "@/assets/tag_branca_logo.webp";
import coleirGolden from "@/assets/Coleira_golden.webp";

const benefits = [
  {
    icon: Heart,
    title: "Ajuda para encontrar seus pertences",
    description: "Consulte a localização disponível de chaves, mochila e outros objetos pelo aplicativo compatível.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description: "Receba notificações quando esquecer algo importante para trás.",
  },
  {
    icon: Heart,
    title: "Monitore seu Pet com conforto e tecnologia",
    description: "Um apoio à localização do seu pet, sujeito às condições da rede e sem substituir a supervisão.",
  },
  {
    icon: PawPrint,
    title: "Fácil de usar",
    description: "Interface intuitiva que qualquer pessoa pode usar, sem complicações.",
  },
];

export const Personal = () => {
  return (
    <section id="para-voce" className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight">
            Para <span className="bg-gradient-purple bg-clip-text text-transparent">Você</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            Encontre objetos do dia a dia com tecnologia de localização inteligente.
          </p>
        </div>

        <p className="max-w-3xl mx-auto mb-8 text-center text-muted-foreground">A Tag It utiliza aplicativo próprio. A ficha da Mini Tag informa suporte a iOS e Android; confirme a versão do celular, a ativação e os recursos do modelo escolhido com nossa equipe.</p>

        <div className="flex justify-center mb-10"><ContactActions interest="Uso pessoal" label="Consultar modelo e compra" /></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 sm:mb-16 items-center max-w-7xl mx-auto">
          <div
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-1 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                >
                  <Card className="p-5 sm:p-6 md:p-8 hover:shadow-soft transition-all duration-500 border hover:border-secondary/20 bg-card/80 backdrop-blur-sm group">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-gradient-purple rounded-2xl shadow-purple group-hover:scale-105 transition-transform duration-500">
                        <benefit.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                        <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div
            className="order-1 lg:order-2 space-y-8"
          >
            <div className="relative">
              <div className="absolute inset-0"></div>
              <img
                src={tagProduct}
                alt="Tag It - Dispositivo de localização inteligente"
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
            <div className="relative">
              <img
                src={coleirGolden}
                alt="Coleira Golden - Rastreador para pets Tag It"
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-strong"
              />
            </div>
          </div>
        </div>

        <div
          className="text-center"
        >
          <Button size="lg" className="text-base px-6 sm:px-10 py-6 sm:py-7 rounded-full shadow-purple hover:shadow-strong transition-all bg-secondary hover:bg-secondary/90 w-full sm:w-auto" asChild>
            <a href={companyWhatsApp()} target="_blank" rel="noopener noreferrer">
            Consultar compra pelo WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
