import crypto from "crypto";

const TOKEN_TTL_SECONDS = 60 * 60 * 8;

const base64UrlEncode = (value) => Buffer.from(value, "utf8").toString("base64url");
const base64UrlDecode = (value) => Buffer.from(value, "base64url").toString("utf8");

const getSessionSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET não configurada");
  }

  return secret;
};

export const verifyAdminPassword = (password) => {
  const expectedPassword = process.env.ADMIN_CAROUSEL_PASSWORD;

  if (!expectedPassword) {
    throw new Error("ADMIN_CAROUSEL_PASSWORD não configurada");
  }

  const candidate = Buffer.from(password || "", "utf8");
  const expected = Buffer.from(expectedPassword, "utf8");

  if (candidate.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidate, expected);
};

const sign = (payloadBase64) => {
  return crypto.createHmac("sha256", getSessionSecret()).update(payloadBase64).digest("base64url");
};

export const createAdminToken = () => {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    role: "admin-carousel",
    iat: nowSeconds,
    exp: nowSeconds + TOKEN_TTL_SECONDS,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

export const verifyAdminToken = (token) => {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return false;
  }

  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return false;
  }

  const expectedSignature = sign(encodedPayload);
  const provided = Buffer.from(providedSignature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");

  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const nowSeconds = Math.floor(Date.now() / 1000);

    return payload?.role === "admin-carousel" && typeof payload.exp === "number" && nowSeconds < payload.exp;
  } catch {
    return false;
  }
};

export const extractBearerToken = (authorizationHeader) => {
  if (!authorizationHeader || typeof authorizationHeader !== "string") {
    return "";
  }

  const [scheme, token] = authorizationHeader.split(" ");
  return scheme?.toLowerCase() === "bearer" ? token || "" : "";
};