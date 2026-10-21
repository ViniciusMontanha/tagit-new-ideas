import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    title: "Ative sua Tag It",
    description: "Escolha o modelo e ative o dispositivo com a orientação da nossa equipe.",
  },
  {
    number: "2",
    title: "Acompanhe no aplicativo",
    description: "Consulte a última localização disponível no aplicativo próprio da Tag It.",
  },
  {
    number: "3",
    title: "Use as informações na sua rotina",
    description: "Observe a data da atualização e utilize os recursos disponíveis para o seu modelo.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="pt-10 sm:pt-12 pb-14 sm:pb-16 lg:pb-20 bg-gradient-to-b from-primary/5 to-background" role="region" aria-labelledby="como-funciona-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className="text-center mb-10 sm:mb-12"
        >
          <h2 id="como-funciona-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Como funciona em <span className="bg-gradient-hero bg-clip-text text-transparent">3 passos</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Simples de usar, rápido para começar e focado em resultado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 sm:mb-10">
          {steps.map((step, index) => (
            <div
              key={step.number}
            >
              <Card className="p-5 sm:p-6 md:p-8 h-full border hover:border-primary/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline" className="rounded-full px-6 sm:px-8 w-full sm:w-auto">
            <a href="/para-voce">Quero ver para uso pessoal</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
