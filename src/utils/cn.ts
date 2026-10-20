import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Une clases de Tailwind y resuelve conflictos: cn('px-4', 'px-6') === 'px-6'. */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
