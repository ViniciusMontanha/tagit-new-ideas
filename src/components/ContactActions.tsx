import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { companyWhatsApp } from "@/lib/contact";

export const ContactActions = ({ interest, label = "Solicitar demonstração", business = false }: { interest: string; label?: string; business?: boolean }) => {
  const [open, setOpen] = useState(false);
  return <>
    <div className="flex flex-col sm:flex-row gap-3">
      <Button size="lg" onClick={() => setOpen(true)}>{label}</Button>
      <Button size="lg" variant="outline" asChild><a href={companyWhatsApp(`Olá! Gostaria de conversar sobre ${interest}.`)} data-contact-source={interest} target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a></Button>
    </div>
    <ContactModal isOpen={open} onOpenChange={setOpen} interest={interest} business={business} />
  </>;
};
