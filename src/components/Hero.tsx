import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSlide } from "@/lib/hero-slides";
import snapshot from "@/data/hero-slides.snapshot.json";
import { normalizePublicSlide, publicSlidesFromRows } from "@/lib/hero-content.js";
import { defaultHeroImage } from "@/lib/hero-default-slides";

export const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(() => snapshot.map(slide => normalizePublicSlide(slide)));
  const [current, setCurrent] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    const api = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    if (!api) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    fetch(`${api}/api/hero-slides`, { signal: controller.signal }).then(response => response.ok ? response.json() : null).then(data => {
      const next = publicSlidesFromRows(data?.slides);
      if (!controller.signal.aborted && next.length) { setSlides(next); setCurrent(index => Math.min(index, next.length - 1)); }
    }).catch(() => { /* Keep the configured, prerendered copy available. */ }).finally(() => clearTimeout(timeout));
    return () => { controller.abort(); clearTimeout(timeout); };
  }, []);
  useEffect(() => {
    if (!rotating || interacting || slides.length < 2) return;
    const id = window.setInterval(() => { if (!document.hidden) setCurrent(index => (index + 1) % slides.length); }, 10000);
    return () => window.clearInterval(id);
  }, [rotating, interacting, slides.length]);
  const slide = slides[current] || slides[0];
  const choose = (index: number) => { setCurrent((index + slides.length) % slides.length); setRotating(false); };
  return <section aria-label="Destaques da Tag It" className="bg-gradient-hero text-white pt-28 sm:pt-36 pb-10 sm:pb-14" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <div className="container mx-auto px-6 max-w-7xl"><div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center min-h-[430px]">
      <div><p className="text-sm font-semibold tracking-wide mb-5">LOCALIZAÇÃO INTELIGENTE · APLICATIVO PRÓPRIO</p><h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">{slide.title}</h1><p className="text-lg sm:text-xl leading-relaxed mb-7">{slide.description}</p><div className="flex flex-col sm:flex-row flex-wrap gap-3"><Button size="lg" asChild className="bg-white text-primary hover:bg-white/90"><a href={slide.primaryCtaHref} data-contact-source="Banner principal">{slide.primaryCtaLabel}</a></Button><Button size="lg" asChild variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-primary"><a href={slide.secondaryCtaHref} data-contact-source="Banner principal">{slide.secondaryCtaLabel}</a></Button></div><p className="text-sm leading-relaxed mt-6">Consulte a última localização disponível. A frequência de atualização depende da rede compatível e do ambiente.</p></div>
      <div className="aspect-square w-full max-w-[340px] lg:max-w-[420px] mx-auto"><img key={slide.image} src={slide.image} alt={slide.imageAlt} width={500} height={500} loading="eager" fetchPriority={current === 0 ? "high" : "auto"} decoding="async" className="w-full h-full object-contain" onError={event=>{ if (event.currentTarget.getAttribute("src") !== defaultHeroImage) event.currentTarget.src = defaultHeroImage; }} /></div>
    </div><div className="mt-8 flex flex-wrap justify-center items-center gap-2" aria-label="Controles dos destaques"><button type="button" className="h-11 w-11 rounded-full border border-white flex items-center justify-center" aria-label="Destaque anterior" onClick={()=>choose(current-1)}><ChevronLeft aria-hidden="true" /></button><p className="px-3 text-sm" aria-live={rotating ? "off" : "polite"}>Destaque {current+1} de {slides.length}</p><button type="button" className="h-11 w-11 rounded-full border border-white flex items-center justify-center" aria-label="Próximo destaque" onClick={()=>choose(current+1)}><ChevronRight aria-hidden="true" /></button><button type="button" className="min-h-11 px-4 underline text-sm" aria-pressed={rotating} onClick={()=>setRotating(!rotating)}>{rotating ? "Pausar rotação" : "Ativar rotação"}</button></div></div>
  </section>;
};
