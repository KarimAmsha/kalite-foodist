// Catalogue + product family definitions.
// File URLs come from env vars so QR-printed links stay stable and can be
// swapped to Google Drive links for very large PDFs without code changes.

export type BrandKey = 'kalite' | 'nukka' | 'prosweet' | 'jellyFunny' | 'newProducts';

export interface ProductFamily {
  key: BrandKey;
  name: string;
  /** i18n key under `brands.<key>.tagline` */
  taglineKey: string;
  accent: 'red' | 'brown' | 'gold';
}

export interface Catalogue {
  key: Exclude<BrandKey, 'kalite'>;
  name: string;
  /** i18n key under `catalogues.items.<key>` */
  descKey: string;
  url: string;
  spotlight?: boolean;
}

export const productFamilies: ProductFamily[] = [
  { key: 'nukka', name: 'NUKKA', taglineKey: 'brands.nukka.tagline', accent: 'red' },
  { key: 'prosweet', name: 'PROSWEET', taglineKey: 'brands.prosweet.tagline', accent: 'brown' },
  { key: 'jellyFunny', name: 'Jelly Funny', taglineKey: 'brands.jellyFunny.tagline', accent: 'gold' },
  { key: 'newProducts', name: 'New Products', taglineKey: 'brands.newProducts.tagline', accent: 'red' },
];

export const catalogues: Catalogue[] = [
  {
    key: 'newProducts',
    name: 'New Products',
    descKey: 'newProducts',
    url: process.env.NEXT_PUBLIC_CATALOGUE_NEW_PRODUCTS_URL || '/catalogues/new-products-catalogue.pdf',
    spotlight: true,
  },
  {
    key: 'nukka',
    name: 'NUKKA',
    descKey: 'nukka',
    url: process.env.NEXT_PUBLIC_CATALOGUE_NUKKA_URL || '/catalogues/nukka-catalogue.pdf',
  },
  {
    key: 'prosweet',
    name: 'PROSWEET',
    descKey: 'prosweet',
    url: process.env.NEXT_PUBLIC_CATALOGUE_PROSWEET_URL || '/catalogues/prosweet-catalogue.pdf',
  },
  {
    key: 'jellyFunny',
    name: 'Jelly Funny',
    descKey: 'jellyFunny',
    url: process.env.NEXT_PUBLIC_CATALOGUE_JELLYFUNNY_URL || '/catalogues/jellyfunny-catalogue.pdf',
  },
];
