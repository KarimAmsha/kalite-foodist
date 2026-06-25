import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { company, mapsUrl, whatsappLink, eventData } from '@/content/site';
import { MapPinIcon, MailIcon, WhatsAppIcon, BoothIcon } from '@/components/ui/icons';

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');
  const tw = useTranslations('whatsapp');

  const rows = [
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      label: t('addressLabel'),
      value: company.address,
    },
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      label: t('phoneLabel'),
      value: company.phone,
      href: `tel:${company.phoneHref}`,
    },
    {
      icon: <MailIcon className="h-5 w-5" />,
      label: t('emailLabel'),
      value: company.email,
      href: `mailto:${company.email}`,
    },
  ];

  return (
    <section id="visit" className="section-pad">
      <div className="container-px">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Info */}
          <Reveal>
            <div className="card-surface h-full p-8">
              <SectionTitle eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} align="start" />

              <ul className="mt-8 space-y-5">
                {rows.map((r) => (
                  <li key={r.label} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-kalite-cream text-kalite-red">
                      {r.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-kalite-brown/50">
                        {r.label}
                      </span>
                      {r.href ? (
                        <a href={r.href} className="block text-sm font-medium text-kalite-ink hover:text-kalite-red">
                          {r.value}
                        </a>
                      ) : (
                        <span className="block text-sm font-medium leading-relaxed text-kalite-ink">{r.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={whatsappLink(tw('default'))} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t('whatsapp')}
                </Button>
                <Button href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                  <MapPinIcon className="h-5 w-5" />
                  {t('directions')}
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Booth highlight panel */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-brown-sheen p-8 text-kalite-cream shadow-glow">
              <div aria-hidden className="pointer-events-none absolute -end-10 -top-10 h-48 w-48 rounded-full bg-kalite-red/20 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-kalite-gold/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-kalite-gold-soft">
                  <BoothIcon className="h-3.5 w-3.5" /> {t('boothEyebrow')}
                </span>
                <p className="mt-6 font-heading text-3xl font-bold leading-tight text-white">{t('boothTitle')}</p>
                <p className="mt-3 text-sm text-kalite-cream/70">{eventData.fullName}</p>
              </div>

              <div className="relative mt-8 grid grid-cols-2 gap-4">
                <Stat label="Hall" value={eventData.hall} />
                <Stat label="Stand" value={eventData.stand} highlight />
                <Stat label={t('dateShort')} value="Sep 1–4" />
                <Stat label={t('yearShort')} value="2026" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl border border-kalite-gold/15 bg-white/5 px-4 py-3">
      <p className="text-[0.65rem] uppercase tracking-wide text-kalite-cream/45">{label}</p>
      <p className={`font-heading text-2xl font-bold ${highlight ? 'text-kalite-gold-soft' : 'text-white'}`}>{value}</p>
    </div>
  );
}
