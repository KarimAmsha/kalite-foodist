'use client';

import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Tabs, type TabItem } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { productFamilies, catalogues } from '@/content/catalogues';
import { DownloadIcon, ArrowIcon } from '@/components/ui/icons';

export function ProductFamiliesSection() {
  const t = useTranslations('brands');

  const catalogueByKey = Object.fromEntries(catalogues.map((c) => [c.key, c.url]));

  const items: TabItem[] = productFamilies.map((b) => ({
    id: b.key,
    label: b.name,
    content: (
      <div className="mx-auto grid max-w-4xl items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md sm:grid-cols-2 sm:p-10">
        <div>
          <p className="font-heading text-3xl font-bold text-gold-gradient">{b.name}</p>
          <p className="mt-4 text-base leading-relaxed text-kalite-cream/75">{t(`${b.key}.tagline`)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {catalogueByKey[b.key] && (
              <Button href={catalogueByKey[b.key]} target="_blank" rel="noopener noreferrer" size="sm" variant="gold">
                <DownloadIcon className="h-4 w-4" />
                {t('viewCatalogue')}
              </Button>
            )}
            {b.website && (
              <Button href={b.website} target="_blank" rel="noopener noreferrer" size="sm" variant="secondary">
                {t('visitBrand')}
                <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
              </Button>
            )}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-night-radial">
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-heading text-5xl font-extrabold tracking-tight text-white/10">{b.name}</span>
          </div>
          <div aria-hidden className="absolute -bottom-10 -end-10 h-40 w-40 rounded-full bg-kalite-red/20 blur-2xl" />
          <div aria-hidden className="absolute -top-10 -start-10 h-32 w-32 rounded-full bg-kalite-gold/15 blur-2xl" />
        </div>
      </div>
    ),
  }));

  return (
    <section id="products" className="section-pad">
      <div className="container-px">
        <SectionTitle eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} className="mb-12" />
        <Tabs items={items} idBase="brands" />
      </div>
    </section>
  );
}
