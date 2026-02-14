const GITHUB_API_URL = "https://api.github.com";

const normalizeBase64Content = (value) => {
  if (!value) {
    return "";
  }

  const [, maybeBase64] = value.split(",");
  return maybeBase64 || value;
};

const sanitizeFileName = (fileName) => {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "");
};

const createRawGithubUrl = ({ owner, repo, branch, filePath }) => {
  const encodedPath = filePath
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${encodedPath}`;
};

export const uploadCarouselImageToGitHub = async ({ fileName, fileBase64, slideId }) => {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const uploadPath = process.env.GITHUB_UPLOAD_PATH || "public/carousel";

  if (!token || !owner || !repo) {
    throw new Error("Configuração GitHub ausente. Defina GITHUB_TOKEN, GITHUB_OWNER e GITHUB_REPO.");
  }

  const cleanName = sanitizeFileName(fileName || "imagem");
  const timestamp = Date.now();
  const safeSlideId = sanitizeFileName(slideId || "slide");
  const path = `${uploadPath}/${safeSlideId}-${timestamp}-${cleanName}`;
  const content = normalizeBase64Content(fileBase64);

  if (!content) {
    throw new Error("Arquivo base64 inválido.");
  }

  const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: `upload: carousel image ${safeSlideId}`,
      content,
      branch,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Falha no upload para GitHub (${response.status}): ${details}`);
  }

  return {
    filePath: path,
    imageUrl: createRawGithubUrl({ owner, repo, branch, filePath: path }),
  };
};
