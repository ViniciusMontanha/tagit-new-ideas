import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Activity,
  BarChart3,
  BatteryMedium,
  Bluetooth,
  Briefcase,
  Building2,
  Cpu,
  Globe,
  MapPinned,
  Ruler,
  Shield,
  Thermometer,
  Weight,
  Wrench,
} from "lucide-react";

const deviceSpecs = [
  {
    icon: BatteryMedium,
    title: "Baixo Consumo de Energia",
    description: "A bateria interna pode alimentar o dispositivo para operar por até 30 meses.",
  },
  {
    icon: Globe,
    title: "Disponibilidade Global",
    description:
      "O dispositivo pode ser usado em qualquer lugar do mundo, pois não depende de redes celulares para comunicação e as diferentes bandas de frequência não são mais um problema.",
  },
  {
    icon: Thermometer,
    title: "Ampla Faixa de Temperatura de Operação",
    description: "O dispositivo pode operar corretamente entre -20°C e +70°C.",
  },
  {
    icon: Wrench,
    title: "Instalação Flexível",
    description:
      "O dispositivo pode ser instalado por meio de uma fita adesiva dupla face 3M ou simplesmente encaixado em seus objetos de valor, tornando-o adequado para vários cenários.",
  },
  {
    icon: MapPinned,
    title: "Alerta de Cerca Virtual (Geofence)",
    description:
      "Um limite virtual pode ser definido na plataforma; você será notificado quando um ativo rastreado sair ou entrar nesse limite.",
  },
];

const dispositivoHighlights = [
  {
    icon: Globe,
    title: "Plataforma de localização inteligente",
    description:
      "A Tag IT é uma plataforma tecnológica de localização inteligente de ativos, baseada em um modelo crowdsourced de geração de dados globais de posicionamento.",
  },
  {
    icon: Building2,
    title: "Desenhada para operações corporativas",
    description:
      "Projetada para ambientes corporativos que exigem controle, segurança e eficiência operacional, a solução permite ampliar significativamente a visibilidade sobre ativos críticos dentro de operações complexas.",
  },
  {
    icon: Briefcase,
    title: "Proteção de ativos críticos",
    description:
      "A tecnologia foi desenvolvida para atender organizações que precisam proteger e gerir ativos móveis e bens fixos de alto valor, como equipamentos médicos hospitalares, ferramentas operacionais, dispositivos técnicos e recursos logísticos estratégicos.",
  },
  {
    icon: Shield,
    title: "Inteligência operacional aplicada",
    description:
      "Ao transformar dados de localização em inteligência operacional, a Tag IT fortalece a segurança patrimonial, reduz perdas e aumenta a eficiência na gestão de ativos em larga escala.",
  },
  {
    icon: BarChart3,
    title: "Arquitetura escalável para múltiplos setores",
    description:
      "Com uma arquitetura escalável e adaptável a diferentes setores, a plataforma posiciona-se como uma nova infraestrutura tecnológica para gestão e proteção de ativos no ambiente corporativo moderno.",
  },
];

const technicalSections = [
  {
    icon: Cpu,
    title: "Parâmetros Gerais",
    rows: [
      { label: "Modelo", value: "Mini Tag" },
      { label: "Versão", value: "V1.0" },
      { label: "Tipo de Produto", value: "Localizador antifurto" },
      { label: "Estilo de Uso", value: "Discreto / Oculto" },
      { label: "Material", value: "ABS" },
      { label: "Dimensões", value: "31,9 x 9 mm (diâmetro x espessura)", icon: Ruler },
      { label: "Peso", value: "10 g (com bateria)", icon: Weight },
      { label: "Tipo de Bateria", value: "Célula tipo botão substituível CR2032" },
      { label: "Voltagem", value: "3V" },
      { label: "Duração da Bateria (Standby)", value: "Até 12 meses", icon: BatteryMedium },
    ],
  },
  {
    icon: Bluetooth,
    title: "Conectividade",
    rows: [
      { label: "Versão Bluetooth", value: "5.2" },
      { label: "Antena", value: "Integrada" },
      { label: "Frequência de Transmissão", value: "A cada 2 segundos" },
      { label: "Protocolo de Comunicação", value: "Bluetooth + Transmissão" },
      { label: "Sistema Suportado", value: "iOS" },
    ],
  },
  {
    icon: Activity,
    title: "Desempenho e Operação",
    rows: [
      { label: "Alcance em ambientes internos", value: "15 a 25 m" },
      { label: "Alcance ao ar livre", value: "50 a 70 m" },
      { label: "Temperatura de Trabalho", value: "-20°C a +60°C", icon: Thermometer },
      { label: "Temperatura de Armazenamento", value: "-20°C a +70°C", icon: Thermometer },
    ],
  },
];

export const Dispositivo = () => {
  return (
    <section
      id="dispositivo"
      className="py-20 bg-gradient-to-b from-background via-primary/5 to-background"
      role="region"
      aria-labelledby="dispositivo-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Cpu className="h-4 w-4" />
            Tecnologia do Dispositivo
          </div>

          <h2
            id="dispositivo-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            itemProp="name"
          >
            Dispositivo <span className="bg-gradient-hero bg-clip-text text-transparent">Tag IT</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" itemProp="description">
            Uma infraestrutura moderna para gestão e proteção de ativos com visibilidade contínua em operações complexas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {dispositivoHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 md:p-7 border-border/80 bg-card/85 backdrop-blur-sm hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 p-3 shrink-0">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-14">
          {deviceSpecs.map((spec, index) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-3 shadow-soft shrink-0">
                  <spec.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground leading-tight mb-2">{spec.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{spec.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-16"
        >
          <Card className="p-6 md:p-8 border-border/80 bg-card/90 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">Especificações Técnicas do Dispositivo</h3>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
                Mini Tag - Bateria de 12 meses
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {technicalSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: sectionIndex * 0.08 }}
                  viewport={{ once: true }}
                  className={
                    section.title === "Parâmetros Gerais"
                      ? "lg:row-span-2"
                      : section.title === "Desempenho e Operação"
                        ? "lg:row-start-2 lg:col-start-2"
                        : ""
                  }
                >
                  <Card className="h-full p-5 border-border/70 bg-background/85">
                    <div className="flex items-center gap-2 mb-4">
                      <section.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      <h4 className="text-lg font-semibold text-foreground">{section.title}</h4>
                    </div>

                    <div className="divide-y divide-border/70">
                      {section.rows.map((row) => (
                        <div key={row.label} className="py-2.5 flex flex-col gap-1">
                          <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                            {row.icon ? <row.icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                            <span>{row.label}</span>
                          </div>
                          <p className="text-sm md:text-base font-semibold text-foreground leading-snug">{row.value}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
