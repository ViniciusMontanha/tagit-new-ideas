import tagProduct from "@/assets/tag_branca_logo.png";
import type { HeroSlide } from "@/lib/hero-slides";

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Localize e proteja seus ativos em segundos",
    description:
      "Mais controle, menos perdas e decisões mais rápidas para empresas e para você com tecnologia de localização inteligente.",
    image: tagProduct,
    imageAlt: "Produto Tag It - Localizador de Ativos com Tecnologia GPS Avançada",
    primaryCtaLabel: "PARA EMPRESAS",
    primaryCtaHref: "/para-empresas",
    secondaryCtaLabel: "PARA VOCÊ",
    secondaryCtaHref: "/para-voce",
  },
  {
    id: "slide-2",
    title: "Tenha visibilidade total dos seus ativos na plataforma",
    description:
      "Acompanhe movimentações, receba alertas e aja rápido para reduzir perdas e atrasos na operação.",
    image: tagProduct,
    imageAlt: "Plataforma Tag It para localização inteligente de ativos",
    primaryCtaLabel: "SOLICITAR DEMO",
    primaryCtaHref: "/para-empresas",
    secondaryCtaLabel: "VER PARA VOCÊ",
    secondaryCtaHref: "/para-voce",
  },
];

export const createEmptyHeroSlide = (): HeroSlide => {
  const now = Date.now();

  return {
    id: `slide-${now}`,
    title: "Novo slide",
    description: "Descreva aqui o conteúdo do novo slide.",
    image: tagProduct,
    imageAlt: "Imagem do slide",
    primaryCtaLabel: "BOTÃO PRINCIPAL",
    primaryCtaHref: "/para-empresas",
    secondaryCtaLabel: "BOTÃO SECUNDÁRIO",
    secondaryCtaHref: "/para-voce",
  };
};
