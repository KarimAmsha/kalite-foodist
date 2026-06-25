import type { ReactNode } from 'react';

interface SectionTitleProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
  tone?: 'dark' | 'light';
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  tone = 'dark',
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-start items-start';
  const titleColor = tone === 'light' ? 'text-white' : 'text-kalite-ink';
  const subColor = tone === 'light' ? 'text-white/70' : 'text-kalite-brown/70';

  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="eyebrow mb-3">
          <span className="h-px w-6 bg-kalite-gold" />
          {eyebrow}
        </span>
      ) : (
        <span className="mb-4 block h-1 w-12 rounded-full bg-kalite-gold" />
      )}
      <h2 className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-3 text-base sm:text-lg ${subColor}`}>{subtitle}</p>}
    </div>
  );
}
