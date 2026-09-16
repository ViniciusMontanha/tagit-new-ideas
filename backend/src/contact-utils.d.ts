export const COMPANY: Readonly<{ name: string; legalName: string; phone: string; phoneDisplay: string; email: string; website: string; street: string; city: string; region: string; postalCode: string }>;
export function companyWhatsApp(message?: string): string;
export function normalizeBrazilianPhone(value: string): string;
export function isValidBrazilianPhone(value: string): boolean;
export function escapeHtml(value: unknown): string;
