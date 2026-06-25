import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { whatsappLink } from '@/content/site';
import { CheckIcon, WhatsAppIcon, DownloadIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('thankYou');
  const tw = await getTranslations('whatsapp');

  return (
    <section className="bg-cream-radial">
      <div className="container-px flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-kalite-red text-white shadow-glow animate-fade-up">
          <CheckIcon className="h-10 w-10" />
        </div>

        <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight text-kalite-brown sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 max-w-md text-lg text-kalite-brown/70">{t('body')}</p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            href={whatsappLink(tw('default'))}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t('whatsapp')}
          </Button>
          <Button href="/#catalogues" variant="secondary" size="lg">
            <DownloadIcon className="h-5 w-5" />
            {t('downloadCatalogues')}
          </Button>
        </div>

        <Link
          href="/"
          className="mt-8 text-sm font-semibold text-kalite-brown/60 underline-offset-4 hover:text-kalite-red hover:underline"
        >
          ← {t('backHome')}
        </Link>
      </div>
    </section>
  );
}
