import { companyWhatsApp } from "@/lib/contact";
import { MessageCircle } from "lucide-react";

/**
 * WhatsAppWidget
 * Widget de contato flutuante otimizado para acessibilidade e SEO
 * Localização: Bottom-right, z-50
 */
export const WhatsAppWidget = () => {
  return (
    <a
      href={companyWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      data-contact-source="Botão flutuante"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      aria-label="Enviar mensagem via WhatsApp - Clique para abrir chat"
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle
        className="h-6 w-6 sm:h-7 sm:w-7"
        aria-hidden="true"
      />
    </a>
  );
};
