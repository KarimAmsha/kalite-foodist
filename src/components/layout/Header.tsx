'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { logos } from '@/content/site';

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#event', label: t('event') },
    { href: '#products', label: t('products') },
    { href: '#catalogues', label: t('catalogues') },
    { href: '#team', label: t('team') },
    { href: '#visit', label: t('visit') },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-kalite-brown/10 bg-kalite-cream/85 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-kalite-red focus:shadow-soft"
      >
        {t('skipToContent')}
      </a>

      <nav className="container-px flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Kalite Çikolata">
          <BrandLogo
            src={logos.kalite}
            alt="Kalite Çikolata"
            eager
            imgClassName="h-11 w-auto sm:h-12"
            fallback={
              <span className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-kalite-red font-heading text-lg font-bold text-white shadow-soft">
                  K
                </span>
                <span className="hidden font-heading text-lg font-bold tracking-tight text-kalite-brown sm:block">
                  Kalite <span className="text-kalite-red">Çikolata</span>
                </span>
              </span>
            }
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-kalite-brown/80 transition hover:text-kalite-red"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Button href="#contact" size="sm" className="hidden sm:inline-flex">
            {t('bookMeeting')}
          </Button>
        </div>
      </nav>
    </header>
  );
}
