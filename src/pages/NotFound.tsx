import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export default function NotFound() {
  return <><Header /><main id="conteudo" className="min-h-[70vh] pt-36 pb-20 px-6 max-w-3xl mx-auto"><p className="text-primary font-semibold mb-3">Erro 404</p><h1 className="text-4xl font-bold mb-5">Página não encontrada</h1><p className="text-lg text-muted-foreground mb-6">Este endereço não está disponível. Acesse nossas soluções ou volte ao início.</p><div className="flex flex-wrap gap-6"><a className="text-primary font-semibold underline" href="/">Ir para o início</a><a className="text-primary font-semibold underline" href="/segmento">Conhecer as soluções</a></div></main><Footer /></>;
}
