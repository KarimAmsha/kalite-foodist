// Team contacts shown in the "Meet our team" section.
// Per the brief: only approved staff, no photos unless professional approved
// images exist, and only publish numbers after management approval.

export interface TeamMember {
  name: string;
  /** i18n key under `team.roles.<roleKey>` */
  roleKey: string;
  /** Languages / markets this person covers (display string). */
  markets: string;
  /** International WhatsApp number, no '+'. Empty hides the WhatsApp button. */
  whatsapp?: string;
  email?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Karim Othman',
    roleKey: 'salesSpecialist',
    markets: 'EN · AR · Middle East',
    whatsapp: '905520802916',
    email: 'export@kalitecikolata.com',
  },
];
