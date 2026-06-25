'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { eventData, whatsappLink, logos } from '@/content/site';
import { WhatsAppIcon, CalendarIcon, DownloadIcon, MapPinIcon, BoothIcon } from '@/components/ui/icons';

export function HeroSection() {
  const t = useTranslations('hero');
  const tw = useTranslations('whatsapp');
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: 'easeOut' as const },
        };

  return (
    <section id="main" className="relative overflow-hidden bg-cream-radial pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* Soft Istanbul trade-route line */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute -top-8 end-0 h-[460px] w-[760px] text-kalite-gold/15" viewBox="0 0 760 460" fill="none" stroke="currentColor">
          <path d="M0 380 C 210 280, 380 320, 540 190 S 740 70, 760 44" strokeWidth="2" strokeDasharray="5 9" />
        </svg>
        <div className="absolute -bottom-28 -start-28 h-80 w-80 rounded-full bg-kalite-red/5 blur-3xl" />
      </div>

      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="text-center lg:text-start">
            <motion.span {...fade(0)} className="eyebrow justify-center lg:justify-start">
              <span className="h-px w-6 bg-kalite-gold" />
              {t('eyebrow')}
            </motion.span>

            <motion.h1
              {...fade(0.05)}
              className="mt-5 font-heading text-[2.5rem] font-extrabold leading-[1.05] tracking-tightest text-kalite-ink sm:text-5xl lg:text-[3.5rem]"
            >
              {t('title')}
            </motion.h1>

            <motion.p {...fade(0.1)} className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-kalite-brown/75 lg:mx-0">
              {t('subtitle')}
            </motion.p>

            <motion.div {...fade(0.15)} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button href="#contact" size="lg">
                <CalendarIcon className="h-5 w-5" />
                {t('bookMeeting')}
              </Button>
              <Button href="#catalogues" size="lg" variant="secondary">
                <DownloadIcon className="h-5 w-5" />
                {t('downloadCatalogues')}
              </Button>
            </motion.div>

            <motion.div
              {...fade(0.2)}
              className="mx-auto mt-9 grid max-w-lg grid-cols-1 gap-px overflow-hidden rounded-2xl bg-kalite-brown/10 text-start shadow-card sm:grid-cols-3 lg:mx-0"
            >
              <MetaCell icon={<CalendarIcon className="h-4 w-4" />} label={t('metaDate')} value={eventData.dates} />
              <MetaCell icon={<MapPinIcon className="h-4 w-4" />} label={t('metaVenue')} value={eventData.city} />
              <MetaCell icon={<BoothIcon className="h-4 w-4" />} label={t('metaBooth')} value={eventData.booth} highlight />
            </motion.div>
          </div>

          {/* Stand pass card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-md"
          >
            <StandPass t={t} />
            <a
              href={whatsappLink(tw('default'))}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-4 start-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#1ebe5a] rtl:translate-x-1/2"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t('whatsapp')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MetaCell({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-start gap-2.5 p-4 ${highlight ? 'bg-kalite-red text-white' : 'bg-white'}`}>
      <span className={highlight ? 'mt-0.5 text-white' : 'mt-0.5 text-kalite-red'}>{icon}</span>
      <span className="min-w-0">
        <span className={`block text-[0.65rem] font-semibold uppercase tracking-wide ${highlight ? 'text-white/70' : 'text-kalite-brown/50'}`}>
          {label}
        </span>
        <span className={`block text-sm font-semibold ${highlight ? 'text-white' : 'text-kalite-ink'}`}>{value}</span>
      </span>
    </div>
  );
}

function StandPass({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-brown-sheen p-1 shadow-glow">
      <div className="rounded-[1.6rem] border border-kalite-gold/25 bg-brown-sheen p-7 text-kalite-cream">
        {/* top row */}
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-kalite-red font-heading text-xl font-bold text-white">
            K
          </span>
          <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5">
            <BrandLogo
              src={logos.foodist}
              alt="Foodist Istanbul 2026"
              imgClassName="h-5 w-auto"
              fallback={
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-kalite-red">
                  {t('passLabel')}
                </span>
              }
            />
          </span>
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-kalite-cream/55">
          {t('passVisit')}
        </p>

        {/* booth */}
        <div className="mt-3 flex items-end gap-3">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wide text-kalite-cream/45">Hall</p>
            <p className="font-heading text-5xl font-extrabold leading-none text-white">{eventData.hall}</p>
          </div>
          <span className="mb-1 h-10 w-px bg-kalite-gold/30" />
          <div>
            <p className="text-[0.65rem] uppercase tracking-wide text-kalite-cream/45">Stand</p>
            <p className="font-heading text-5xl font-extrabold leading-none text-kalite-gold-soft">{eventData.stand}</p>
          </div>
        </div>

        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-kalite-gold/40 to-transparent" />

        {/* details */}
        <dl className="space-y-3 text-sm">
          <div className="flex items-center gap-2.5">
            <CalendarIcon className="h-4 w-4 text-kalite-gold-soft" />
            <dd>{eventData.dates}</dd>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-kalite-gold-soft" />
            <dd>
              {eventData.venue}
              <span className="block text-kalite-cream/55">{eventData.city}</span>
            </dd>
          </div>
        </dl>

        {/* perforation dots */}
        <div className="mt-7 flex justify-between">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-kalite-cream/15" />
          ))}
        </div>
      </div>
    </div>
  );
}
