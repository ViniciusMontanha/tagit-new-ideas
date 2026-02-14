import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const BeforeAfter = () => {
  return (
    <section className="py-20 bg-background" role="region" aria-labelledby="antes-depois-heading">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="antes-depois-heading" className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Da incerteza ao <span className="bg-gradient-hero bg-clip-text text-transparent">controle total</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Economize tempo, reduza perdas e tenha visibilidade total da operação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full border-destructive/20 bg-destructive/5">
              <h3 className="text-2xl font-semibold mb-4">Antes</h3>
              <ul className="space-y-3 text-muted-foreground text-lg leading-relaxed">
                <li>Tempo perdido procurando ativos.</li>
                <li>Baixa visibilidade do que está em campo.</li>
                <li>Decisões atrasadas e mais custo operacional.</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full border-primary/20 bg-primary/5">
              <h3 className="text-2xl font-semibold mb-4">Depois</h3>
              <ul className="space-y-3 text-muted-foreground text-lg leading-relaxed">
                <li>Localização rápida e precisa dos ativos.</li>
                <li>Resposta imediata com alertas inteligentes.</li>
                <li>Operação mais previsível e eficiente.</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
