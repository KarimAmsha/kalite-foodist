'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { leadSchema, type LeadInput, interestTypes, brandChoices } from '@/lib/validators';
import { submitLead } from '@/lib/submitLead';
import { detectSource } from '@/lib/analytics';
import { env, whatsappLink } from '@/content/site';
import { WhatsAppIcon } from '@/components/ui/icons';

export function LeadFormSection() {
  const t = useTranslations('form');
  const locale = useLocale();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { interested_brand: 'none', locale, source: 'direct' },
  });

  // Build a WhatsApp message that carries everything the visitor typed, so a
  // failed webhook never loses a lead — they can send it to us in one tap.
  function buildFallbackWhatsapp(): string {
    const v = getValues();
    const lines = [
      t('fallbackLead'),
      `${t('fields.fullName')}: ${v.full_name || '-'}`,
      `${t('fields.company')}: ${v.company || '-'}`,
      `${t('fields.country')}: ${v.country || '-'}`,
      `${t('fields.phone')}: ${v.phone || '-'}`,
      `${t('fields.email')}: ${v.email || '-'}`,
      `${t('fields.interestType')}: ${v.interest_type ? t(`interest.${v.interest_type}`) : '-'}`,
      `${t('fields.interestedBrand')}: ${v.interested_brand ? t(`brandChoice.${v.interested_brand}`) : '-'}`,
      `${t('fields.preferredMeetingDate')}: ${v.preferred_meeting_date || '-'}`,
      `${t('fields.message')}: ${v.message || '-'}`,
    ];
    return whatsappLink(lines.join('\n'));
  }

  // Fill auto fields on the client (source needs window).
  useEffect(() => {
    setValue('locale', locale);
    setValue('source', detectSource());
  }, [locale, setValue]);

  async function onSubmit(data: LeadInput) {
    setServerError(null);
    const result = await submitLead(data);
    if (result.ok) {
      router.push('/thank-you');
    } else {
      setServerError(result.error || 'generic');
    }
  }

  const err = (key: string | undefined) => (key ? t(`errors.${key}`) : '');

  return (
    <section id="contact" className="section-pad">
      <div className="container-px">
        <div className="mx-auto max-w-2xl">
          <SectionTitle title={t('title')} subtitle={t('subtitle')} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-10 rounded-3xl border border-kalite-brown/10 bg-white p-6 shadow-card sm:p-8"
          >
            {/* Honeypot: hidden from users, bots fill it. */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Company website
                <input type="text" tabIndex={-1} autoComplete="off" {...register('company_website')} />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('fields.fullName')} error={err(errors.full_name?.message)} required>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder={t('placeholders.fullName')}
                  className={inputCls(!!errors.full_name)}
                  {...register('full_name')}
                />
              </Field>

              <Field label={t('fields.company')} error={err(errors.company?.message)} required>
                <input
                  type="text"
                  autoComplete="organization"
                  placeholder={t('placeholders.company')}
                  className={inputCls(!!errors.company)}
                  {...register('company')}
                />
              </Field>

              <Field label={t('fields.country')} error={err(errors.country?.message)} required>
                <input
                  type="text"
                  autoComplete="country-name"
                  placeholder={t('placeholders.country')}
                  className={inputCls(!!errors.country)}
                  {...register('country')}
                />
              </Field>

              <Field label={t('fields.phone')} error={err(errors.phone?.message)} required>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={t('placeholders.phone')}
                  className={inputCls(!!errors.phone)}
                  {...register('phone')}
                />
              </Field>

              <Field label={t('fields.email')} error={err(errors.email?.message)} optional={t('optional')}>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t('placeholders.email')}
                  className={inputCls(!!errors.email)}
                  {...register('email')}
                />
              </Field>

              <Field label={t('fields.interestType')} error={err(errors.interest_type?.message)} required>
                <select className={inputCls(!!errors.interest_type)} defaultValue="" {...register('interest_type')}>
                  <option value="" disabled>
                    —
                  </option>
                  {interestTypes.map((it) => (
                    <option key={it} value={it}>
                      {t(`interest.${it}`)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t('fields.interestedBrand')} optional={t('optional')}>
                <select className={inputCls(false)} {...register('interested_brand')}>
                  {brandChoices.map((b) => (
                    <option key={b} value={b}>
                      {t(`brandChoice.${b}`)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t('fields.preferredMeetingDate')} optional={t('optional')}>
                <input type="date" className={inputCls(false)} {...register('preferred_meeting_date')} />
              </Field>

              <div className="sm:col-span-2">
                <Field label={t('fields.message')} optional={t('optional')}>
                  <textarea
                    rows={4}
                    placeholder={t('placeholders.message')}
                    className={`${inputCls(false)} resize-y`}
                    {...register('message')}
                  />
                </Field>
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-kalite-brown/60">{t('consent')}</p>

            {serverError && (
              <div role="alert" className="mt-3 rounded-xl bg-kalite-red/10 p-4">
                <p className="text-sm font-medium text-kalite-red">{t(`errors.${serverError}`)}</p>
                <a
                  href={buildFallbackWhatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t('sendViaWhatsapp')}
                </a>
              </div>
            )}

            <div className="mt-6 flex flex-col items-center gap-3">
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? t('submitting') : t('submit')}
              </Button>
              {env.googleFormFallbackUrl && (
                <a
                  href={env.googleFormFallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-kalite-brown/60 underline-offset-4 hover:underline"
                >
                  {t('fallback')}
                </a>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-kalite-cream/40 px-4 py-3 text-sm text-kalite-brown outline-none transition placeholder:text-kalite-brown/40 focus:border-kalite-gold focus:bg-white focus:ring-2 focus:ring-kalite-gold/30 ${
    hasError ? 'border-kalite-red' : 'border-kalite-brown/15'
  }`;
}

function Field({
  label,
  error,
  required,
  optional,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-kalite-brown">
        {label}
        {required && <span className="text-kalite-red">*</span>}
        {optional && <span className="text-xs font-normal text-kalite-brown/45">({optional})</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-kalite-red">{error}</span>}
    </label>
  );
}
