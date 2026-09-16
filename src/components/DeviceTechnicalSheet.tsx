import { motion } from "framer-motion";
import { Image as ImageIcon, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export type DeviceTechnicalSheetData = {
  id: string;
  title: string;
  badge?: string;
  sections: {
    title: string;
    icon?: LucideIcon;
    rows: { label: string; value: string; icon?: LucideIcon }[];
  }[];
  imagesTitle?: string;
  images: { src: string; alt: string; width: number; height: number }[];
  notes?: string[];
};

export const DeviceTechnicalSheet = ({ sheet }: { sheet: DeviceTechnicalSheetData }) => (
  <motion.div
    id={sheet.id}
    role="region"
    aria-labelledby={`${sheet.id}-heading`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto mt-12 sm:mt-16 scroll-mt-28"
  >
    <Card className="p-6 md:p-8 border-border/80 bg-card/90 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h3 id={`${sheet.id}-heading`} className="text-2xl md:text-3xl font-bold text-foreground">{sheet.title}</h3>
        {sheet.badge && (
          <span className="inline-flex w-fit items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
            {sheet.badge}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {sheet.sections.map((section, sectionIndex) => (
          <motion.div
            key={`${sheet.id}-${sectionIndex}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: sectionIndex * 0.08 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-5 border-border/70 bg-background/85">
              <div className="flex items-center gap-2 mb-4">
                {section.icon && <section.icon className="h-5 w-5 text-primary" aria-hidden="true" />}
                <h4 className="text-lg font-semibold text-foreground">{section.title}</h4>
              </div>
              <div className="divide-y divide-border/70">
                {section.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="py-2.5 flex flex-col gap-1">
                    {row.label && (
                      <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                        {row.icon && <row.icon className="h-3.5 w-3.5" aria-hidden="true" />}
                        <span>{row.label}</span>
                      </div>
                    )}
                    {row.value && <p className="text-sm md:text-base font-semibold text-foreground leading-snug break-words">{row.value}</p>}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        {sheet.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-5 border-border/70 bg-background/85">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h4 className="text-lg font-semibold text-foreground">{sheet.imagesTitle || "Imagens do Dispositivo"}</h4>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {sheet.images.map((image, imageIndex) => (
                  <div key={`${sheet.id}-image-${imageIndex}`} className="p-1">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full h-auto max-h-52 object-contain mx-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
      {sheet.notes && sheet.notes.length > 0 && (
        <div className="mt-6 space-y-2 text-sm text-muted-foreground leading-relaxed">
          {sheet.notes.map((note) => <p key={note}>{note}</p>)}
        </div>
      )}
    </Card>
  </motion.div>
);
