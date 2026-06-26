import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { navItems } from '@/content/nav';
import { catalogues } from '@/content/catalogues';
import { company, brands, socials, eventData, whatsappLink, logos } from '@/content/site';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { WhatsAppIcon, MailIcon, MapPinIcon } from '@/components/ui/icons';

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const tw = useTranslations('whatsapp');
  const year = new Date().getFullYear();

  const brandList = [brands.kalite, brands.nukka, brands.prosweet];

  return (
    <footer className="relative grain border-t border-white/10 bg-kalite-night-2 text-kalite-cream">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-50" />
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <span className="inline-flex rounded-xl bg-white px-4 py-3 shadow-soft">
              <BrandLogo
                src={logos.kalite}
                alt="Kalite Çikolata"
                imgClassName="h-16 w-auto"
                fallback={<span className="font-heading text-lg font-bold text-kalite-red">Kalite Çikolata</span>}
              />
            </span>
            <p className="mt-5 max-w-xs text-sm text-kalite-cream/60">{t('tagline')}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-kalite-gold/30 px-3 py-1.5 text-xs font-semibold text-kalite-gold-soft">
              {t('booth')}
            </p>

            <div className="mt-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-kalite-cream/40">
                {t('exhibitingAt')}
              </p>
              <span className="mt-2 inline-flex rounded-lg bg-white px-3 py-2">
                <BrandLogo
                  src={logos.foodist}
                  alt="Foodist Istanbul 2026"
                  imgClassName="h-9 w-auto"
                  fallback={<span className="font-heading text-sm font-bold text-kalite-red">Foodist Istanbul</span>}
                />
              </span>
            </div>
          </div>

          {/* Navigate + brands */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-kalite-gold-soft">{t('quickLinks')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-kalite-cream/75 transition hover:text-white">
                    {tn(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalogues */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-kalite-gold-soft">{t('cataloguesTitle')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {catalogues.map((c) => (
                <li key={c.key}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-kalite-cream/75 transition hover:text-white">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-kalite-gold-soft">{t('brandsTitle')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {brandList.map((b) => (
                <li key={b.name}>
                  <a href={b.website} target="_blank" rel="noopener noreferrer" className="text-kalite-cream/75 transition hover:text-white">
                    {b.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-kalite-gold-soft">{t('contactTitle')}</h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5 text-kalite-cream/70">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-kalite-gold-soft" />
                <span className="leading-relaxed">{company.address}</span>
              </li>
              <li>
                <a href={`tel:${company.phoneHref}`} className="text-kalite-cream/75 transition hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 text-kalite-cream/75 transition hover:text-white">
                  <MailIcon className="h-4 w-4" /> {company.email}
                </a>
              </li>
              <li>
                <a href={whatsappLink(tw('default'))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-kalite-cream/75 transition hover:text-white">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3 text-sm">
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-kalite-cream/65 hover:text-white">
                Instagram
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-kalite-cream/65 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-kalite-cream/55">{company.legalName}</p>
          <p className="mt-2 text-xs text-kalite-cream/40">
            © {year} Kalite Çikolata. {t('rights')} · {eventData.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
