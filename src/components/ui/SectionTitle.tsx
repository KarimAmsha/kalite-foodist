import type { ReactNode } from 'react';

interface SectionTitleProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function SectionTitle({ eyebrow, title, subtitle, align = 'center', className = '' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-start items-start';
  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="eyebrow mb-3">
          <span className="h-px w-6 bg-kalite-gold" />
          {eyebrow}
        </span>
      ) : (
        <span className="mb-4 block h-1 w-12 rounded-full bg-gold-sheen" />
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-kalite-cream sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-kalite-cream/65 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
