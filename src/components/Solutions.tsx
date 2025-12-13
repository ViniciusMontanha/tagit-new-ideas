import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Wrench, Package, Truck, Laptop } from "lucide-react";

const solutions = [
  {
    icon: Wrench,
    title: "Ferramentas e Equipamentos",
    description: "Rastreie ferramentas, máquinas e equipamentos em canteiros de obra ou instalações industriais.",
    tags: ["Construção", "Indústria", "Manutenção"],
  },
  {
    icon: Package,
    title: "Inventário e Estoque",
    description: "Monitore produtos, materiais e estoque em armazéns e centros de distribuição.",
    tags: ["Logística", "Varejo", "Distribuição"],
  },
  {
    icon: Truck,
    title: "Frotas e Veículos",
    description: "Acompanhe veículos, trailers e equipamentos móveis em tempo real.",
    tags: ["Transporte", "Logística", "Entrega"],
  },
  {
    icon: Laptop,
    title: "Ativos de TI",
    description: "Gerencie laptops, tablets, smartphones e outros equipamentos tecnológicos.",
    tags: ["TI", "Tecnologia", "Escritório"],
  },
];

export const Solutions = () => {
  return (
    <section id="solucoes" className="py-32 bg-primary">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-primary-foreground">
            Soluções para{" "}
            <span className="font-bold">
              Cada Segmento
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto font-light">
            Tecnologia adaptável para diferentes necessidades empresariais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full hover:shadow-soft transition-all duration-500 border-primary-foreground/20 hover:border-primary-foreground/40 bg-card backdrop-blur-sm group">
                <div className="mb-6 inline-block p-4 rounded-2xl shadow-soft group-hover:scale-105 transition-transform duration-500 bg-secondary">
                  <solution.icon className="w-9 h-9 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{solution.title}</h3>
                <p className="text-muted-foreground mb-6 text-base font-light leading-relaxed">{solution.description}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-3 py-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
