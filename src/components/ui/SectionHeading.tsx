import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type SectionHeadingProps = {
  /** Texto corto en mayúsculas sobre el título, p. ej. "Sobre nosotros". */
  eyebrow?: string;
  /** Acepta nodos para resaltar palabras: <>Productos <span className="text-brand-600">certificados</span></>. */
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Usar `true` sobre fondos oscuros (tone="brand"). */
  inverted?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  inverted = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-sm font-semibold uppercase tracking-wider',
            inverted ? 'text-accent-300' : 'text-accent-700'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl',
          inverted ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-3 text-base leading-relaxed sm:text-lg', inverted ? 'text-brand-100' : 'text-slate-600')}>
          {description}
        </p>
      )}
    </div>
  );
}
