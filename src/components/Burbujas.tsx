import { useState, type CSSProperties } from 'react';
import { cn } from '../utils/cn';

/** Posición horizontal, tamaño, duración y arranque (negativo = ya en vuelo al cargar). */
const CONFIG = [
  { left: '6%', size: 150, dur: '38s', delay: '-4s' },
  { left: '18%', size: 70, dur: '30s', delay: '-18s' },
  { left: '31%', size: 110, dur: '42s', delay: '-27s' },
  { left: '52%', size: 56, dur: '28s', delay: '-9s' },
  { left: '66%', size: 170, dur: '46s', delay: '-31s' },
  { left: '80%', size: 90, dur: '34s', delay: '-14s' },
  { left: '91%', size: 120, dur: '40s', delay: '-22s' },
];

const GOTAS = 6;

type Estado = { generacion: number; reventada: boolean };

/**
 * Burbujas decorativas que suben despacio por el fondo del hero.
 * Al tocarlas revientan con unas gotas y, medio segundo después, nace una nueva desde abajo.
 * El contenedor no captura clics; solo cada burbuja.
 */
export default function Burbujas() {
  const [estados, setEstados] = useState<Estado[]>(() => CONFIG.map(() => ({ generacion: 0, reventada: false })));

  const reventar = (i: number) => {
    setEstados((prev) => prev.map((e, j) => (j === i && !e.reventada ? { ...e, reventada: true } : e)));
    window.setTimeout(() => {
      setEstados((prev) => prev.map((e, j) => (j === i ? { generacion: e.generacion + 1, reventada: false } : e)));
    }, 550);
  };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {CONFIG.map((b, i) => {
        const { generacion, reventada } = estados[i];
        return (
          <span
            key={`${i}-${generacion}`}
            className="absolute -bottom-[14%] will-change-transform animate-burbuja"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: b.dur,
              animationDelay: generacion === 0 ? b.delay : '0s',
            }}
          >
            <span
              onPointerDown={() => reventar(i)}
              className={cn(
                'pointer-events-auto block h-full w-full cursor-pointer rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.45)_16%,rgba(182,205,236,0.28)_44%,rgba(46,92,154,0.10)_70%,rgba(46,92,154,0.02)_100%)] shadow-[inset_-8px_-10px_18px_rgba(46,92,154,0.08)] ring-1 ring-brand-300/40 ring-inset transition-transform duration-300 hover:scale-105',
                reventada && 'animate-reventar'
              )}
            />
            {reventada &&
              Array.from({ length: GOTAS }, (_, k) => (
                <span
                  key={k}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: `rotate(${(360 / GOTAS) * k}deg)`, '--salto': `${b.size * 0.7}px` } as CSSProperties}
                >
                  <i className="block h-2 w-2 rounded-full bg-brand-300 animate-gota" />
                </span>
              ))}
          </span>
        );
      })}
    </div>
  );
}
