const GITHUB_API_URL = "https://api.github.com";

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
  const path = typeof req.query.path === "string" ? req.query.path : "";

  if (!token || !owner || !repo) {
    return res.status(500).json({ error: "Configuração GitHub ausente" });
  }

  if (!path || path.includes("..")) {
    return res.status(400).json({ error: "Parâmetro path inválido" });
  }

  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(branch)}`,
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
  const buffer = Buffer.from(arrayBuffer);
  const responseContentType = response.headers.get("content-type") || contentTypeFromFileName(path);

  res.setHeader("Content-Type", responseContentType);
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.setHeader("Access-Control-Allow-Origin", "*");

  return res.status(200).send(buffer);
}
