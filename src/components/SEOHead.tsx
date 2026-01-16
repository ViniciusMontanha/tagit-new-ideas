/**
 * Componente SEOHead - Gerencia Schema.org e metadados para cada seção
 * Otimizado para Google Search e indexação
 */

interface SEOHeadProps {
  title: string;
  description: string;
  structuredData?: Record<string, unknown>;
  section?: string;
}

export const SEOHead = ({ title, description, structuredData }: SEOHeadProps) => {
  // Este componente é informativo - em um projeto real com SSR/SSG, 
  // você usaria react-helmet ou next/head para manipular o DOM
  
  return (
    <>
      {/* O schema estruturado deve estar no HTML principal */}
      {structuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  );
};
