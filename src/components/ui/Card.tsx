import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds the hover lift + gold glow interaction. */
  interactive?: boolean;
}

export function Card({ children, className = '', interactive = true }: CardProps) {
  return (
    <div
      className={`glass ${
        interactive ? 'transition-all duration-300 hover:-translate-y-1 hover:border-kalite-gold/40 hover:shadow-glow' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
