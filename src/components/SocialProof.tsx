import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const applications = [
  { title: "Na empresa", description: "Organize a localização de ferramentas, equipamentos e outros ativos da operação." },
  { title: "No dia a dia", description: "Use uma tag compatível com seu celular para ajudar a encontrar objetos pessoais." },
  { title: "Na escolha do modelo", description: "Converse com a equipe sobre autonomia, compatibilidade e condições de cobertura." },
];

export const SocialProof = () => (
  <section className="py-14 sm:py-16 lg:py-20 bg-background" aria-labelledby="prova-social-heading">
    <div className="container mx-auto px-4 sm:px-6 lg:px-10">
      <h2 id="prova-social-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">Localização para a sua rotina</h2>
      <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto">Conheça as aplicações e escolha a solução adequada ao seu cenário.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
        {applications.map(item => <Card key={item.title} className="p-6"><h3 className="text-xl font-semibold mb-3">{item.title}</h3><p className="text-muted-foreground">{item.description}</p></Card>)}
      </div>
      <div className="flex justify-center"><Button asChild className="rounded-full px-8"><a href="/para-empresas">Conhecer a solução empresarial</a></Button></div>
    </div>
  </section>
);
