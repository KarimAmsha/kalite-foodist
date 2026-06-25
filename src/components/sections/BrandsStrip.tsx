import { useTranslations } from 'next-intl';
import { brands } from '@/content/site';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ArrowIcon } from '@/components/ui/icons';

const items = [
  { ...brands.kalite, accent: 'text-kalite-red' },
  { ...brands.nukka, accent: 'text-kalite-ink' },
  { ...brands.prosweet, accent: 'text-kalite-brown' },
] as const;

export function BrandsStrip() {
  const t = useTranslations('brandsStrip');

  return (
    <section className="border-y border-kalite-brown/10 bg-white/60">
      <div className="container-px py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-kalite-brown/50">
          {t('label')}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {items.map((b) => (
            <a
              key={b.name}
              href={b.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-kalite-brown/10 bg-white px-6 py-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <BrandLogo
                src={b.logo}
                alt={b.name}
                imgClassName="h-16 w-auto max-w-[210px] object-contain"
                fallback={<span className={`font-heading text-2xl font-bold ${b.accent}`}>{b.name}</span>}
              />
              <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-kalite-brown/50 transition group-hover:text-kalite-red">
                {t('visit')}
                <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
