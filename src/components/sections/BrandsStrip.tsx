import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { brands } from '@/content/site';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ArrowIcon } from '@/components/ui/icons';

const items = [
  { key: 'kalite', ...brands.kalite, accent: 'text-kalite-red' },
  { key: 'nukka', ...brands.nukka, accent: 'text-kalite-red' },
  { key: 'prosweet', ...brands.prosweet, accent: 'text-kalite-red' },
] as const;

export function BrandsStrip() {
  const t = useTranslations('brandsStrip');

  return (
    <section className="border-y border-white/10 bg-kalite-night-2">
      <div className="container-px py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-kalite-cream/45">
          {t('label')}
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {items.map((b) => (
            <Link
              key={b.name}
              href="/brands"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-kalite-gold/40 hover:bg-white/[0.07]"
            >
              <span className="flex items-center rounded-2xl bg-white px-5 py-4">
                <BrandLogo
                  src={b.logo}
                  alt={b.name}
                  imgClassName="h-16 w-auto max-w-[190px] object-contain"
                  fallback={<span className={`font-heading text-2xl font-bold ${b.accent}`}>{b.name}</span>}
                />
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-kalite-cream/55 transition group-hover:text-kalite-gold-soft">
                {t('explore')}
                <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
