import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { routing } from '@/i18n/routing';
import { brands, whatsappLink } from '@/content/site';
import { catalogues } from '@/content/catalogues';
import { DownloadIcon, ArrowIcon, WhatsAppIcon, GlobeIcon } from '@/components/ui/icons';

type BrandSlug = 'kalite' | 'nukka' | 'prosweet';
const validSlugs: BrandSlug[] = ['kalite', 'nukka', 'prosweet'];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => validSlugs.map((brand) => ({ locale, brand })));
}

export async function generateMetadata({ params }: { params: { locale: string; brand: string } }): Promise<Metadata> {
  if (!validSlugs.includes(params.brand as BrandSlug)) return {};
  const brand = brands[params.brand as BrandSlug];
  return { title: `${brand.name} · Kalite Çikolata`, description: `${brand.name} — Foodist Istanbul 2026.` };
}

export default async function BrandPage({ params }: { params: { locale: string; brand: string } }) {
  if (!validSlugs.includes(params.brand as BrandSlug)) notFound();
  setRequestLocale(params.locale);

  const slug = params.brand as BrandSlug;
  const brand = brands[slug];
  const t = await getTranslations('pages.brand');
  const tb = await getTranslations(`brandPages.${slug}`);
  const tc = await getTranslations('catalogues');

  const catalogue = catalogues.find((c) => c.key === slug);
  const waMessage = catalogue ? tc('whatsappMessage', { brand: brand.name }) : '';

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={brand.name} subtitle={tb('tagline')}>
        <div className="flex flex-wrap gap-3">
          {catalogue && (
            <Button href={catalogue.url} target="_blank" rel="noopener noreferrer" variant="gold">
              <DownloadIcon className="h-5 w-5" /> {tc('download')}
            </Button>
          )}
          <Button href={brand.website} target="_blank" rel="noopener noreferrer" variant="secondary">
            <GlobeIcon className="h-5 w-5" /> {t('officialSite')}
          </Button>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white p-12">
            <BrandLogo src={brand.logo} alt={brand.name} imgClassName="max-h-32 w-auto max-w-[280px] object-contain" fallback={<span className="font-heading text-4xl font-bold text-kalite-red">{brand.name}</span>} />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-kalite-cream sm:text-3xl">{tb('headline')}</h2>
            <p className="mt-4 leading-relaxed text-kalite-cream/70">{tb('body')}</p>

            <ul className="mt-6 space-y-3">
              {['p1', 'p2', 'p3'].map((p) => (
                <li key={p} className="flex items-start gap-3 text-kalite-cream/80">
                  <ArrowIcon className="mt-1 h-4 w-4 shrink-0 text-kalite-gold-soft rtl:rotate-180" />
                  {tb(`points.${p}`)}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {catalogue && (
                <Button href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                  <WhatsAppIcon className="h-5 w-5" /> {tc('requestWhatsapp')}
                </Button>
              )}
              <Button href="/contact" variant="secondary">{t('contactCta')}</Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
