import { COMPANY } from "../../backend/src/contact-utils.js";

export const pageMetadata = {
  "/": { title: "Tag It | Localização inteligente de ativos", description: "Localização de ativos para empresas e uso pessoal. Conheça a Mini Tag, veja as condições de uso e fale com a equipe Tag It." },
  "/para-empresas": { title: "Localização de ativos para empresas | Tag It", description: "Conheça a solução Tag It para localizar equipamentos, ferramentas e ativos da empresa. Converse com nossa equipe sobre sua operação." },
  "/para-voce": { title: "Localização de objetos e uso pessoal | Tag It", description: "Conheça a Mini Tag para objetos do dia a dia. Confira compatibilidade, autonomia e condições de localização antes de escolher seu dispositivo." },
  "/quem-somos": { title: "Quem somos | Tag It", description: "Conheça a equipe e a história da Tag It, empresa de localização inteligente de ativos em Ribeirão Preto, São Paulo." },
  "/segmento": { title: "Soluções por segmento | Tag It", description: "Veja aplicações da Tag It em logística, construção, pets e uso pessoal. Encontre a solução adequada ao seu cenário." },
};
for (const [slug, label] of Object.entries({ logistica: "Logística", construcao: "Construção", pet: "Pets", "uso-pessoal": "Uso pessoal" })) {
  pageMetadata[`/segmento/${slug}`] = { title: `${label}: localização de ativos | Tag It`, description: `Conheça aplicações da Tag It para ${label.toLowerCase()} e converse com a equipe sobre compatibilidade e condições de uso.` };
}

export function getPageMetadata(pathname) {
  const path = (pathname.replace(/\/$/, "") || "/").replace(/^\/seguimento(?=\/|$)/, "/segmento");
  const data = pageMetadata[path];
  return { ...(data || { title: "Página não encontrada | Tag It", description: "Acesse a página inicial da Tag It para conhecer nossas soluções." }), canonical: `${COMPANY.website}${path === "/" ? "/" : path}`, noindex: !data };
}

export function structuredData(pathname) {
  const metadata = getPageMetadata(pathname);
  if (metadata.noindex) return null;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${COMPANY.website}/#organization`, name: COMPANY.name, legalName: COMPANY.legalName, url: COMPANY.website, logo: `${COMPANY.website}/favicon.png`, email: COMPANY.email, telephone: COMPANY.phone,
        address: { "@type": "PostalAddress", streetAddress: COMPANY.street, addressLocality: COMPANY.city, addressRegion: COMPANY.region, postalCode: COMPANY.postalCode, addressCountry: "BR" },
        contactPoint: { "@type": "ContactPoint", telephone: COMPANY.phone, email: COMPANY.email, contactType: "customer service", areaServed: "BR", availableLanguage: "pt-BR" },
      },
      { "@type": "WebPage", "@id": metadata.canonical, url: metadata.canonical, name: metadata.title, description: metadata.description, inLanguage: "pt-BR", publisher: { "@id": `${COMPANY.website}/#organization` } },
    ],
  };
}
