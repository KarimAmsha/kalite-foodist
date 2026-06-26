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
  legalName: 'EUROSWEET GIDA LTD. ŞTİ. · KALİTE ÇİKOLATA GIDA SAN. TİC. A.Ş.',
  email: 'info@kalitecikolata.com.tr',
  website: 'https://kalitecikolata.com.tr',
  phone: '+90 (212) 803 60 00',
  phoneHref: '+902128036000',
  address:
    'Mahmut Bey Mah. Taşocağıyolu Cad. No:3 B Blok, Ağaoğlu My Office 212, K:29 D:488, Bağcılar / Istanbul',
} as const;

// House of brands — links go to each brand's official site.
export const brands = {
  kalite: {
    name: 'Kalite Çikolata',
    website: 'https://kalitecikolata.com.tr',
    email: 'info@kalitecikolata.com.tr',
    logo: '/assets/logos/kalite-cikolata.png',
  },
  nukka: {
    name: 'NUKKA',
    website: 'https://nukka.com.tr',
    email: 'info@nukka.com.tr',
    logo: '/assets/logos/nukka.png',
  },
  prosweet: {
    name: 'PROSWEET',
    website: 'https://prosweet.com.tr',
    email: 'info@prosweet.com.tr',
    logo: '/assets/logos/prosweet.png',
  },
} as const;

// Logo asset paths (drop the files into public/assets/logos/).
export const logos = {
  kalite: '/assets/logos/kalite-cikolata.png',
  nukka: '/assets/logos/nukka.png',
  prosweet: '/assets/logos/prosweet.png',
  foodist: '/assets/logos/foodist-istanbul.png',
} as const;

export const socials = {
  instagram: 'https://instagram.com/kalitecikolata',
  linkedin: 'https://www.linkedin.com/company/kalite-cikolata',
  website: 'https://kalitecikolata.com.tr',
} as const;

// Read at module scope so the values are inlined at build time.
export const env = {
  // TEMPORARY placeholder for the manager preview — real number removed.
  // Restore via NEXT_PUBLIC_WHATSAPP_NUMBER (or here) before launch.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '900000000000',
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

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  eventData.mapsQuery,
)}`;
