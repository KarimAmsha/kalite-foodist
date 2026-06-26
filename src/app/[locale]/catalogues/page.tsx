import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { CatalogueSection } from '@/components/sections/CatalogueSection';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.catalogues' });
  return { title: `${t('title')} · Kalite Çikolata`, description: t('subtitle') };
}

export default async function CataloguesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('pages.catalogues');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <section className="pt-4 pb-20 sm:pb-24">
        <CatalogueSection withHeader={false} />
      </section>
      <CtaBand />
    </>
  );
}
