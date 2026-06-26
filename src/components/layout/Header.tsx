'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { navItems } from '@/content/nav';
import { logos } from '@/content/site';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-kalite-night/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-kalite-red focus:shadow-soft"
      >
        {t('skipToContent')}
      </a>

      <nav className="container-px flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link href="/" className="flex items-center" aria-label="Kalite Çikolata">
          <span className="inline-flex items-center rounded-xl bg-white px-2.5 py-1.5 shadow-soft ring-1 ring-black/5">
            <BrandLogo
              src={logos.kalite}
              alt="Kalite Çikolata"
              eager
              imgClassName="h-8 w-auto sm:h-9"
              fallback={
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-sheen font-heading text-lg font-bold text-white">
                  K
                </span>
              }
            />
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  active ? 'text-kalite-gold-soft' : 'text-kalite-cream/75 hover:text-kalite-cream'
                }`}
              >
                {t(item.key)}
                {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold-sheen" />}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Button href="/contact" size="sm" variant="gold" className="hidden sm:inline-flex">
            {t('bookMeeting')}
          </Button>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
