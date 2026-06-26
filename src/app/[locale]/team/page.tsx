import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { TeamSection } from '@/components/sections/TeamSection';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.team' });
  return { title: `${t('title')} · Kalite Çikolata`, description: t('subtitle') };
}

export default async function TeamPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('pages.team');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <TeamSection />
      <CtaBand />
    </>
  );
}
