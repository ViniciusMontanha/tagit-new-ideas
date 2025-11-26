import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const demoItems = [
  {
    title: "Design do Novo Site",
    tags: ["Design", "Urgente", "Cliente"],
    color: "bg-primary",
  },
  {
    title: "Campanha de Marketing Q4",
    tags: ["Marketing", "Planejamento", "Equipe"],
    color: "bg-secondary",
  },
  {
    title: "Refatoração de Código",
    tags: ["Desenvolvimento", "Débito Técnico"],
    color: "bg-accent",
  },
];

export const TagDemo = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Veja <span className="bg-gradient-hero bg-clip-text text-transparent">Em Ação</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crie, organize e encontre seus itens etiquetados sem esforço.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 mb-8">
            {demoItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-strong transition-all duration-300 border-2 hover:border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className={`w-1 h-full ${item.color} rounded-full`} />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button size="lg" variant="outline" className="border-2">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Novo Item
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
