// Catalogue + product family definitions.
// Catalogue URLs default to the official Google Drive files and can be
// overridden via env vars so QR-printed links stay stable.

export type BrandKey = 'kalite' | 'nukka' | 'prosweet' | 'jellyFunny' | 'newProducts';

export interface ProductFamily {
  key: BrandKey;
  name: string;
  /** i18n key under `brands.<key>.tagline` */
  taglineKey: string;
  accent: 'red' | 'brown' | 'gold';
  website?: string;
}

export interface Catalogue {
  key: Exclude<BrandKey, 'kalite'>;
  name: string;
  /** i18n key under `catalogues.items.<key>` */
  descKey: string;
  url: string;
  spotlight?: boolean;
}

// Official catalogue files (Google Drive).
const DRIVE = {
  nukka: 'https://drive.google.com/file/d/1SrRcyhYtdZOvoSs-v1DV-3v-C5J6n-6b/view',
  prosweet: 'https://drive.google.com/file/d/1YkSYI1-OYqVahl7Jj4AJCaAKYTurZfnM/view',
  newProducts: 'https://drive.google.com/file/d/1injOwb1X36d4fRBKabsjMm0un3N2iZ6R/view',
  jellyFunny: 'https://drive.google.com/file/d/1eTeSdxj3gf7IT1UzRXZWtI0ABlhTSTuX/view',
} as const;

export const productFamilies: ProductFamily[] = [
  { key: 'nukka', name: 'NUKKA', taglineKey: 'brands.nukka.tagline', accent: 'red', website: 'https://nukka.com.tr' },
  { key: 'prosweet', name: 'PROSWEET', taglineKey: 'brands.prosweet.tagline', accent: 'brown', website: 'https://prosweet.com.tr' },
  { key: 'jellyFunny', name: 'Jelly & Gummy', taglineKey: 'brands.jellyFunny.tagline', accent: 'gold' },
  { key: 'newProducts', name: 'New Products', taglineKey: 'brands.newProducts.tagline', accent: 'red' },
];

export const catalogues: Catalogue[] = [
  {
    key: 'newProducts',
    name: 'New Products',
    descKey: 'newProducts',
    url: process.env.NEXT_PUBLIC_CATALOGUE_NEW_PRODUCTS_URL || DRIVE.newProducts,
    spotlight: true,
  },
  {
    key: 'nukka',
    name: 'NUKKA',
    descKey: 'nukka',
    url: process.env.NEXT_PUBLIC_CATALOGUE_NUKKA_URL || DRIVE.nukka,
  },
  {
    key: 'prosweet',
    name: 'PROSWEET',
    descKey: 'prosweet',
    url: process.env.NEXT_PUBLIC_CATALOGUE_PROSWEET_URL || DRIVE.prosweet,
  },
  {
    key: 'jellyFunny',
    name: 'Jelly & Gummy',
    descKey: 'jellyFunny',
    url: process.env.NEXT_PUBLIC_CATALOGUE_JELLYFUNNY_URL || DRIVE.jellyFunny,
  },
];
