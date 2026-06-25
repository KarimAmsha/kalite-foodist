import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { productFamilies } from '@/content/catalogues';

const accentBar: Record<string, string> = {
  red: 'bg-kalite-red',
  brown: 'bg-kalite-brown',
  gold: 'bg-kalite-gold',
};

const accentText: Record<string, string> = {
  red: 'text-kalite-red',
  brown: 'text-kalite-brown',
  gold: 'text-kalite-gold',
};

export function ProductFamiliesSection() {
  const t = useTranslations('brands');

  return (
    <section id="products" className="section-pad">
      <div className="container-px">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productFamilies.map((b, i) => (
            <Reveal key={b.key} delay={i * 0.07}>
              <Card glass className="relative h-full overflow-hidden p-6">
                <span className={`absolute inset-x-0 top-0 h-1.5 ${accentBar[b.accent]}`} />
                <p className={`font-heading text-2xl font-bold ${accentText[b.accent]}`}>
                  {b.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-kalite-brown/75">
                  {t(`${b.key}.tagline`)}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
