import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { SparkleIcon, GlobeIcon, BoothIcon, UsersIcon } from '@/components/ui/icons';

const points = [
  { key: 'newProducts', icon: SparkleIcon },
  { key: 'exportReady', icon: GlobeIcon },
  { key: 'variety', icon: BoothIcon },
  { key: 'team', icon: UsersIcon },
] as const;

export function WhyVisitSection() {
  const t = useTranslations('whyVisit');

  return (
    <section className="section-pad bg-white/50">
      <div className="container-px">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.key} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-kalite-brown/10 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-kalite-cream text-kalite-red transition group-hover:bg-kalite-red group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-kalite-brown">
                    {t(`points.${p.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-kalite-brown/70">
                    {t(`points.${p.key}.body`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
