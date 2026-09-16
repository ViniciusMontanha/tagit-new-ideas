import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import tagCarrossel from "@/assets/tagcarrosel.webp";
import tagLado from "@/assets/tag_lado.webp";
import {
  BarChart3,
  BatteryMedium,
  Bluetooth,
  Image as ImageIcon,
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
    description: "A Mini Tag utiliza bateria CR2032 substituível, com autonomia de até 12 meses em standby. A duração varia conforme o uso.",
  },
  {
    icon: Globe,
    title: "Condições de cobertura",
    description:
      "A localização remota depende da disponibilidade de dispositivos e redes compatíveis na região. A atualização pode variar conforme o ambiente.",
  },
  {
    icon: Thermometer,
    title: "Ampla Faixa de Temperatura de Operação",
    description: "A faixa de trabalho da Mini Tag é de -20°C a +60°C. Para armazenamento, a ficha informa -20°C a +70°C.",
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
      { label: "Tipo de Produto", value: "Localizador de objetos" },
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
      { label: "Intervalo de emissão Bluetooth", value: "A cada 2 segundos (não equivale à atualização remota)" },
      { label: "Protocolo de Comunicação", value: "Bluetooth + Transmissão" },
      { label: "Sistema Suportado", value: "iOS / Android" },
      { label: "", value: "" },
      { label: "Desempenho e Operação", value: "", icon: Thermometer },
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
      className="py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-primary/5 to-background"
      role="region"
      aria-labelledby="dispositivo-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            <Cpu className="h-4 w-4" />
            Mini Tag — especificações do modelo
          </div>

          <h2
            id="dispositivo-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            itemProp="name"
          >
            Dispositivo <span className="bg-gradient-hero bg-clip-text text-transparent">Tag IT</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" itemProp="description">
            Mini Tag: localizador compacto com Bluetooth e bateria substituível. Conheça as especificações e as condições de uso deste modelo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {dispositivoHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-5 sm:p-6 md:p-7 border-border/80 bg-card/85 backdrop-blur-sm hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 p-3 shrink-0">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mt-10 sm:mt-14">
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
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight mb-2">{spec.title}</h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{spec.description}</p>
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
          className="max-w-6xl mx-auto mt-12 sm:mt-16"
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {technicalSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: sectionIndex * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full p-5 border-border/70 bg-background/85">
                    <div className="flex items-center gap-2 mb-4">
                      <section.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      <h4 className="text-lg font-semibold text-foreground">{section.title}</h4>
                    </div>

                    <div className="divide-y divide-border/70">
                      {section.rows.map((row, rowIndex) => (
                        <div key={`${section.title}-${row.label || "linha"}-${rowIndex}`} className="py-2.5 flex flex-col gap-1">
                          {row.label ? (
                            <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                              {row.icon ? <row.icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                              <span>{row.label}</span>
                            </div>
                          ) : null}
                          {row.value ? (
                            <p className="text-sm md:text-base font-semibold text-foreground leading-snug">{row.value}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-5 border-border/70 bg-background/85">
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h4 className="text-lg font-semibold text-foreground">Imagens do Dispositivo</h4>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-1">
                      <img
                        src={tagCarrossel}
                        alt="Tag IT em vista frontal"
                        className="w-full h-auto max-h-52 object-contain mx-auto"
                        loading="lazy"
                        width={800}
                        height={800}
                      />
                    </div>

                    <div className="p-1">
                      <img
                        src={tagLado}
                        alt="Tag IT em vista lateral"
                        className="w-full h-auto max-h-52 object-contain mx-auto"
                        loading="lazy"
                        width={800}
                        height={800}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
