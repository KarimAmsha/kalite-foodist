// Central, source-of-truth event & company data.
// These values are fixed by the implementation brief and must appear
// identically everywhere (Hero, Event cards, SEO, footer).

export const eventData = {
  name: 'Foodist Istanbul 2026',
  fullName: 'Foodist Istanbul International Food and Beverage Fair 2026',
  dates: 'September 1-4, 2026',
  venue: 'Tüyap Fair and Congress Center',
  city: 'Istanbul, Türkiye',
  hall: '1',
  stand: '151B',
  // Canonical booth string — never change the format.
  booth: 'Hall: 1 / Stand: 151B',
  mapsQuery: 'Tüyap Fair and Congress Center Istanbul',
} as const;

export const company = {
  name: 'Kalite Çikolata',
  legalName: 'Kalite Çikolata Gıda San. Tic. A.Ş. / EUROSWEET GIDA LTD. ŞTİ.',
  email: 'export@kalitecikolata.com',
} as const;

export const socials = {
  instagram: 'https://instagram.com/kalitecikolata',
  linkedin: 'https://www.linkedin.com/company/kalite-cikolata',
  website: 'https://kalitecikolata.com',
} as const;

// Read at module scope so the values are inlined at build time.
export const env = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905520802916',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kalite-foodist-2026.vercel.app',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
  googleFormFallbackUrl: process.env.NEXT_PUBLIC_GOOGLE_FORM_FALLBACK_URL || '',
} as const;

/**
 * Build a wa.me link with a pre-filled, locale-aware message.
 */
export function whatsappLink(message: string): string {
  const base = `https://wa.me/${env.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
