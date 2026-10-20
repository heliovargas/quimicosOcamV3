'use client';

import { Award, Beaker, Check, Heart, Target, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { Section } from './ui';

type Bloque = {
  icono: LucideIcon;
  titulo: string;
  parrafos: string[];
  /** Verde para los bloques que antes iban en verde. */
  acento?: boolean;
};

const bloques: Bloque[] = [
  {
    icono: Beaker,
    titulo: 'Tecnología e Innovación',
    parrafos: [
      'OCAM Productos de Limpieza es una compañía dirigida a la producción de productos de limpieza, considerada líder en área de distribución en la Zona Norte de nuestro país, gracias a la calidad e integridad que ofrecemos.',
      'Nuestra tecnología nos permite la creación de fórmulas para productos de limpieza y desinfección, desarrolladas bajo las más estrictas normas de calidad, con materias primas importadas y con el menor costo económico posible.',
    ],
  },
  {
    icono: Heart,
    titulo: 'Compromiso Social',
    acento: true,
    parrafos: [
      'En OCAM nos solidarizamos con el sector doméstico, lechero e industrial, poniendo en sus manos productos de alta calidad a precios accesibles, ampliamente probados y debidamente registrados en el Ministerio de Salud.',
    ],
  },
  {
    icono: Users,
    titulo: 'Equipo y Capacidad',
    parrafos: [
      'Contamos con personal especializado en el área de producción, distribución y agentes de ventas, que con gusto le atenderán. Así como una red de comercios abastecidos a lo largo de diferentes cantones del país.',
      'Nuestra amplia experiencia y alta capacidad de producción nos permite suplir las necesidades de su empresa, comercio u hogar con la mayor rapidez, facilidad y eficacia.',
    ],
  },
  {
    icono: Award,
    titulo: 'Nuestra Promesa',
    parrafos: [
      'Nos comprometemos con usted al ofrecerle los mejores productos y servicios. Puede confiar en que con nosotros siempre contará con que todos nuestros artículos se encuentran disponibles para entrega inmediata.',
    ],
  },
];

const datos = [
  'Producción propia desde 1998',
  'Para el sector doméstico, lechero e industrial',
  'Productos registrados en el Ministerio de Salud',
];

type Identidad = { icono: LucideIcon; titulo: string; texto: string; acento?: boolean; etiqueta?: string };

const identidad: Identidad[] = [
  {
    icono: Target,
    titulo: 'Visión',
    texto:
      'Aspiramos a ser una de las fábricas de productos de limpieza más competitiva y productiva del país, con procesos de mejora continua que nos mantienen a la vanguardia.',
  },
  {
    icono: Heart,
    titulo: 'Valores',
    acento: true,
    texto:
      'Integridad, innovación y espíritu emprendedor. Estos valores nos guían en todo lo que hacemos y son la base de nuestra organización.',
  },
  {
    icono: TrendingUp,
    titulo: 'Historia',
    etiqueta: 'Desde 1998',
    texto:
      'Desde 1998 hemos crecido constantemente hasta alcanzar nuestro actual nivel de liderazgo sectorial mediante la mejora e innovación continuas.',
  },
];

/** Entrada en cascada: cada elemento espera un poco más que el anterior. */
const entrada = (visible: boolean, i = 0) => ({
  className: cn('transition-all duration-700 ease-out', visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'),
  style: { transitionDelay: `${i * 120}ms` },
});

export default function About() {
  const [listaRef, listaVisible] = useScrollAnimation();
  const [filaRef, filaVisible] = useScrollAnimation();

  return (
    <Section id="nosotros">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Título y detalles. En escritorio se queda fijo mientras se recorren los bloques. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent-700">
              <span aria-hidden="true" className="h-px w-8 bg-accent-500" />
              Sobre nosotros
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Líderes en <span className="text-brand-600">la Zona Norte</span>
            </h2>
            <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-linear-to-r from-brand-600 to-accent-500" />
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Más de 20 años produciendo y distribuyendo productos químicos de calidad certificada
            </p>

            <ul className="mt-8 space-y-3">
              {datos.map((d) => (
                <li key={d} className="flex items-center gap-3 text-[15px] text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Los cuatro bloques, numerados, entran en cascada. */}
        <div ref={listaRef} className="lg:col-span-7">
          <ol className="space-y-2">
            {bloques.map(({ icono: Icono, titulo, parrafos, acento }, i) => {
              const anim = entrada(listaVisible, i);
              return (
                <li
                  key={titulo}
                  className={cn('group relative -mx-5 rounded-panel px-5 py-6 hover:bg-brand-50/60', anim.className)}
                  style={anim.style}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-4 right-5 hidden font-display text-6xl font-bold text-slate-100 transition-colors group-hover:text-brand-100 sm:block"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative flex gap-5">
                    <span
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-ui text-white transition-transform duration-300 group-hover:scale-105',
                        acento
                          ? 'bg-linear-to-br from-accent-400 to-accent-600 shadow-[0_8px_20px_-8px_rgb(81_184_72/0.6)]'
                          : 'bg-linear-to-br from-brand-500 to-brand-700 shadow-brand'
                      )}
                    >
                      <Icono size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-900">{titulo}</h3>
                      <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-slate-600">
                        {parrafos.map((p) => (
                          <p key={p.slice(0, 24)}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Visión, Valores e Historia: tres tarjetas iguales con filete de marca, chip en degradado y marca de agua. */}
      <div ref={filaRef} className="mt-16 grid gap-5 md:grid-cols-3">
        {identidad.map(({ icono: Icono, titulo, texto, acento, etiqueta }, i) => {
          const anim = entrada(filaVisible, i);
          return (
            <article
              key={titulo}
              className={cn(
                'group relative overflow-hidden rounded-panel bg-white p-7 shadow-card ring-1 ring-slate-200/80 hover:-translate-y-1 hover:shadow-card-hover',
                acento ? 'bg-linear-to-b from-white to-accent-50/50' : 'bg-linear-to-b from-white to-brand-50/50',
                anim.className
              )}
              style={anim.style}
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-600 to-accent-500" />
              <Icono
                aria-hidden="true"
                size={150}
                strokeWidth={1}
                className={cn(
                  'pointer-events-none absolute -right-8 -bottom-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6',
                  acento ? 'text-accent-100/70' : 'text-brand-100/70'
                )}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-ui text-white',
                    acento
                      ? 'bg-linear-to-br from-accent-400 to-accent-600 shadow-[0_8px_20px_-8px_rgb(81_184_72/0.6)]'
                      : 'bg-linear-to-br from-brand-500 to-brand-700 shadow-brand'
                  )}
                >
                  <Icono size={22} aria-hidden="true" />
                </span>
                {etiqueta && (
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
                    {etiqueta}
                  </span>
                )}
              </div>
              <h3 className="relative mt-5 font-display text-xl font-semibold text-slate-900">{titulo}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-slate-600">{texto}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
