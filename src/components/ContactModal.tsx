import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

// Schema de validação com Zod
const contactFormSchema = z.object({
  nome: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome não pode exceder 100 caracteres"),
  email: z.string()
    .email("Email inválido"),
  telefone: z.string()
    .regex(/^\+?55?\d{10,11}$/, "Telefone inválido. Use formato: (11) 99999-9999 ou +55 11 99999-9999"),
  mensagem: z.string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem não pode exceder 1000 caracteres"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactModal = ({ isOpen, onOpenChange }: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Enviar para API route que irá processar o email
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem. Tente novamente.");
      }

      setSubmitSuccess(true);
      reset();

      // Fechar modal após 2 segundos de sucesso
      setTimeout(() => {
        onOpenChange(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Erro ao enviar mensagem"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Solicitar Demo
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Mensagem Enviada!
            </h3>
            <p className="text-center text-muted-foreground">
              Obrigado pelo seu interesse. Nossa equipe entrará em contato em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Campo Nome */}
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-semibold text-foreground">
                Nome <span className="text-destructive">*</span>
              </label>
              <Input
                id="nome"
                placeholder="Seu nome completo"
                className="bg-background/50 border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
                {...register("nome")}
                disabled={isSubmitting}
              />
              {errors.nome && (
                <p className="text-sm text-destructive">{errors.nome.message}</p>
              )}
            </div>

            {/* Campo Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@empresa.com.br"
                className="bg-background/50 border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
                {...register("email")}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Campo Telefone */}
            <div className="space-y-2">
              <label htmlFor="telefone" className="text-sm font-semibold text-foreground">
                Telefone <span className="text-destructive">*</span>
              </label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999 ou +55 11 99999-9999"
                className="bg-background/50 border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
                {...register("telefone")}
                disabled={isSubmitting}
              />
              {errors.telefone && (
                <p className="text-sm text-destructive">{errors.telefone.message}</p>
              )}
            </div>

            {/* Campo Mensagem */}
            <div className="space-y-2">
              <label htmlFor="mensagem" className="text-sm font-semibold text-foreground">
                Mensagem <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="mensagem"
                placeholder="Descreva sua necessidade ou dúvida..."
                rows={5}
                className="bg-background/50 border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                {...register("mensagem")}
                disabled={isSubmitting}
              />
              {errors.mensagem && (
                <p className="text-sm text-destructive">{errors.mensagem.message}</p>
              )}
            </div>

            {/* Mensagem de Erro */}
            {submitError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{submitError}</p>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Mensagem"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
