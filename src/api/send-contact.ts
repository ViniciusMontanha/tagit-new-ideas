/**
 * Email Sending API using Brevo
 * 
 * Este arquivo re-exporta as funções do Brevo para compatibilidade.
 * A implementação real está em send-contact-brevo.ts
 */

export {
  sendContactEmailBrevo as sendContactEmail,
  contactFormSchema,
  type ContactFormData,
} from "./send-contact-brevo";
