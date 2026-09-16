// Dados públicos compartilhados pelo site e pelos e-mails.
export const COMPANY = Object.freeze({
  name: "Tag It",
  legalName: "Tag IT Tecnologia em Localização LTDA",
  phone: "+5516996403745",
  phoneDisplay: "+55 16 99640-3745",
  email: "contato@tagit.com.br",
  website: "https://tagit.com.br",
  street: "Rua Doutor Paulo Tinoco Cabral 155",
  city: "Ribeirão Preto",
  region: "SP",
  postalCode: "14020-270",
});

export const companyWhatsApp = (message = "Olá! Gostaria de mais informações sobre a Tag It.") =>
  `https://wa.me/${COMPANY.phone.slice(1)}?text=${encodeURIComponent(message)}`;

const brazilianAreaCodes = new Set("11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99".split(" "));

export function normalizeBrazilianPhone(value) {
  const raw = String(value ?? "").trim();
  if (!/^[+\d\s().-]*$/.test(raw)) return raw;
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0055")) digits = digits.slice(2);
  if (!raw.startsWith("+") && (digits.length === 10 || digits.length === 11)) digits = `55${digits}`;
  return digits ? `+${digits}` : "";
}

export function isValidBrazilianPhone(value) {
  const normalized = normalizeBrazilianPhone(value);
  return /^\+55\d{2}(?:[2-5]\d{7}|9\d{8})$/.test(normalized)
    && brazilianAreaCodes.has(normalized.slice(3, 5));
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}
