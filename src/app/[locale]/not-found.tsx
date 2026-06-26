import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

// Localized 404 — rendered inside the [locale] layout (which provides <html>).
export default function LocaleNotFound() {
  const t = useTranslations('thankYou');
  return (
    <section className="grain bg-night-radial">
      <div className="container-px flex min-h-[75vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="font-heading text-7xl font-extrabold text-gold-gradient">404</h1>
        <p className="mt-4 text-lg text-kalite-cream/65">
          This page could not be found.
        </p>
        <Link
          href="/"
          className="mt-8 text-sm font-semibold text-kalite-cream/60 underline-offset-4 hover:text-kalite-gold-soft hover:underline"
        >
          ← {t('backHome')}
        </Link>
      </div>
    </section>
  );
}
