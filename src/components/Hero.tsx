import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { defaultHeroSlides } from "@/lib/hero-default-slides";
import { loadHeroSlides, type HeroSlide } from "@/lib/hero-slides";

export const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [isSlidesLoaded, setIsSlidesLoaded] = useState(false);
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
      setIsSlidesLoaded(true);
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
      className="hero-section relative flex items-center pt-24 max-[400px]:pt-20 md:pt-20 pb-20 max-[400px]:pb-12 sm:pb-24 md:pb-32 overflow-hidden bg-gradient-to-br from-cyan-light via-blue-medium to-purple-medium"
      role="region"
      aria-label="Seção principal - Hero"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      <div className="container mx-auto px-4 py-10 max-[400px]:py-6 sm:py-14 md:py-20">
        <Carousel
          setApi={setCarouselApi}
          opts={{ loop: true }}
          className="w-full max-w-6xl mx-auto"
          aria-label="Carrossel de destaques da Tag It"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={`${slide.id}:${slide.image}`}>
                <div className="grid md:grid-cols-2 gap-8 max-[400px]:gap-6 md:gap-12 items-center md:translate-x-4 lg:translate-x-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-primary-foreground w-full max-w-xl mx-auto"
                  >
                    {isSlidesLoaded ? (
                      <>
                        <h1
                          className="text-3xl max-[400px]:text-2xl sm:text-4xl md:text-6xl font-bold mb-5 max-[400px]:mb-4 md:mb-6 leading-tight"
                          itemProp={index === 0 ? "headline" : undefined}
                        >
                          {slide.title}
                        </h1>

                        <p
                          className="text-lg max-[400px]:text-base sm:text-xl md:text-2xl mb-6 max-[400px]:mb-5 md:mb-8 font-light leading-relaxed opacity-95"
                          itemProp={index === 0 ? "description" : undefined}
                        >
                          {slide.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                          <Button
                            size="lg"
                            className="w-full sm:w-auto justify-center text-base max-[400px]:text-sm sm:text-lg px-6 sm:px-8 py-4 max-[400px]:py-3.5 sm:py-6 rounded-full font-bold shadow-lg hover:scale-105 transition-transform bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                            asChild
                          >
                            <a href={slide.primaryCtaHref}>{slide.primaryCtaLabel}</a>
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto justify-center text-base max-[400px]:text-sm sm:text-lg px-6 sm:px-8 py-4 max-[400px]:py-3.5 sm:py-6 rounded-full font-bold border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all"
                            asChild
                          >
                            <a href={slide.secondaryCtaHref}>{slide.secondaryCtaLabel}</a>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-5" aria-hidden="true">
                        <div className="h-10 sm:h-12 md:h-16 w-11/12 bg-primary-foreground/25 rounded-md" />
                        <div className="h-10 sm:h-12 md:h-16 w-10/12 bg-primary-foreground/25 rounded-md" />
                        <div className="h-8 sm:h-9 md:h-10 w-full bg-primary-foreground/20 rounded-md" />
                        <div className="h-8 sm:h-9 md:h-10 w-4/5 bg-primary-foreground/20 rounded-md" />
                        <div className="flex flex-wrap gap-4 pt-1">
                          <div className="h-12 sm:h-14 w-40 sm:w-52 bg-primary-foreground/25 rounded-full" />
                          <div className="h-12 sm:h-14 w-40 sm:w-52 bg-primary-foreground/20 rounded-full" />
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex flex-col gap-8 items-center w-full max-w-xl mx-auto"
                  >
                    {isSlidesLoaded ? (
                      <picture>
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          className="w-full h-auto max-w-[260px] max-[400px]:max-w-[220px] sm:max-w-sm md:max-w-md mx-auto drop-shadow-2xl"
                          loading="eager"
                          itemProp={index === 0 ? "image" : undefined}
                          width={400}
                          height={400}
                        />
                      </picture>
                    ) : (
                      <div
                        className="w-full h-auto max-w-[260px] max-[400px]:max-w-[220px] sm:max-w-sm md:max-w-md mx-auto rounded-3xl bg-primary-foreground/20 animate-pulse"
                        style={{ aspectRatio: "1 / 1" }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:inline-flex left-2 md:-left-4 lg:-left-14 bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90" />
          <CarouselNext className="hidden sm:inline-flex right-2 md:right-0 lg:-right-10 bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90" />

          <div className="mt-6 sm:mt-8 flex justify-center items-center gap-2" aria-label="Indicadores do carrossel">
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
        className="hero-ticker absolute bottom-0 left-0 right-0 overflow-hidden h-12 sm:h-16"
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
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-primary-foreground font-bold text-xs sm:text-sm">
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
