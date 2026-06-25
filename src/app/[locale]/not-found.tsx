import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

// Localized 404 — rendered inside the [locale] layout (which provides <html>).
export default function LocaleNotFound() {
  const t = useTranslations('thankYou');
  return (
    <section className="bg-cream-radial">
      <div className="container-px flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="font-heading text-6xl font-bold text-kalite-red">404</h1>
        <p className="mt-4 text-lg text-kalite-brown/70">
          This page could not be found.
        </p>
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
