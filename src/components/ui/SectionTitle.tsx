import type { ReactNode } from 'react';

interface SectionTitleProps {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-start';
  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      <span className="mx-auto mb-4 block h-1 w-12 rounded-full bg-kalite-gold" />
      <h2 className="font-heading text-3xl font-bold tracking-tight text-kalite-brown sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-kalite-brown/70 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
