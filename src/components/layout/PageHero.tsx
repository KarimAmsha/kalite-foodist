import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

interface PageHeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

/** Reusable hero banner for inner pages — dark, with gold glow + grain. */
export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section id="main" className="relative grain overflow-hidden bg-night-radial pt-32 pb-14 sm:pt-36 sm:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-60" />
        <div className="absolute -top-24 end-[10%] h-72 w-72 rounded-full bg-kalite-gold/10 blur-3xl" />
        <div className="absolute bottom-0 start-[6%] h-60 w-60 rounded-full bg-kalite-red/10 blur-3xl" />
      </div>

      <div className="container-px relative">
        <Reveal>
          <div className="max-w-3xl">
            {eyebrow && (
              <span className="eyebrow mb-4">
                <span className="h-px w-6 bg-kalite-gold" />
                {eyebrow}
              </span>
            )}
            <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tightest text-kalite-cream sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && <p className="mt-5 max-w-2xl text-lg text-kalite-cream/65">{subtitle}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
