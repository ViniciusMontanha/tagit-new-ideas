import { motion } from "framer-motion";
import { Zap, Shield, Palette, Code } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Find anything in milliseconds with intelligent search and instant filtering.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data stays yours. End-to-end encryption keeps everything safe.",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Clean, modern interface that makes organizing a joy, not a chore.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "API access and integrations to connect with your favorite tools.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">Tagit</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for everyone who needs to stay organized without the complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-strong transition-all duration-300 border-2 hover:border-primary/20 bg-card">
                <div className="mb-4 inline-block p-3 bg-gradient-hero rounded-xl shadow-glow">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
