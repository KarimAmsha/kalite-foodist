import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-kalite-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kalite-cream disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-kalite-red text-white shadow-soft hover:bg-[#8c1d2a] hover:-translate-y-0.5',
  secondary:
    'bg-white text-kalite-brown ring-1 ring-kalite-brown/15 shadow-card hover:ring-kalite-gold/60 hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-kalite-brown hover:bg-kalite-brown/5',
  whatsapp:
    'bg-[#25D366] text-white shadow-soft hover:bg-[#1ebe5a] hover:-translate-y-0.5',
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

type AnchorProps = CommonProps &
  Omit<ComponentProps<'a'>, 'className' | 'children'> & { href: string };
type ButtonProps = CommonProps &
  Omit<ComponentProps<'button'>, 'className' | 'children'> & { href?: undefined };

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: AnchorProps | ButtonProps) {
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
