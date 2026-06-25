import { z } from 'zod';

export const interestTypes = [
  'catalogue',
  'meeting',
  'quotation',
  'samples',
  'distribution',
] as const;

export const brandChoices = [
  'kalite',
  'nukka',
  'prosweet',
  'jellyFunny',
  'newProducts',
  'none',
] as const;

/**
 * Lead form schema. Error messages are i18n keys (under `form.errors`)
 * resolved at render time, so the same schema works for every locale.
 */
export const leadSchema = z.object({
  full_name: z.string().trim().min(2, 'fullName'),
  company: z.string().trim().min(2, 'company'),
  country: z.string().trim().min(2, 'country'),
  phone: z
    .string()
    .trim()
    .min(6, 'phone')
    .regex(/^[+()0-9\s-]{6,}$/, 'phone'),
  email: z
    .string()
    .trim()
    .email('email')
    .optional()
    .or(z.literal('')),
  interest_type: z.enum(interestTypes, { errorMap: () => ({ message: 'interestType' }) }),
  interested_brand: z.enum(brandChoices).optional(),
  preferred_meeting_date: z.string().optional().or(z.literal('')),
  message: z.string().max(2000).optional().or(z.literal('')),
  // Auto-filled, validated server-side too.
  locale: z.string().optional(),
  source: z.string().optional(),
  // Honeypot — must stay empty.
  company_website: z.string().max(0).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;
