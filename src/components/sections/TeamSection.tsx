import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { team } from '@/content/team';
import { whatsappLink } from '@/content/site';
import { WhatsAppIcon, MailIcon } from '@/components/ui/icons';

export function TeamSection() {
  const t = useTranslations('team');
  const tw = useTranslations('whatsapp');

  return (
    <section id="team" className="section-pad">
      <div className="container-px">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {team.map((m, i) => {
            const initials = m.name
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('');
            return (
              <Reveal key={m.name} delay={i * 0.08}>
                <Card className="flex h-full items-center gap-4 p-6">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-kalite-cream font-heading text-lg font-bold text-kalite-red">
                    {initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-lg font-bold text-kalite-brown">{m.name}</p>
                    <p className="text-sm text-kalite-brown/70">{t(`roles.${m.roleKey}`)}</p>
                    <p className="mt-0.5 text-xs text-kalite-brown/50">{m.markets}</p>
                    <div className="mt-3 flex gap-2">
                      {m.whatsapp && (
                        <a
                          href={whatsappLink(tw('meeting'))}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${m.name}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          <WhatsAppIcon className="h-3.5 w-3.5" /> {t('contact')}
                        </a>
                      )}
                      {m.email && (
                        <a
                          href={`mailto:${m.email}`}
                          aria-label={`Email ${m.name}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-kalite-brown/15 px-3 py-1.5 text-xs font-semibold text-kalite-brown"
                        >
                          <MailIcon className="h-3.5 w-3.5" /> Email
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
