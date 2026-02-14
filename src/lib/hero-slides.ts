import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type HeroSlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

type HeroSlideRow = {
  id: string;
  position: number;
  title: string;
  description: string;
  image: string;
  image_alt: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
};

type SaveHeroSlidesResult = {
  success: boolean;
  persistence: "supabase" | "localStorage";
  errorMessage?: string;
};

export const HERO_SLIDES_STORAGE_KEY = "tagit.heroSlides";
const HERO_SLIDES_TABLE = "hero_slides";

export const isValidHeroSlide = (value: unknown): value is HeroSlide => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const slide = value as Record<string, unknown>;

  return (
    typeof slide.id === "string" &&
    typeof slide.title === "string" &&
    typeof slide.description === "string" &&
    typeof slide.image === "string" &&
    typeof slide.imageAlt === "string" &&
    typeof slide.primaryCtaLabel === "string" &&
    typeof slide.primaryCtaHref === "string" &&
    typeof slide.secondaryCtaLabel === "string" &&
    typeof slide.secondaryCtaHref === "string"
  );
};

const normalizeGithubImageUrl = (url: string): string => {
  if (!url.includes("github.com") || !url.includes("/blob/")) {
    return url;
  }

  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
};

export const loadHeroSlidesFromStorage = (): HeroSlide[] | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(HERO_SLIDES_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return null;
    }

    const validSlides = parsed.filter(isValidHeroSlide);
    return validSlides.length > 0 ? validSlides : null;
  } catch {
    return null;
  }
};

export const saveHeroSlidesToStorage = (slides: HeroSlide[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(HERO_SLIDES_STORAGE_KEY, JSON.stringify(slides));
};

export const getHeroSlidesPersistenceMode = (): "supabase" | "localStorage" => {
  return isSupabaseConfigured ? "supabase" : "localStorage";
};

const mapRowToHeroSlide = (row: HeroSlideRow): HeroSlide => {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: normalizeGithubImageUrl(row.image),
    imageAlt: row.image_alt,
    primaryCtaLabel: row.primary_cta_label,
    primaryCtaHref: row.primary_cta_href,
    secondaryCtaLabel: row.secondary_cta_label,
    secondaryCtaHref: row.secondary_cta_href,
  };
};

const mapHeroSlideToRow = (slide: HeroSlide, position: number): HeroSlideRow => {
  return {
    id: slide.id,
    position,
    title: slide.title,
    description: slide.description,
    image: normalizeGithubImageUrl(slide.image),
    image_alt: slide.imageAlt,
    primary_cta_label: slide.primaryCtaLabel,
    primary_cta_href: slide.primaryCtaHref,
    secondary_cta_label: slide.secondaryCtaLabel,
    secondary_cta_href: slide.secondaryCtaHref,
  };
};

export const loadHeroSlides = async (): Promise<HeroSlide[] | null> => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from(HERO_SLIDES_TABLE)
      .select(
        "id, position, title, description, image, image_alt, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href"
      )
      .order("position", { ascending: true });

    if (!error && Array.isArray(data)) {
      const mappedSlides = data.map((row) => mapRowToHeroSlide(row as HeroSlideRow));
      const validSlides = mappedSlides.filter(isValidHeroSlide);

      if (validSlides.length > 0) {
        saveHeroSlidesToStorage(validSlides);
        return validSlides;
      }
    }

    if (error) {
      console.error("Erro ao carregar slides do Supabase:", error.message);
    }
  }

  return loadHeroSlidesFromStorage();
};

export const saveHeroSlides = async (slides: HeroSlide[]): Promise<SaveHeroSlidesResult> => {
  const validSlides = slides.filter(isValidHeroSlide);

  if (validSlides.length === 0) {
    return {
      success: false,
      persistence: "localStorage",
      errorMessage: "Nenhum slide válido para salvar.",
    };
  }

  if (isSupabaseConfigured && supabase) {
    const rows = validSlides.map((slide, index) => mapHeroSlideToRow(slide, index));

    const { error: upsertError } = await supabase
      .from(HERO_SLIDES_TABLE)
      .upsert(rows, { onConflict: "id" });

    if (upsertError) {
      return {
        success: false,
        persistence: "supabase",
        errorMessage: upsertError.message,
      };
    }

    const { data: existingRows, error: existingError } = await supabase.from(HERO_SLIDES_TABLE).select("id");

    if (existingError) {
      return {
        success: false,
        persistence: "supabase",
        errorMessage: existingError.message,
      };
    }

    const incomingIds = new Set(rows.map((row) => row.id));
    const idsToDelete = (existingRows || [])
      .map((row) => (row as { id: string }).id)
      .filter((id) => !incomingIds.has(id));

    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase.from(HERO_SLIDES_TABLE).delete().in("id", idsToDelete);

      if (deleteError) {
        return {
          success: false,
          persistence: "supabase",
          errorMessage: deleteError.message,
        };
      }
    }

    saveHeroSlidesToStorage(validSlides);
    return {
      success: true,
      persistence: "supabase",
    };
  }

  saveHeroSlidesToStorage(validSlides);
  return {
    success: true,
    persistence: "localStorage",
  };
};
