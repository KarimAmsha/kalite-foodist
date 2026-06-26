import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { ProductFamiliesSection } from '@/components/sections/ProductFamiliesSection';
import { CtaBand } from '@/components/sections/CtaBand';
import { Link } from '@/i18n/routing';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { brands } from '@/content/site';
import { ArrowIcon } from '@/components/ui/icons';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.brands' });
  return { title: `${t('title')} · Kalite Çikolata`, description: t('subtitle') };
}

const brandCards = [
  { slug: 'kalite', ...brands.kalite },
  { slug: 'nukka', ...brands.nukka },
  { slug: 'prosweet', ...brands.prosweet },
];

export default async function BrandsPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('pages.brands');
  const tb = await getTranslations('brandsStrip');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <section className="section-pad">
        <div className="container-px grid gap-5 sm:grid-cols-3">
          {brandCards.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="group flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-md transition hover:-translate-y-1 hover:border-kalite-gold/40 hover:shadow-glow"
            >
              <span className="flex h-24 w-full items-center justify-center rounded-xl bg-white p-5">
                <BrandLogo src={b.logo} alt={b.name} imgClassName="max-h-14 w-auto max-w-[180px] object-contain" fallback={<span className="font-heading text-2xl font-bold text-kalite-red">{b.name}</span>} />
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-kalite-gold-soft">
                {tb('explore')}
                <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ProductFamiliesSection />
      <CtaBand />
    </>
  );
}
