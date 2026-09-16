import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Hammer,
  PawPrint,
  Briefcase,
  CheckCircle2,
  MapPin,
  Shield,
  Clock3,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type FeatureItem = {
  slug: string;
  icon: typeof Truck;
  title: string;
  description: string;
  modalDescription: string;
  highlights: string[];
};

const features: FeatureItem[] = [
  {
    slug: "logistica",
    icon: Truck,
    title: "Logística",
    description: "Mais controle de cargas, equipamentos e prazos de entrega com visibilidade na plataforma.",
    modalDescription:
      "Acompanhe ativos em rota, organize entregas e tenha visão rápida dos pontos críticos da operação.",
    highlights: [
      "Consulta da localização disponível de cargas e equipamentos",
      "Menos atrasos em coletas e entregas",
      "Decisões apoiadas nas atualizações disponíveis",
    ],
  },
  {
    slug: "construcao",
    icon: Hammer,
    title: "Construção",
    description: "Localize ferramentas e máquinas no canteiro e reduza perdas operacionais.",
    modalDescription:
      "Ganhe controle do canteiro com a localização prática de máquinas e ferramentas usadas no dia a dia.",
    highlights: [
      "Localização de itens de alto valor",
      "Menos extravio e retrabalho na obra",
      "Mais produtividade com equipe coordenada",
    ],
  },
  {
    slug: "pet",
    icon: PawPrint,
    title: "Pet",
    description: "Acompanhe a localização do seu pet com mais tranquilidade no dia a dia.",
    modalDescription:
      "Monitore deslocamentos e tenha mais segurança para passeios, viagens e rotina fora de casa.",
    highlights: [
      "Visualização de localização em poucos toques",
      "Mais tranquilidade em áreas abertas",
      "Apoio para rotinas com pets mais ativos",
    ],
  },
  {
    slug: "uso-pessoal",
    icon: Briefcase,
    title: "Uso Pessoal",
    description: "Tenha seus itens essenciais sempre no radar e evite perder tempo procurando.",
    modalDescription:
      "Ideal para quem quer praticidade na rotina, mantendo mochila, mala ou objetos importantes sempre localizáveis.",
    highlights: [
      "Encontre itens pessoais com rapidez",
      "Mais organização na rotina diária",
      "Menos estresse com perdas e esquecimentos",
    ],
  },
];

type FeaturesProps = {
  enableRouting?: boolean;
};

export const Features = ({ enableRouting = false }: FeaturesProps) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();

  const routeBase = location.pathname.startsWith("/segmento") ? "/segmento" : "/seguimento";

  useEffect(() => {
    if (!enableRouting) {
      return;
    }

    if (!slug) {
      setSelectedFeature(null);
      return;
    }

    const matchedFeature = features.find((feature) => feature.slug === slug) ?? null;
    setSelectedFeature(matchedFeature);
  }, [enableRouting, slug]);

  const openFeatureModal = (feature: FeatureItem) => {
    if (enableRouting) {
      navigate(`${routeBase}/${feature.slug}`);
      return;
    }

    setSelectedFeature(feature);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      return;
    }

    if (enableRouting) {
      navigate(routeBase);
      return;
    }

    setSelectedFeature(null);
  };

  const Heading = enableRouting ? "h1" : "h2";
  return (
    <section id="recursos" className={`${enableRouting ? "pt-28 sm:pt-32" : "pt-8 sm:pt-10"} scroll-mt-24 pb-12 sm:pb-16 bg-background`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <Heading className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Aplicações por <span className="bg-gradient-hero bg-clip-text text-transparent">segmento</span>
          </Heading>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Veja como a Tag It se adapta rápido ao seu cenário de operação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                type="button"
                onClick={() => openFeatureModal(feature)}
                aria-label={`Abrir detalhes do segmento ${feature.title}`}
                className="w-full h-full text-left"
              >
                <Card className="p-5 sm:p-6 h-full hover:shadow-soft transition-all duration-500 border hover:border-primary/20 bg-card/80 backdrop-blur-sm group">
                  <div className="mb-4 inline-block p-3 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-2xl group-hover:bg-gradient-hero transition-all duration-500">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </button>
            </motion.div>
          ))}
        </div>

        <Dialog open={Boolean(selectedFeature)} onOpenChange={handleOpenChange}>
          <DialogContent className="w-[95vw] sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
            {selectedFeature && (
              <div className="space-y-6">
                <DialogHeader className="text-left">
                  <div className="mb-1 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Segmento
                  </div>
                  <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-foreground">
                    <selectedFeature.icon className="h-6 w-6 text-primary" />
                    {selectedFeature.title}
                  </DialogTitle>
                  <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                    {selectedFeature.modalDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="rounded-xl border bg-card p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Como a Tag It ajuda nesse cenário
                  </div>
                  <ul className="space-y-3">
                    {selectedFeature.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4 text-primary" />
                  Conteúdo resumido para leitura rápida.
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
