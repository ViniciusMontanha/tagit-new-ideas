import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { companyWhatsApp, normalizeBrazilianPhone, isValidBrazilianPhone } from "@/lib/contact";
import { usePrivacyPolicy } from "@/contexts/PrivacyPolicyContext";

const contactFormSchema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome, com pelo menos 3 caracteres").max(100),
  email: z.string().trim().email("Informe um e-mail válido").max(254),
  telefone: z.string().transform(normalizeBrazilianPhone).refine(isValidBrazilianPhone, "Informe um telefone brasileiro válido com DDD"),
  mensagem: z.string().trim().min(10, "Escreva pelo menos 10 caracteres").max(1000, "Use no máximo 1.000 caracteres"),
  website: z.string().max(0).optional(),
});
type ContactFormData = z.infer<typeof contactFormSchema>;
interface ContactModalProps { isOpen: boolean; onOpenChange: (open: boolean) => void; }

export const ContactModal = ({ isOpen, onOpenChange }: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const attempt = useRef<{ payload: string; id: string } | null>(null);
  const sending = useRef(false);
  const { openPrivacyPolicy } = usePrivacyPolicy();
  const { register, handleSubmit, formState: { errors }, reset, setValue, setError, watch } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { nome: "", email: "", telefone: "", mensagem: "", website: "" },
  });
  const phone = watch("telefone");

  const onSubmit = async (data: ContactFormData) => {
    if (sending.current) return;
    sending.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    const payload = JSON.stringify(data);
    if (attempt.current?.payload !== payload) attempt.current = { payload, id: crypto.randomUUID() };
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
      const response = await fetch(`${apiUrl}/api/send-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, requestId: attempt.current.id }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        if (response.status === 400 && Array.isArray(result?.details)) {
          for (const item of result.details) {
            if (["nome", "email", "telefone", "mensagem"].includes(item.field)) {
              setError(item.field as keyof ContactFormData, { message: item.message });
            }
          }
        }
        throw new Error(response.status === 429
          ? "Muitas tentativas em pouco tempo. Aguarde alguns minutos ou fale conosco pelo WhatsApp."
          : response.status === 400
            ? "Confira os campos indicados e tente novamente."
            : "Não foi possível confirmar o envio. Tente novamente ou fale conosco pelo WhatsApp.");
      }
      setSuccessMessage(result.confirmationSent === false
        ? "Nossa equipe recebeu sua solicitação. Não foi possível enviar a confirmação para seu e-mail, mas você não precisa reenviar o formulário."
        : "Nossa equipe recebeu sua solicitação. Enviamos uma confirmação para seu e-mail; confira também a pasta de spam.");
      reset();
      attempt.current = null;
    } catch (error) {
      setSubmitError(error instanceof DOMException && error.name === "AbortError"
        ? "O envio demorou mais que o esperado. Você pode tentar novamente ou falar pelo WhatsApp."
        : error instanceof Error ? error.message : "Não foi possível confirmar o envio. Tente novamente.");
    } finally {
      clearTimeout(timeout);
      sending.current = false;
      setIsSubmitting(false);
    }
  };
  const close = (open: boolean) => {
    if (sending.current) return;
    onOpenChange(open);
    if (!open) { setSuccessMessage(null); setSubmitError(null); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto px-4 sm:px-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Solicitar Contato</DialogTitle>
          <DialogDescription>Conte o que você precisa. Nossa equipe entrará em contato.</DialogDescription>
        </DialogHeader>
        {successMessage ? (
          <div className="space-y-5 py-6" role="status">
            <h3 className="text-xl font-semibold">Solicitação recebida!</h3>
            <p>{successMessage}</p>
            <Button className="w-full" onClick={() => close(false)}>Fechar</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-busy={isSubmitting}>
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-semibold">Nome *</label>
              <Input id="nome" autoComplete="name" placeholder="Seu nome completo" {...register("nome")} disabled={isSubmitting} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "nome-error" : undefined} />
              {errors.nome && <p id="nome-error" role="alert" className="text-sm text-destructive">{errors.nome.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">E-mail *</label>
              <Input id="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" {...register("email")} disabled={isSubmitting} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email && <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="telefone" className="text-sm font-semibold">Telefone *</label>
              <Input id="telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(16) 99999-9999" {...register("telefone")} onBlur={(event) => setValue("telefone", normalizeBrazilianPhone(event.target.value), { shouldValidate: true })} disabled={isSubmitting} aria-invalid={!!errors.telefone} aria-describedby="telefone-help" />
              <p id="telefone-help" className={`text-xs ${errors.telefone ? "text-destructive" : "text-muted-foreground"}`}>
                {errors.telefone?.message || (phone && isValidBrazilianPhone(phone) ? `Telefone válido: ${normalizeBrazilianPhone(phone)}` : "Inclua o DDD. Aceitamos números com ou sem +55.")}
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="mensagem" className="text-sm font-semibold">Mensagem *</label>
              <Textarea id="mensagem" placeholder="Descreva sua necessidade ou dúvida..." rows={4} {...register("mensagem")} disabled={isSubmitting} aria-invalid={!!errors.mensagem} aria-describedby={errors.mensagem ? "mensagem-error" : undefined} />
              {errors.mensagem && <p id="mensagem-error" role="alert" className="text-sm text-destructive">{errors.mensagem.message}</p>}
            </div>
            <div hidden aria-hidden="true"><label>Website<Input {...register("website")} tabIndex={-1} autoComplete="off" /></label></div>
            <p className="text-xs text-muted-foreground">Usaremos seus dados para responder a esta solicitação. <button type="button" className="underline" onClick={() => { close(false); openPrivacyPolicy(); }}>Política de Privacidade</button>.</p>
            {submitError && <div role="alert" className="p-3 bg-destructive/10 border border-destructive/20 rounded-md space-y-2"><p className="text-sm text-destructive">{submitError}</p><a className="text-sm underline" href={companyWhatsApp()} target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a></div>}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => close(false)} disabled={isSubmitting} className="flex-1">Cancelar</Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">{isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando...</> : "Enviar Mensagem"}</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
