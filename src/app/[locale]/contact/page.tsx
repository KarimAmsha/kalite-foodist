import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { LeadFormSection } from '@/components/sections/LeadFormSection';
import { ContactSection } from '@/components/sections/ContactSection';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.contact' });
  return { title: `${t('title')} · Kalite Çikolata`, description: t('subtitle') };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('pages.contact');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <LeadFormSection />
      <ContactSection />
    </>
  );
}
