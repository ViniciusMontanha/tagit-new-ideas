import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { defaultHeroSlides, createEmptyHeroSlide } from "@/lib/hero-default-slides";
import { loadHeroSlides, saveHeroSlides, type HeroSlide } from "@/lib/hero-slides";

const ADMIN_AUTH_STORAGE_KEY = "tagit.admin.carousel.auth";
const ADMIN_TOKEN_STORAGE_KEY = "tagit.admin.carousel.token";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Falha ao ler arquivo"));
      }
    };

    reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
    reader.readAsDataURL(file);
  });
};

const appendCacheBuster = (url: string): string => {
  if (!url) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${Date.now()}`;
};

const AdminCarousel = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [slideResizeModes, setSlideResizeModes] = useState<Record<string, "contain" | "original">>({});
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingSlides, setIsLoadingSlides] = useState(false);
  const [isSavingSlides, setIsSavingSlides] = useState(false);
  const [uploadingSlideId, setUploadingSlideId] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState<string>("");
  const [adminToken, setAdminToken] = useState<string>("");

  useEffect(() => {
    const auth = window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
    const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "";

    setIsAuthenticated(auth === "true" && Boolean(token));
    setAdminToken(token);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let isMounted = true;

    const fetchSlides = async () => {
      setIsLoadingSlides(true);
      const remoteSlides = await loadHeroSlides();

      if (!isMounted) {
        return;
      }

      setSlides(remoteSlides ?? defaultHeroSlides);
      setIsLoadingSlides(false);
    };

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/admin-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (!response.ok) {
        setAuthError("Senha inválida. Tente novamente.");
        return;
      }

      const payload = await response.json();
      const token = payload?.token as string;

      if (!token) {
        setAuthError("Falha ao iniciar sessão admin.");
        return;
      }

      setAdminToken(token);
      setIsAuthenticated(true);
      setAuthError("");
      setPasswordInput("");
      window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "true");
      window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
    } catch {
      setAuthError("Falha ao autenticar. Tente novamente.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminToken("");
    window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    setStatusMessage("");
  };

  const updateSlide = (id: string, field: keyof HeroSlide, value: string) => {
    setSlides((prev) => prev.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)));
  };

  const handleAddSlide = () => {
    setSlides((prev) => [...prev, createEmptyHeroSlide()]);
    setStatusMessage("Novo slide adicionado.");
  };

  const handleDeleteSlide = (id: string) => {
    setSlides((prev) => prev.filter((slide) => slide.id !== id));
    setStatusMessage("Slide removido.");
  };

  const handleUploadSlideImage = async (slideId: string, file: File | null) => {
    if (!file) {
      return;
    }

    try {
      setUploadingSlideId(slideId);
      setStatusMessage("Enviando imagem para o GitHub e padronizando para 800x800...");

      const fileBase64 = await fileToBase64(file);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

      const response = await fetch(`${apiUrl}/api/upload-carousel-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          fileName: file.name,
          fileBase64,
          slideId,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const message = errorPayload?.message || "Falha no upload da imagem";
        throw new Error(message);
      }

      const uploadResult = await response.json();
      const resizeMode = uploadResult?.resizeMode === "contain" ? "contain" : "original";
      const nextSlides = slides.map((slide) =>
        slide.id === slideId ? { ...slide, image: appendCacheBuster(uploadResult.imageUrl) } : slide,
      );

      setSlides(nextSlides);
      setSlideResizeModes((prev) => ({
        ...prev,
        [slideId]: resizeMode,
      }));

      const saveResult = await saveHeroSlides(nextSlides, adminToken);

      if (!saveResult.success) {
        throw new Error(saveResult.errorMessage || "Falha ao persistir slide no Supabase");
      }

      const resizeMessage =
        resizeMode === "contain"
          ? "Imagem enviada com contain em 800x800 e slide atualizado no Supabase."
          : "Imagem enviada em 800x800 (sem contain) e slide atualizado no Supabase.";

      setStatusMessage(resizeMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha no upload da imagem";
      setStatusMessage(`Erro ao enviar imagem: ${message}`);
    } finally {
      setUploadingSlideId(null);
    }
  };

  const handleSave = async () => {
    if (slides.length === 0) {
      setStatusMessage("Adicione pelo menos um slide antes de salvar.");
      return;
    }

    setIsSavingSlides(true);

    const result = await saveHeroSlides(slides, adminToken);

    if (!result.success) {
      setStatusMessage(`Erro ao salvar slides: ${result.errorMessage || "falha desconhecida"}`);
      setIsSavingSlides(false);
      return;
    }

    if (result.persistence === "supabase") {
      setStatusMessage("Slides (incluindo textos, imagens e botões) salvos com sucesso no Supabase.");
    } else {
      setStatusMessage(
        "Slides salvos apenas neste navegador (fallback local). Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para salvar no Supabase.",
      );
    }
    setIsSavingSlides(false);
  };

  const handleResetDefaults = async () => {
    setSlides(defaultHeroSlides);
    setIsSavingSlides(true);

    const result = await saveHeroSlides(defaultHeroSlides, adminToken);

    if (!result.success) {
      setStatusMessage(`Erro ao restaurar slides padrão: ${result.errorMessage || "falha desconhecida"}`);
      setIsSavingSlides(false);
      return;
    }

    if (result.persistence === "supabase") {
      setStatusMessage("Slides restaurados para o padrão e salvos no Supabase.");
    } else {
      setStatusMessage(
        "Slides padrão restaurados apenas neste navegador (fallback local). Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para salvar no Supabase.",
      );
    }
    setIsSavingSlides(false);
  };

  return (
    <main className="min-h-screen" role="main" itemScope itemType="https://schema.org/WebPage">
      <Header />

      <section className="pt-36 pb-16 bg-background" role="region" aria-labelledby="admin-carrossel-heading">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 id="admin-carrossel-heading" className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Administração do Carrossel da Home
            </h1>
            {!isAuthenticated ? (
              <div className="flex justify-center">
                <Card className="p-6 w-full max-w-md">
                  <p className="text-muted-foreground mb-4 text-center">Digite a senha para acessar a administração do carrossel.</p>
                  <div className="space-y-3">
                    <Input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Senha do admin"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleLogin();
                        }
                      }}
                    />
                    <Button onClick={handleLogin} className="w-full">
                      Entrar
                    </Button>
                  </div>
                  {authError ? <p className="text-sm text-destructive mt-3 text-center">{authError}</p> : null}
                </Card>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-8">
                  Edite, exclua e insira slides. Depois clique em salvar para publicar na home.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Button onClick={handleAddSlide}>Adicionar slide</Button>
                  <Button variant="secondary" onClick={handleSave} disabled={isSavingSlides || isLoadingSlides}>
                    {isSavingSlides ? "Salvando..." : "Salvar alterações"}
                  </Button>
                  <Button variant="outline" onClick={handleResetDefaults} disabled={isSavingSlides || isLoadingSlides}>
                    Restaurar padrão
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    Sair
                  </Button>
                </div>

                {statusMessage ? (
                  <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
                    {statusMessage}
                  </p>
                ) : null}

                {isLoadingSlides ? (
                  <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
                    Carregando slides salvos no Supabase...
                  </p>
                ) : null}

                <div className="space-y-6">
                  {slides.map((slide, index) => (
                    <Card key={slide.id} className="p-6 border-border">
                      <div className="flex items-center justify-between mb-4 gap-4">
                        <h2 className="text-xl font-semibold">Slide {index + 1}</h2>
                        <Button variant="destructive" onClick={() => handleDeleteSlide(slide.id)}>
                          Excluir slide
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Título</label>
                          <Input
                            value={slide.title}
                            onChange={(e) => updateSlide(slide.id, "title", e.target.value)}
                            placeholder="Título do slide"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">URL da imagem</label>
                          <Input
                            value={slide.image}
                            onChange={(e) => updateSlide(slide.id, "image", e.target.value)}
                            placeholder="https://raw.githubusercontent.com/..."
                          />
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                handleUploadSlideImage(slide.id, file);
                                e.currentTarget.value = "";
                              }}
                              disabled={isSavingSlides || uploadingSlideId === slide.id}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Modo do último upload: {slideResizeModes[slide.id] === "contain" ? "contain" : slideResizeModes[slide.id] === "original" ? "original" : "ainda não enviado"}
                          </p>
                          <p className="text-xs text-muted-foreground">As imagens enviadas são convertidas automaticamente para 800x800.</p>
                          {uploadingSlideId === slide.id ? (
                            <p className="text-xs text-muted-foreground">Enviando imagem...</p>
                          ) : null}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Descrição</label>
                          <Textarea
                            value={slide.description}
                            onChange={(e) => updateSlide(slide.id, "description", e.target.value)}
                            placeholder="Descrição do slide"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Texto alternativo da imagem (alt)</label>
                          <Input
                            value={slide.imageAlt}
                            onChange={(e) => updateSlide(slide.id, "imageAlt", e.target.value)}
                            placeholder="Descrição acessível da imagem"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Texto botão principal</label>
                          <Input
                            value={slide.primaryCtaLabel}
                            onChange={(e) => updateSlide(slide.id, "primaryCtaLabel", e.target.value)}
                            placeholder="PARA EMPRESAS"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Link botão principal</label>
                          <Input
                            value={slide.primaryCtaHref}
                            onChange={(e) => updateSlide(slide.id, "primaryCtaHref", e.target.value)}
                            placeholder="/para-empresas"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Texto botão secundário</label>
                          <Input
                            value={slide.secondaryCtaLabel}
                            onChange={(e) => updateSlide(slide.id, "secondaryCtaLabel", e.target.value)}
                            placeholder="PARA VOCÊ"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Link botão secundário</label>
                          <Input
                            value={slide.secondaryCtaHref}
                            onChange={(e) => updateSlide(slide.id, "secondaryCtaHref", e.target.value)}
                            placeholder="/para-voce"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AdminCarousel;
