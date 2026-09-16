import tagProduct from "@/assets/tag-product-new.webp";
import type { HeroSlide } from "@/lib/hero-slides";

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Mais visibilidade sobre seus ativos",
    description:
      "Mais controle, menos perdas e decisões mais rápidas para empresas e para você com tecnologia de localização inteligente.",
    image: tagProduct,
    imageAlt: "Mini Tag para localização de objetos",
    primaryCtaLabel: "PARA EMPRESAS",
    primaryCtaHref: "/para-empresas",
    secondaryCtaLabel: "PARA VOCÊ",
    secondaryCtaHref: "/para-voce",
  },
  {
    id: "slide-2",
    title: "Consulte seus ativos na plataforma",
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
