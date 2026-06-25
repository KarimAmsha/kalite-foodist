'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

interface BrandLogoProps {
  src: string;
  alt: string;
  /** Shown if the image file is missing (so the site never looks broken). */
  fallback: ReactNode;
  imgClassName?: string;
  eager?: boolean;
}

/**
 * Renders a logo image when the file exists in /public, otherwise gracefully
 * falls back to a styled text mark. Drop the real files into
 * public/assets/logos/ (see that folder's README) and they appear automatically.
 */
export function BrandLogo({ src, alt, fallback, imgClassName, eager = false }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  // Plain <img> (not next/image) so a missing file fails cleanly to the
  // fallback without build-time/domain configuration.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={imgClassName}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  );
}
