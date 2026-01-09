import { useEffect } from 'react';

// Tipagem completa para as opções
interface WhatsAppOptions {
  host: string;
  enabled: boolean;
  chatButtonSetting: {
    backgroundColor: string;
    ctaText: string;
    icon: string;
    position: "left" | "right";
  };
  brandSetting: {
    backgroundColor: string;
    brandImg: string;
    brandName: string;
    brandSubTitle: string;
    ctaText: string;
    phoneNumber: string;
    welcomeText: string;
  };
}

declare global {
  interface Window {
    CreateWhatsappChatWidget: (options: WhatsAppOptions) => void;
  }
}

export const WhatsAppWidget = () => {
  useEffect(() => {
    const scriptUrl = 'https://edna.io/wp-content/plugins/whatsapp-widget-generator/js/generator.js?11270';
    
    const options: WhatsAppOptions = {
      host: "https://edna.io",
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#4fce5d",
        ctaText: "",
        icon: "whatsapp",
        position: "right",
      },
      brandSetting: {
        backgroundColor: "#6a3dff",
        brandImg: "https://i.postimg.cc/MHW00XxJ/logo-tagit-brand.png",
        brandName: "Tag It",
        brandSubTitle: "On-line",
        ctaText: "Iniciar conversa",
        phoneNumber: "16997534316",
        welcomeText: "Solicite mais informações, através do nosso WhatsApp"
      }
    };

    const loadAndInit = () => {
      // Verifica se o script já existe para evitar múltiplas instâncias no HMR do Vite
      let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;

      const init = () => {
        if (window.CreateWhatsappChatWidget) {
          window.CreateWhatsappChatWidget(options);
        }
      };

      if (!script) {
        script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.onload = init;
        document.body.appendChild(script);
      } else {
        init();
      }
    };

    // Otimização de carregamento: Espera 2 segundos ou o navegador ficar ocioso
    // Isso prioriza o carregamento do seu site/Vite antes do widget
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => loadAndInit());
    } else {
      const timer = setTimeout(loadAndInit, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};