import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** glass/cream surface used for catalogue + brand cards */
  glass?: boolean;
}

export function Card({ children, className = '', glass = false }: CardProps) {
  const surface = glass
    ? 'bg-white/70 backdrop-blur-md ring-1 ring-white/60'
    : 'bg-white ring-1 ring-kalite-brown/10';

  return (
    <div
      className={`rounded-2xl ${surface} shadow-card transition-all duration-300 hover:shadow-glow hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}
