import type { ReactNode } from 'react';

// Passthrough root layout. The real <html>/<body> and providers live in
// `app/[locale]/layout.tsx`; this exists so the global `not-found` page has a
// root layout to render within (next-intl with always-prefixed locales).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
