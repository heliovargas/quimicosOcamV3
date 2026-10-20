import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type ContainerProps = {
  as?: 'div' | 'nav' | 'header' | 'footer';
  className?: string;
  children: ReactNode;
};

/** Ancho máximo y gutters laterales de todo el sitio. Mismo valor que usaban las secciones viejas. */
export default function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-7xl px-6 lg:px-8', className)}>{children}</Tag>;
}
