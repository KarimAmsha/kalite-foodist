import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { WhyVisitSection } from '@/components/sections/WhyVisitSection';
import { EventInfoSection } from '@/components/sections/EventInfoSection';
import { CtaBand } from '@/components/sections/CtaBand';
import { company } from '@/content/site';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.about' });
  return { title: `${t('title')} · Kalite Çikolata`, description: t('subtitle') };
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('pages.about');

  const stats = [
    { value: '3', key: 'brands' },
    { value: 'AR·TR·EN', key: 'languages' },
    { value: '100+', key: 'skus' },
    { value: 'Global', key: 'markets' },
  ];

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <section className="section-pad">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-kalite-cream sm:text-3xl">{t('storyTitle')}</h2>
            <p className="mt-4 leading-relaxed text-kalite-cream/70">{t('storyBody1')}</p>
            <p className="mt-4 leading-relaxed text-kalite-cream/70">{t('storyBody2')}</p>
            <p className="mt-6 text-sm text-kalite-cream/50">{company.legalName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.key} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-md">
                <p className="font-heading text-3xl font-extrabold text-gold-gradient">{s.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-kalite-cream/55">{t(`stats.${s.key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyVisitSection />
      <EventInfoSection />
      <CtaBand />
    </>
  );
}
