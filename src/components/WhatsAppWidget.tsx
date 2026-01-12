import { MessageCircle } from "lucide-react";

export const WhatsAppWidget = () => {
  const phoneNumber = "5516997534316";
  const message = "Olá! Gostaria de mais informações sobre a Tag It.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      aria-label="Contato via WhatsApp"
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
};
