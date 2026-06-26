import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';

const items = ['where', 'meeting', 'catalogue', 'markets'] as const;

export function FAQSection() {
  const t = useTranslations('faq');

  return (
    <section className="section-pad">
      <div className="container-px">
        <SectionTitle eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {items.map((key, i) => (
            <Reveal key={key} delay={i * 0.05}>
              <details className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md open:border-kalite-gold/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-kalite-cream">
                  {t(`items.${key}.q`)}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.06] text-kalite-gold-soft transition group-open:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-kalite-cream/70">{t(`items.${key}.a`)}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
