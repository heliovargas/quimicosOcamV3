import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type BadgeTone = 'brand' | 'accent' | 'neutral' | 'frog';

type BadgeProps = {
  tone?: BadgeTone;
  /** Punto de color a la izquierda, útil para "estado" o "disponible". */
  dot?: boolean;
  className?: string;
  children: ReactNode;
};

const tones: Record<BadgeTone, { pill: string; dot: string }> = {
  brand: { pill: 'bg-brand-50 text-brand-700 ring-brand-200', dot: 'bg-brand-500' },
  accent: { pill: 'bg-accent-50 text-accent-800 ring-accent-200', dot: 'bg-accent-500' },
  neutral: { pill: 'bg-slate-100 text-slate-700 ring-slate-200', dot: 'bg-slate-400' },
  frog: { pill: 'bg-red-50 text-red-700 ring-red-200', dot: 'bg-frog' },
};

export default function Badge({ tone = 'brand', dot = false, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
        tones[tone].pill,
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', tones[tone].dot)} aria-hidden="true" />}
      {children}
    </span>
  );
}
