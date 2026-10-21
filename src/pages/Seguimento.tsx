import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Features } from "@/components/Features";
import { ContactActions } from "@/components/ContactActions";
import { segments } from "@/data/segments";
import NotFound from "./NotFound";
export default function Seguimento() {
  const { slug } = useParams();
  const segment = segments.find(item=>item.slug === slug);
  if (slug && !segment) return <NotFound />;
  return <><Header /><main id="conteudo" className="pt-20 sm:pt-24">{segment ? <>
    <section className="bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16"><div className="container mx-auto px-6 max-w-6xl"><a className="text-sm text-primary underline" href="/segmento">Todas as soluções por segmento</a><h1 className="text-4xl sm:text-5xl font-bold mt-6 mb-5">Localização para {segment.title.toLowerCase()}</h1><p className="text-xl text-muted-foreground max-w-3xl mb-7">{segment.description}</p><ContactActions interest={segment.title} label={segment.business ? "Solicitar proposta" : "Solicitar orientação"} business={segment.business} /></div></section>
    <section className="container mx-auto px-6 py-12 max-w-6xl"><div className="grid md:grid-cols-2 gap-10"><div><h2 className="text-2xl font-bold mb-5">Onde aplicar</h2><ul className="space-y-4">{segment.examples.map(text=><li key={text} className="rounded-xl bg-muted p-4">{text}</li>)}</ul></div><div><h2 className="text-2xl font-bold mb-5">Como começar</h2><ol className="list-decimal pl-6 space-y-5 text-muted-foreground">{segment.steps.map(text=><li key={text} className="pl-2">{text}</li>)}</ol><a href="/dispositivos" className="inline-block mt-6 font-semibold text-primary underline">Comparar os dispositivos</a></div></div><div className="mt-12 rounded-2xl border p-6 sm:p-8"><h2 className="text-2xl font-bold mb-4">{segment.question}</h2><p className="text-muted-foreground leading-relaxed">{segment.answer}</p><p className="mt-4 text-sm text-muted-foreground">Alcance Bluetooth e frequência de emissão não equivalem à frequência de atualização remota. Avalie as condições da rede no seu cenário de uso.</p></div></section>
    <section className="bg-muted/50 py-12"><div className="container mx-auto px-6 max-w-6xl"><h2 className="text-3xl font-bold mb-4">Converse sobre o seu cenário</h2><p className="text-muted-foreground mb-6">O assunto {segment.title.toLowerCase()} já acompanha sua solicitação.</p><ContactActions interest={segment.title} label="Falar com a equipe" business={segment.business} /></div></section>
  </> : <Features enableRouting />}</main><Footer /></>;
}
