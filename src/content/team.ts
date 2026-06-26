// Team contacts shown in the "Meet our team" section.
//
// TEMPORARY: real team data has been removed for the manager preview.
// Placeholder members only — no real names, phones or emails.
// Restore the real team (and re-add WhatsApp numbers) before launch.

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

export const team: TeamMember[] = [
  { name: 'Team Member 1', roleKey: 'salesSpecialist', markets: 'EN · AR · TR' },
  { name: 'Team Member 2', roleKey: 'exportManager', markets: 'EN · TR' },
  { name: 'Team Member 3', roleKey: 'salesRepresentative', markets: 'AR · EN' },
];
