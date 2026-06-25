'use client';

import { useTranslations } from 'next-intl';
import { whatsappLink } from '@/content/site';
import { WhatsAppIcon, CalendarIcon } from '@/components/ui/icons';

export function StickyMobileCTA() {
  const t = useTranslations('stickyCta');
  const tw = useTranslations('whatsapp');

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-kalite-brown/10 bg-kalite-cream/90 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href="#contact"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-kalite-red px-4 py-3 text-sm font-semibold text-white shadow-soft"
        >
          <CalendarIcon className="h-4 w-4" />
          {t('meeting')}
        </a>
        <a
          href={whatsappLink(tw('meeting'))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-soft"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t('whatsapp')}
        </a>
      </div>
    </div>
  );
}
