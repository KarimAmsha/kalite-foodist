import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { team } from '@/content/team';
import { whatsappLink } from '@/content/site';
import { WhatsAppIcon, MailIcon } from '@/components/ui/icons';

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function TeamSection() {
  const t = useTranslations('team');
  const tw = useTranslations('whatsapp');

  return (
    <section id="team" className="section-pad bg-white/50">
      <div className="container-px">
        <SectionTitle eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {team.map((m, i) => {
            const initials = m.name
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('');
            return (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="card-surface h-full overflow-hidden">
                  <div className="flex items-center gap-4 border-b border-kalite-brown/10 bg-cream-radial p-6">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-red-sheen font-heading text-xl font-bold text-white shadow-soft">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <p className="font-heading text-lg font-bold text-kalite-ink">{m.name}</p>
                      <p className="text-sm font-medium text-kalite-red">{t(`roles.${m.roleKey}`)}</p>
                      <p className="mt-0.5 text-xs text-kalite-brown/55">{m.markets}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    {m.whatsapp && (
                      <a
                        href={whatsappLink(tw('meeting'))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl bg-[#25D366]/10 px-4 py-2.5 text-sm font-semibold text-[#1c8a45] transition hover:bg-[#25D366]/20"
                      >
                        <WhatsAppIcon className="h-4 w-4" /> {t('contact')}
                      </a>
                    )}
                    {m.phone && (
                      <a
                        href={`tel:${m.phoneHref}`}
                        className="flex items-center gap-3 rounded-xl bg-kalite-cream px-4 py-2.5 text-sm font-medium text-kalite-ink transition hover:bg-kalite-cream-deep"
                      >
                        <PhoneIcon className="h-4 w-4 text-kalite-red" /> {m.phone}
                      </a>
                    )}
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="flex items-center gap-3 rounded-xl bg-kalite-cream px-4 py-2.5 text-sm font-medium text-kalite-ink transition hover:bg-kalite-cream-deep"
                      >
                        <MailIcon className="h-4 w-4 text-kalite-red" /> {m.email}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
