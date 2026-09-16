import { BatteryMedium, Bluetooth, Cpu, Ruler, Thermometer, Weight } from "lucide-react";
import tagCarrossel from "@/assets/tagcarrosel.webp";
import tagLado from "@/assets/tag_lado.webp";
import ultraTagPerspectiva from "@/assets/ultra-tag-30-perspectiva.webp";
import ultraTagFrente from "@/assets/ultra-tag-30-frente.webp";
import type { DeviceTechnicalSheetData } from "@/components/DeviceTechnicalSheet";

// A ordem desta lista define a ordem das tabelas no site.
// Cada novo modelo tem seus próprios campos, valores e imagens.
export const deviceTechnicalSheets: DeviceTechnicalSheetData[] = [
  {
    id: "ficha-mini-tag",
    title: "Especificações Técnicas do Dispositivo",
    badge: "Mini Tag - Bateria de 12 meses",
    sections: [
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
    ],
    images: [
      { src: tagCarrossel, alt: "Tag IT em vista frontal", width: 800, height: 800 },
      { src: tagLado, alt: "Tag IT em vista lateral", width: 800, height: 800 },
    ],
  },
  {
    id: "ficha-ultra-tag-30",
    title: "Ultra Tag 30",
    badge: "Bateria de até 30 meses",
    sections: [
      {
        icon: Cpu,
        title: "Parâmetros Gerais",
        rows: [
          { label: "Modelo", value: "Ultra Tag 30" },
          { label: "Tipo de Dispositivo", value: "Tag BLE para localização de ativos" },
          { label: "Aplicação", value: "Gestão e rastreamento de ativos" },
          { label: "Material da Caixa", value: "ABS" },
          { label: "Cor", value: "Preto" },
          { label: "Dimensões", value: "36 x 7,9 mm (diâmetro x espessura)", icon: Ruler },
          { label: "Peso", value: "Aproximadamente 12 g", icon: Weight },
          { label: "Instalação", value: "Adesivo ou fixação" },
          { label: "Índice de Proteção", value: "IP67 (proteção contra água e poeira)" },
          { label: "Bateria", value: "CR2450 substituível", icon: BatteryMedium },
          { label: "Capacidade da Bateria", value: "600 mAh" },
          { label: "Duração da Bateria", value: "Até 30 meses", icon: BatteryMedium },
          { label: "Troca de Bateria", value: "Acesso pela abertura lateral" },
        ],
      },
      {
        icon: Bluetooth,
        title: "Conectividade e Operação",
        rows: [
          { label: "Tecnologia", value: "Bluetooth Low Energy (BLE) 5.0" },
          { label: "Chipset", value: "nRF52832" },
          { label: "Comunicação", value: "Beacon BLE" },
          { label: "Sistema Suportado", value: "iOS / Android" },
          { label: "Alcance de Leitura", value: "Até 150 m em campo aberto" },
          { label: "Intervalo de Emissão Bluetooth (ADV)", value: "A cada 5 segundos (não equivale à atualização remota)" },
          { label: "Potência de Transmissão", value: "Configurável" },
          { label: "Segurança", value: "Suporta criptografia" },
          { label: "Atualização de Firmware", value: "Conexão física via J-Link" },
          { label: "Conexões Elétricas Externas", value: "Não possui; comunicação via BLE" },
          { label: "Temperatura de Operação", value: "-20°C a +60°C", icon: Thermometer },
          { label: "Temperatura de Armazenamento", value: "-30°C a +70°C", icon: Thermometer },
          { label: "Umidade de Operação", value: "0% a 95%, sem condensação" },
        ],
      },
    ],
    images: [
      { src: ultraTagPerspectiva, alt: "Ultra Tag 30 em perspectiva", width: 700, height: 729 },
      { src: ultraTagFrente, alt: "Ultra Tag 30 em vista frontal", width: 221, height: 220 },
    ],
    notes: [
      "A duração da bateria e o alcance variam conforme o intervalo de transmissão, a potência configurada e o ambiente de uso.",
      "O alcance de até 150 m refere-se à leitura Bluetooth em campo aberto. A localização remota depende da disponibilidade de dispositivos e redes compatíveis na região.",
    ],
  },
];
