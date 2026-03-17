import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { defaultHeroSlides } from "@/lib/hero-default-slides";
import { loadHeroSlides, type HeroSlide } from "@/lib/hero-slides";

export const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchSlides = async () => {
      const remoteSlides = await loadHeroSlides();

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

  return (
    <section 
      className="relative flex items-center pt-20 pb-32 overflow-hidden bg-gradient-to-br from-cyan-light via-blue-medium to-purple-medium"
      role="region"
      aria-label="Seção principal - Hero"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      <div className="container mx-auto px-4 py-20">
        <Carousel
          setApi={setCarouselApi}
          opts={{ loop: true }}
          className="w-full max-w-6xl mx-auto"
          aria-label="Carrossel de destaques da Tag It"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={`${slide.id}:${slide.image}`}>
                <div className="grid md:grid-cols-2 gap-12 items-center md:translate-x-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-primary-foreground w-full max-w-xl mx-auto translate-x-[6px]"
                  >
                    <h1
                      className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                      itemProp={index === 0 ? "headline" : undefined}
                    >
                      {slide.title}
                    </h1>

                    <p
                      className="text-xl md:text-2xl mb-8 font-light leading-relaxed opacity-95"
                      itemProp={index === 0 ? "description" : undefined}
                    >
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Button
                        size="lg"
                        className="text-lg px-8 py-6 rounded-full font-bold shadow-lg hover:scale-105 transition-transform bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        asChild
                      >
                        <a href={slide.primaryCtaHref}>{slide.primaryCtaLabel}</a>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-6 rounded-full font-bold border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all"
                        asChild
                      >
                        <a href={slide.secondaryCtaHref}>{slide.secondaryCtaLabel}</a>
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex flex-col gap-8 items-center w-full max-w-xl mx-auto"
                  >
                    <picture>
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
                        loading="eager"
                        itemProp={index === 0 ? "image" : undefined}
                        width={400}
                        height={400}
                      />
                    </picture>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-3 md:-left-4 lg:-left-14 bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90" />
          <CarouselNext className="right-3 md:right-0 lg:-right-10 bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90" />

          <div className="mt-8 flex justify-center items-center gap-2" aria-label="Indicadores do carrossel">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => carouselApi?.scrollTo(index)}
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={currentSlide === index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-primary-foreground"
                    : "w-2.5 bg-primary-foreground/50 hover:bg-primary-foreground/80"
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Banda animada com benefícios - ARIA Live Region */}
      <div 
        className="absolute bottom-0 left-0 right-0 overflow-hidden h-16"
        role="region"
        aria-live="polite"
        aria-label="Destaques: Localização, Bateria de longa duração, Criptografia ponta a ponta"
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 py-4 bg-foreground/20 backdrop-blur-sm transform -skew-y-2 h-full items-center"
          style={{ width: '300%' }}
          aria-hidden="true"
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-primary-foreground font-bold text-sm">
              <span>✓ Localização</span>
              <span className="mx-4">•</span>
              <span>✓ Bateria de Longa Duração</span>
              <span className="mx-4">•</span>
              <span>✓ Criptografia Ponta a Ponta</span>
              <span className="mx-4">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
