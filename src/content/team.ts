// Team contacts shown in the "Meet our team" section.
//
// TEMPORARY: placeholder team for the manager preview — no real names.
// Phones/WhatsApp are placeholder numbers; emails are generic role mailboxes.
// Restore the real team and real numbers before launch.

export interface TeamMember {
  name: string;
  /** i18n key under `team.roles.<roleKey>` */
  roleKey: string;
  /** Languages / markets this person covers (display string). */
  markets: string;
  /** International WhatsApp number, no '+'. Empty hides the WhatsApp button. */
  whatsapp?: string;
  /** Display phone (tel/fax). */
  phone?: string;
  phoneHref?: string;
  email?: string;
}

// Placeholder contact details (clearly not real).
const PH_WA = '900000000000';
const PH_PHONE = '+90 (212) 000 00 00';
const PH_PHONE_HREF = '+902120000000';

export const team: TeamMember[] = [
  { name: 'Team Member 1', roleKey: 'salesSpecialist', markets: 'EN · AR · TR', whatsapp: PH_WA, phone: PH_PHONE, phoneHref: PH_PHONE_HREF, email: 'sales@example.com' },
  { name: 'Team Member 2', roleKey: 'exportManager', markets: 'EN · TR', whatsapp: PH_WA, phone: PH_PHONE, phoneHref: PH_PHONE_HREF, email: 'export@example.com' },
  { name: 'Team Member 3', roleKey: 'salesRepresentative', markets: 'AR · EN', whatsapp: PH_WA, phone: PH_PHONE, phoneHref: PH_PHONE_HREF, email: 'sales2@example.com' },
  { name: 'Team Member 4', roleKey: 'operationsManager', markets: 'TR · EN', whatsapp: PH_WA, phone: PH_PHONE, phoneHref: PH_PHONE_HREF, email: 'operations@example.com' },
  { name: 'Team Member 5', roleKey: 'logisticsCoordinator', markets: 'EN · TR', whatsapp: PH_WA, phone: PH_PHONE, phoneHref: PH_PHONE_HREF, email: 'logistics@example.com' },
  { name: 'Team Member 6', roleKey: 'marketingSpecialist', markets: 'EN · AR', whatsapp: PH_WA, phone: PH_PHONE, phoneHref: PH_PHONE_HREF, email: 'marketing@example.com' },
];
