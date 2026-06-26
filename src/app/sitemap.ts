import type { MetadataRoute } from 'next';
import { env } from '@/content/site';
import { routing } from '@/i18n/routing';

const paths = ['', '/brands', '/brands/kalite', '/brands/nukka', '/brands/prosweet', '/catalogues', '/about', '/team', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.flatMap((locale) =>
    paths.map((p) => ({
      url: `${env.siteUrl}/${locale}${p}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: p === '' ? (locale === routing.defaultLocale ? 1 : 0.8) : 0.6,
    })),
  );
}
