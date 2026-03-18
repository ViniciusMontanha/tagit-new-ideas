import path from "path";
import sharp from "sharp";

export const CAROUSEL_IMAGE_SIZE = 800;
const OUTPUT_FORMAT = "webp";

const parseBase64Image = (value) => {
  if (!value) {
    return { content: "", mimeType: null };
  }

  const trimmedValue = String(value).trim();
  const match = trimmedValue.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match) {
    return {
      content: trimmedValue.replace(/\s+/g, ""),
      mimeType: null,
    };
  }

  return {
    mimeType: match[1],
    content: match[2].replace(/\s+/g, ""),
  };
};

const createOutputFileName = (fileName = "imagem") => {
  const parsed = path.parse(fileName);
  const baseName = parsed.name || "imagem";
  return `${baseName}.${OUTPUT_FORMAT}`;
};

export const normalizeCarouselImageUpload = async ({ fileName, fileBase64 }) => {
  const { content, mimeType } = parseBase64Image(fileBase64);

  if (!content) {
    throw new Error("Arquivo base64 inválido.");
  }

  if (mimeType && !mimeType.startsWith("image/")) {
    throw new Error("Formato de arquivo inválido para imagem.");
  }

  const inputBuffer = Buffer.from(content, "base64");

  if (!inputBuffer.length) {
    throw new Error("Não foi possível ler o conteúdo da imagem.");
  }

  const transformer = sharp(inputBuffer, {
    animated: false,
    density: 300,
    failOn: "none",
    pages: 1,
  }).rotate();

  const metadata = await transformer.metadata();
  const shouldContain = metadata.width !== CAROUSEL_IMAGE_SIZE || metadata.height !== CAROUSEL_IMAGE_SIZE;
  const resizeMode = shouldContain ? "contain" : "original";

  if (shouldContain) {
    transformer.resize(CAROUSEL_IMAGE_SIZE, CAROUSEL_IMAGE_SIZE, {
      fit: "contain",
      position: "centre",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  }

  const outputBuffer = await transformer.webp({ quality: 90 }).toBuffer();

  return {
    fileName: createOutputFileName(fileName),
    fileBase64: outputBuffer.toString("base64"),
    width: CAROUSEL_IMAGE_SIZE,
    height: CAROUSEL_IMAGE_SIZE,
    mimeType: "image/webp",
    resizeMode,
  };
};