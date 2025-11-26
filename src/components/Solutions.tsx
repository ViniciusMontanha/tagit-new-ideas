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
    <section id="solucoes" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Soluções para{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Cada Segmento
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologia adaptável para diferentes necessidades empresariais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-blue transition-all duration-300 border-2 hover:border-secondary/30 bg-card group">
                <div className="mb-4 inline-block p-4 bg-gradient-purple rounded-xl shadow-blue group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{solution.description}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-2 py-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
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
