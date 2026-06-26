import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { catalogues } from '@/content/catalogues';
import { whatsappLink } from '@/content/site';
import { DownloadIcon, WhatsAppIcon, SparkleIcon } from '@/components/ui/icons';

export function CatalogueSection({ withHeader = true }: { withHeader?: boolean }) {
  const t = useTranslations('catalogues');

  return (
    <section id="catalogues" className={withHeader ? 'section-pad' : ''}>
      <div className="container-px">
        {withHeader && <SectionTitle eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />}

        <div className={`grid gap-5 sm:grid-cols-2 ${withHeader ? 'mt-12' : ''}`}>
          {catalogues.map((c, i) => {
            const waMessage = t('whatsappMessage', { brand: c.name });
            return (
              <Reveal key={c.key} delay={i * 0.07}>
                <Card className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-kalite-cream">{c.name}</h3>
                      {c.spotlight && (
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-kalite-gold/15 px-3 py-1 text-xs font-semibold text-kalite-gold-soft">
                          <SparkleIcon className="h-3.5 w-3.5" /> {t('spotlight')}
                        </span>
                      )}
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-kalite-gold-soft">
                      <DownloadIcon className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-kalite-cream/65">{t(`items.${c.descKey}`)}</p>

                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                    <Button href={c.url} target="_blank" rel="noopener noreferrer" size="sm" variant="gold" className="flex-1">
                      <DownloadIcon className="h-4 w-4" />
                      {t('download')}
                    </Button>
                    <Button href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" size="sm" variant="secondary" className="flex-1">
                      <WhatsAppIcon className="h-4 w-4" />
                      {t('requestWhatsapp')}
                    </Button>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
