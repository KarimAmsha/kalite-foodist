import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { eventData } from '@/content/site';
import { CalendarIcon, MapPinIcon, BoothIcon } from '@/components/ui/icons';

export function EventInfoSection() {
  const t = useTranslations('event');

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    eventData.mapsQuery,
  )}`;

  const cards = [
    {
      icon: <CalendarIcon className="h-6 w-6" />,
      label: t('dateLabel'),
      value: eventData.dates,
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      label: t('venueLabel'),
      value: `${eventData.venue}, ${eventData.city}`,
      link: { href: mapsUrl, label: t('getDirections') },
    },
    {
      icon: <BoothIcon className="h-6 w-6" />,
      label: t('boothLabel'),
      value: eventData.booth,
      highlight: true,
    },
  ];

  return (
    <section id="event" className="section-pad">
      <div className="container-px">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <Card className="h-full p-6">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${
                    c.highlight ? 'bg-kalite-red text-white' : 'bg-kalite-cream text-kalite-red'
                  }`}
                >
                  {c.icon}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-kalite-brown/60">
                  {c.label}
                </p>
                <p
                  className={`mt-1 text-lg font-semibold ${
                    c.highlight ? 'text-kalite-red' : 'text-kalite-brown'
                  }`}
                >
                  {c.value}
                </p>
                {c.link && (
                  <a
                    href={c.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-kalite-red underline-offset-4 hover:underline"
                  >
                    {c.link.label} →
                  </a>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
