'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { eventData, whatsappLink } from '@/content/site';
import { WhatsAppIcon, CalendarIcon, DownloadIcon, MapPinIcon, BoothIcon } from '@/components/ui/icons';

export function HeroSection() {
  const t = useTranslations('hero');
  const tw = useTranslations('whatsapp');
  const reduce = useReducedMotion();

  return (
    <section
      id="main"
      className="relative overflow-hidden bg-cream-radial pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36"
    >
      {/* Soft Istanbul silhouette / trade-route line as a light backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute -top-10 end-0 h-[420px] w-[720px] text-kalite-gold/15"
          viewBox="0 0 720 420"
          fill="none"
          stroke="currentColor"
        >
          <path d="M0 360 C 200 260, 360 300, 520 180 S 700 60, 720 40" strokeWidth="2" strokeDasharray="6 8" />
        </svg>
        <div className="absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-kalite-red/5 blur-3xl" />
      </div>

      <div className="container-px relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy */}
          <div className="text-center lg:text-start">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-kalite-gold/40 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-kalite-brown/80"
            >
              {t('eyebrow')}
            </motion.span>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 font-heading text-4xl font-bold leading-tight tracking-tight text-kalite-brown sm:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-5 max-w-xl text-lg text-kalite-brown/70 lg:mx-0"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <Button href="#contact" size="lg">
                <CalendarIcon className="h-5 w-5" />
                {t('bookMeeting')}
              </Button>
              <Button href="#catalogues" size="lg" variant="secondary">
                <DownloadIcon className="h-5 w-5" />
                {t('downloadCatalogues')}
              </Button>
              <Button href={whatsappLink(tw('default'))} target="_blank" rel="noopener noreferrer" size="lg" variant="whatsapp" className="sm:hidden">
                <WhatsAppIcon className="h-5 w-5" />
                {t('whatsapp')}
              </Button>
            </motion.div>

            {/* Booth chip */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl border border-kalite-brown/10 bg-white/70 px-5 py-3 text-sm shadow-card lg:mx-0"
            >
              <span className="inline-flex items-center gap-2 text-kalite-brown">
                <CalendarIcon className="h-4 w-4 text-kalite-red" /> {eventData.dates}
              </span>
              <span className="inline-flex items-center gap-2 text-kalite-brown">
                <MapPinIcon className="h-4 w-4 text-kalite-red" /> {eventData.city}
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-kalite-red">
                <BoothIcon className="h-4 w-4" /> {eventData.booth}
              </span>
            </motion.div>
          </div>

          {/* Product orbit visual */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
      <div className="absolute inset-6 rounded-full border border-dashed border-kalite-gold/30" />
      <div className="absolute inset-16 rounded-full border border-dashed border-kalite-gold/20" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-44 w-44 place-items-center rounded-3xl bg-white shadow-glow">
          <div className="text-center">
            <span className="block font-heading text-5xl font-bold text-kalite-red">K</span>
            <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-kalite-brown/70">
              Çikolata
            </span>
          </div>
        </div>
      </div>

      {/* Floating product tokens */}
      {[
        { label: 'NUKKA', pos: 'top-2 start-10', color: 'bg-kalite-red' },
        { label: 'PROSWEET', pos: 'top-20 end-0', color: 'bg-kalite-brown' },
        { label: 'Jelly Funny', pos: 'bottom-10 start-0', color: 'bg-kalite-gold' },
        { label: 'New', pos: 'bottom-2 end-16', color: 'bg-kalite-red' },
      ].map((p, i) => (
        <motion.span
          key={p.label}
          className={`absolute ${p.pos} rounded-full ${p.color} px-3 py-1.5 text-xs font-semibold text-white shadow-soft`}
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          {p.label}
        </motion.span>
      ))}
    </div>
  );
}
