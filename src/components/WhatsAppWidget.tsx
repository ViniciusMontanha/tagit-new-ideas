import { MessageCircle } from "lucide-react";

/**
 * WhatsAppWidget
 * Widget de contato flutuante otimizado para acessibilidade e SEO
 * Localização: Bottom-right, z-50
 */
export const WhatsAppWidget = () => {
  const phoneNumber = "5516996403745";
  const message = "Olá! Gostaria de mais informações sobre a Tag It.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Abre em nova aba sem referrer
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Permitir ativação via Enter e Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      aria-label="Enviar mensagem via WhatsApp - Clique para abrir chat"
      title="Fale conosco no WhatsApp"
      role="button"
      tabIndex={0}
    >
      <MessageCircle 
        className="h-7 w-7" 
        aria-hidden="true"
      />
    </button>
  );
};
