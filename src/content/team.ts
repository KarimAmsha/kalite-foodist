// Team contacts shown in the "Meet our team" section.
// Per the brief: only approved staff, no photos unless professional approved
// images exist. More members will be added later.

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
  {
    name: 'Kerim Othman',
    roleKey: 'salesSpecialist',
    markets: 'EN · AR · TR',
    whatsapp: '905382319857',
    phone: '+90 (212) 803 60 00',
    phoneHref: '+902128036000',
    email: 'info@kalitecikolata.com.tr',
  },
];
