import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { whatsappLink, eventData } from '@/content/site';
import { WhatsAppIcon, CalendarIcon } from '@/components/ui/icons';

/** High-contrast conversion band reused at the bottom of pages. */
export function CtaBand() {
  const t = useTranslations('cta');
  const tw = useTranslations('whatsapp');

  return (
    <section className="section-pad">
      <div className="container-px">
        <Reveal>
          <div className="relative grain overflow-hidden rounded-3xl border border-kalite-gold/25 bg-night-radial p-10 text-center shadow-glow sm:p-14">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-16 start-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-kalite-gold/15 blur-3xl" />
            </div>
            <div className="relative">
              <span className="eyebrow justify-center">
                <span className="h-px w-6 bg-kalite-gold" />
                {eventData.booth}
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold text-kalite-cream sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-kalite-cream/65">{t('subtitle')}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" size="lg" variant="gold">
                  <CalendarIcon className="h-5 w-5" />
                  {t('bookMeeting')}
                </Button>
                <Button href={whatsappLink(tw('meeting'))} target="_blank" rel="noopener noreferrer" size="lg" variant="whatsapp">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t('whatsapp')}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
