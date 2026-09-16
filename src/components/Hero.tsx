import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { defaultHeroSlides } from "@/lib/hero-default-slides";
import { loadHeroSlides, type HeroSlide } from "@/lib/hero-slides";

export const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchSlides = async () => {
      const remoteSlides = await loadHeroSlides().catch(() => null);

      if (!isMounted) {
        return;
      }

      setSlides(remoteSlides ?? defaultHeroSlides);

    };

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || slides.length <= 1 || paused || interacting || reducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (document.hidden) {
        return;
      }

      carouselApi.scrollNext();
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [carouselApi, slides.length, paused, interacting, reducedMotion]);

  return (
    <section
      className="hero-section relative flex items-center pt-24 max-[400px]:pt-20 md:pt-20 pb-16 max-[400px]:pb-12 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden bg-gradient-to-br from-cyan-light via-blue-medium to-purple-medium"
      role="region"
      aria-label="Seção principal - Hero"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="mx-auto w-[min(96vw,1680px)] px-3 sm:px-4 md:px-6 lg:px-8 py-8 max-[400px]:py-6 sm:py-12 md:py-16 lg:py-20">
        <Carousel
          setApi={setCarouselApi}
          opts={{ loop: true }}
          className="w-full mx-auto"
          aria-label="Carrossel de destaques da Tag It"
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocusCapture={() => setInteracting(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
        >
          <CarouselContent>
            {slides.map((slide, index) => {
              const Heading = index === 0 ? "h1" : "h2";
              return (
              <CarouselItem key={`${slide.id}:${slide.image}`} aria-hidden={index !== currentSlide}>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center md:translate-x-0 xl:translate-x-4">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-primary-foreground w-full max-w-xl mx-auto text-center md:text-left"
                  >
                        <Heading
                          className="text-3xl max-[400px]:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight"
                          itemProp={index === 0 ? "headline" : undefined}
                        >
                          {slide.title}
                        </Heading>

                        <p
                          className="text-base max-[400px]:text-sm sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-6 md:mb-8 font-light leading-relaxed opacity-95"
                          itemProp={index === 0 ? "description" : undefined}
                        >
                          {slide.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 md:justify-start">
                          <Button
                            size="lg"
                            className="w-full sm:w-auto justify-center text-base max-[400px]:text-sm sm:text-lg px-6 sm:px-8 py-4 max-[400px]:py-3.5 sm:py-6 rounded-full font-bold shadow-lg hover:scale-105 transition-transform bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                            asChild
                          >
                            <a tabIndex={index === currentSlide ? 0 : -1} href={slide.primaryCtaHref}>{slide.primaryCtaLabel}</a>
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto justify-center text-base max-[400px]:text-sm sm:text-lg px-6 sm:px-8 py-4 max-[400px]:py-3.5 sm:py-6 rounded-full font-bold border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all"
                            asChild
                          >
                            <a tabIndex={index === currentSlide ? 0 : -1} href={slide.secondaryCtaHref}>{slide.secondaryCtaLabel}</a>
                          </Button>
                        </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex flex-col gap-6 sm:gap-8 items-center w-full max-w-xl mx-auto"
                  >
                      <picture>
                        <img
                          src={index === 0 || Math.abs(index - currentSlide) <= 1 ? slide.image : undefined}
                          alt={slide.imageAlt}
                          className="w-full h-auto max-w-[240px] max-[400px]:max-w-[210px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto drop-shadow-2xl"
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "low"}
                          decoding="async"
                          itemProp={index === 0 ? "image" : undefined}
                          width={400}
                          height={400}
                        />
                      </picture>
                  </motion.div>
                </div>
              </CarouselItem>
            ); })}
          </CarouselContent>

          <CarouselPrevious className="hidden md:inline-flex left-2 lg:-left-6 xl:-left-10 bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90" />
          <CarouselNext className="hidden md:inline-flex right-2 lg:-right-2 xl:-right-8 bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90" />

          <div className="mt-5 sm:mt-6 md:mt-8 flex justify-center items-center gap-2" aria-label="Indicadores do carrossel">
            {!reducedMotion && <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} className="rounded-full border border-white/70 px-3 py-2 text-xs text-white">{paused ? "Ativar rotação" : "Pausar rotação"}</button>}
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => carouselApi?.scrollTo(index)}
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={currentSlide === index}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-7 sm:w-8 bg-primary-foreground"
                    : "w-2 sm:w-2.5 bg-primary-foreground/50 hover:bg-primary-foreground/80"
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      <div className="absolute bottom-0 inset-x-0 flex flex-wrap justify-center gap-x-6 gap-y-1 p-3 bg-foreground/20 text-white text-xs sm:text-sm" aria-label="Destaques da Tag It">
        <span>Localização de ativos</span><span>Bateria substituível</span><span>Atendimento especializado</span>
      </div>
    </section>
  );
};
