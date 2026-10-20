import { useEffect, useRef, useState } from 'react';

/**
 * Revela un bloque cuando entra en pantalla. Devuelve [ref, visible]:
 * el ref va en el elemento a observar y `visible` pasa a true una sola vez.
 */
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold, rootMargin: '50px' }
    );
    observer.observe(elemento);
    return () => observer.unobserve(elemento);
  }, [threshold]);

  return [ref, visible] as const;
}
