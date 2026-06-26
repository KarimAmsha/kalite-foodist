// Primary navigation routes. `key` maps to i18n `nav.<key>`.
export interface NavItem {
  key: string;
  href: string;
}

export const navItems: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'brands', href: '/brands' },
  { key: 'catalogues', href: '/catalogues' },
  { key: 'about', href: '/about' },
  { key: 'team', href: '/team' },
  { key: 'contact', href: '/contact' },
];
