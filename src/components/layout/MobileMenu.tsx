'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { navItems } from '@/content/nav';
import { whatsappLink } from '@/content/site';
import { WhatsAppIcon } from '@/components/ui/icons';

export function MobileMenu() {
  const t = useTranslations('nav');
  const tw = useTranslations('whatsapp');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-kalite-cream"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 end-0 z-50 flex w-[82%] max-w-sm flex-col bg-kalite-night-2 p-6 shadow-soft"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg font-bold text-kalite-cream">
                  Kalite <span className="text-kalite-gold-soft">Çikolata</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-kalite-cream"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                        active ? 'bg-white/[0.06] text-kalite-gold-soft' : 'text-kalite-cream/80 hover:bg-white/[0.04]'
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <Button href="/contact" variant="gold" size="lg">
                  {t('bookMeeting')}
                </Button>
                <Button href={whatsappLink(tw('default'))} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
