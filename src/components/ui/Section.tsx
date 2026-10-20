import type { ReactNode } from 'react';
import Container from './Container';
import { cn } from '../../utils/cn';

export type SectionTone = 'white' | 'muted' | 'brand';

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  /** Clases extra para el <section> (fondos, overflow, etc.). */
  className?: string;
  /** Clases extra para el contenedor interno. */
  containerClassName?: string;
  children: ReactNode;
};

const tones: Record<SectionTone, string> = {
  white: 'bg-white',
  muted: 'bg-slate-50',
  brand: 'bg-brand-900 text-brand-50',
};

/** Ritmo vertical único para las secciones del home. */
export default function Section({ id, tone = 'white', className, containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-14 md:py-20', tones[tone], className)}>
      <Container className={cn('relative', containerClassName)}>{children}</Container>
    </section>
  );
}
