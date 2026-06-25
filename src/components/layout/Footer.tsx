import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { catalogues } from '@/content/catalogues';
import { company, socials, eventData, whatsappLink, env } from '@/content/site';
import { WhatsAppIcon, MailIcon } from '@/components/ui/icons';

export function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('catalogues');
  const tn = useTranslations('nav');
  const tw = useTranslations('whatsapp');
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: '#event', label: tn('event') },
    { href: '#products', label: tn('products') },
    { href: '#catalogues', label: tn('catalogues') },
    { href: '#team', label: tn('team') },
    { href: '#contact', label: tn('contact') },
  ];

  return (
    <footer className="bg-kalite-brown text-kalite-cream">
      <div className="container-px py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-kalite-red font-heading text-lg font-bold text-white">
                K
              </span>
              <span className="font-heading text-lg font-bold">Kalite Çikolata</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-kalite-cream/70">{t('tagline')}</p>
            <p className="mt-4 text-xs font-medium text-kalite-gold">{t('booth')}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-kalite-gold">
              {t('quickLinks')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-kalite-cream/80 transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalogues */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-kalite-gold">
              {t('cataloguesTitle')}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {catalogues.map((c) => (
                <li key={c.key}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-kalite-cream/80 transition hover:text-white"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-kalite-gold">
              {t('contactTitle')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={whatsappLink(tw('default'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-kalite-cream/80 transition hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2 text-kalite-cream/80 transition hover:text-white"
                >
                  <MailIcon className="h-4 w-4" /> {company.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs text-kalite-cream/60">{t('follow')}</p>
            <div className="mt-2 flex gap-3 text-sm">
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-kalite-cream/80 hover:text-white">
                Instagram
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-kalite-cream/80 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-kalite-cream/15 pt-6">
          <p className="text-xs text-kalite-cream/60">{company.legalName}</p>
          <p className="mt-2 text-xs text-kalite-cream/50">
            © {year} Kalite Çikolata. {t('rights')} · {eventData.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
