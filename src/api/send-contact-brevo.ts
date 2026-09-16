// Compatibilidade para ferramentas de servidor. Não importar no navegador.
export { contactFormSchema, sendContactEmailBrevo } from "../../backend/src/brevo.js";
export interface ContactFormData { nome: string; email: string; telefone: string; mensagem: string; requestId?: string; }
