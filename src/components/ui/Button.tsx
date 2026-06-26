import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'gold' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-kalite-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kalite-night disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-red-sheen text-white shadow-soft hover:-translate-y-0.5 hover:shadow-glow',
  gold: 'bg-gold-sheen text-kalite-ink shadow-soft hover:-translate-y-0.5 hover:shadow-gold-glow',
  secondary:
    'border border-kalite-gold/35 bg-white/[0.04] text-kalite-cream backdrop-blur-md hover:border-kalite-gold/70 hover:bg-white/[0.08] hover:-translate-y-0.5',
  ghost: 'text-kalite-cream/80 hover:bg-white/[0.06] hover:text-kalite-cream',
  whatsapp: 'bg-[#25D366] text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#1ebe5a]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:text-base',
  lg: 'px-7 py-3.5 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type AnchorProps = CommonProps & Omit<ComponentProps<'a'>, 'className' | 'children'> & { href: string };
type ButtonProps = CommonProps & Omit<ComponentProps<'button'>, 'className' | 'children'> & { href?: undefined };

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: AnchorProps | ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('href' in props && props.href) {
    const { href, ...rest } = props as AnchorProps;
    const isInternal = href.startsWith('/') && !href.startsWith('//');
    const isHashOnly = href.startsWith('#');
    if (isInternal && !isHashOnly) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}
