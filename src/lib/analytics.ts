'use client';

/**
 * Lightweight source detection for lead attribution.
 * Reads the UTM `source` param (e.g. ?source=booth_qr) and falls back to
 * the referrer host. No third-party scripts, no cookies.
 */
export function detectSource(): string {
  if (typeof window === 'undefined') return 'direct';

  const params = new URLSearchParams(window.location.search);
  const utm = params.get('source') || params.get('utm_source');
  if (utm) return utm;

  const ref = document.referrer;
  if (!ref) return 'direct';

  try {
    const host = new URL(ref).hostname.replace(/^www\./, '');
    if (host.includes('instagram')) return 'instagram';
    if (host.includes('linkedin')) return 'linkedin';
    if (host.includes('whatsapp') || host.includes('wa.me')) return 'whatsapp';
    return host;
  } catch {
    return 'referral';
  }
}
