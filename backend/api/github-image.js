import sharp from "sharp";

const GITHUB_API_URL = "https://api.github.com";
const CAROUSEL_IMAGE_SIZE = 800;

const contentTypeFromFileName = (fileName = "") => {
  const lower = fileName.toLowerCase();

  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";

  return "application/octet-stream";
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const uploadPath = process.env.GITHUB_UPLOAD_PATH || "public/carousel";
  const path = typeof req.query.path === "string" ? req.query.path : "";

  if (!token || !owner || !repo) {
    return res.status(500).json({ error: "Configuração GitHub ausente" });
  }

  const normalizedPath = path.trim().replace(/^\/+/, "");

  if (!normalizedPath || normalizedPath.includes("..")) {
    return res.status(400).json({ error: "Parâmetro path inválido" });
  }

  const allowedPrefix = uploadPath.replace(/^\/+/, "");
  if (!normalizedPath.startsWith(`${allowedPrefix}/`)) {
    return res.status(403).json({ error: "Path não permitido" });
  }

  if (!/\.(png|jpe?g|webp|gif|svg)$/i.test(normalizedPath)) {
    return res.status(400).json({ error: "Formato de imagem não permitido" });
  }

  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${encodeURI(normalizedPath)}?ref=${encodeURIComponent(branch)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.raw",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!response.ok) {
    const details = await response.text();
    return res.status(response.status).json({
      error: "Falha ao buscar imagem no GitHub",
      details,
    });
  }

  const arrayBuffer = await response.arrayBuffer();
  const sourceBuffer = Buffer.from(arrayBuffer);
  const transformer = sharp(sourceBuffer, {
    animated: false,
    density: 300,
    failOn: "none",
    pages: 1,
  }).rotate();

  const metadata = await transformer.metadata();
  const shouldContain = metadata.width !== CAROUSEL_IMAGE_SIZE || metadata.height !== CAROUSEL_IMAGE_SIZE;

  if (shouldContain) {
    transformer.resize(CAROUSEL_IMAGE_SIZE, CAROUSEL_IMAGE_SIZE, {
      fit: "contain",
      position: "centre",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  }

  const resizedBuffer = await transformer.webp({ quality: 90 }).toBuffer();

  res.setHeader("Content-Type", "image/webp");
  res.setHeader("X-Image-Size", `${CAROUSEL_IMAGE_SIZE}x${CAROUSEL_IMAGE_SIZE}`);
  res.setHeader("X-Source-Content-Type", response.headers.get("content-type") || contentTypeFromFileName(normalizedPath));
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");


  res.setHeader("Access-Control-Allow-Origin", "https://tagit.com.br");

  return res.status(200).send(resizedBuffer);
}
