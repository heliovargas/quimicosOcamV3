'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import productosData from '../data/productos.json';
import { categorias, type Product } from '../types/Product';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { r2Image, r2Srcset } from '../utils/r2';
import { Button, Section } from './ui';

const productos = productosData as Product[];
type Categoria = Product['categorias'][number];

/** Tres productos de muestra por línea, en abanico. Ids de productos.json con foto de fondo transparente. */
const MUESTRA: Record<Categoria, string[]> = {
  domestico: ['detergente-liquido-ropa', 'multiplex-domestico', 'desinfectante-ocam'],
  lecherias: ['yodosell-barrera', 'superclor-12', 'carbocam'],
  automotriz: ['shampoo-car-concentrado', 'brillim-shampoo-car-cera', 'brilim-coolant'],
  piscinas: ['alcalifor', 'superclor-granulado', 'clarit-plus'],
};

const lineas = categorias
  .map((c) => ({
    id: c.id,
    nombre: c.nombre,
    total: productos.filter((p) => p.categorias.includes(c.id)).length,
    muestra: MUESTRA[c.id].map((id) => productos.find((p) => p.id === id)).filter((p): p is Product => p !== undefined),
  }))
  .sort((a, b) => b.total - a.total);

/** Posición de cada foto del abanico: izquierda, centro (al frente) y derecha. */
const ABANICO = [
  'left-[14%] bottom-1 h-24 -rotate-12 sm:h-28 group-hover:-translate-x-2 group-hover:-rotate-[16deg]',
  'left-1/2 bottom-0 z-10 h-28 -translate-x-1/2 sm:h-32 group-hover:-translate-y-1.5',
  'right-[14%] bottom-1 h-24 rotate-12 sm:h-28 group-hover:translate-x-2 group-hover:rotate-[16deg]',
];

const entrada = (visible: boolean, i = 0) => ({
  className: cn('transition-all duration-700 ease-out', visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'),
  style: { transitionDelay: `${i * 110}ms` },
});

export default function ProductPreview() {
  const [animRef, animVisible] = useScrollAnimation();

  return (
    <Section id="productos">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent-700">
            <span aria-hidden="true" className="h-px w-8 bg-accent-500" />
            Productos destacados
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Nuestros <span className="text-brand-600">Productos</span>
          </h2>
          <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-linear-to-r from-brand-600 to-accent-500" />
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Descubre nuestra amplia gama de productos certificados para diferentes sectores
          </p>
        </div>
        <Button to="/catalogo" className="shrink-0">
          Ver catálogo completo
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>

      {/* Una tarjeta por línea de producto, con tres fotos reales en abanico. */}
      <div ref={animRef} className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {lineas.map((linea, i) => {
          const a = entrada(animVisible, i);
          return (
            <Link
              key={linea.id}
              href={`/catalogo/${linea.id}`}
              className={cn(
                'group relative overflow-hidden rounded-panel bg-linear-to-b from-brand-50/70 to-white p-4 shadow-card ring-1 ring-slate-200/80 hover:-translate-y-1 hover:shadow-card-hover sm:p-5',
                a.className
              )}
              style={a.style}
            >
              <div className="relative h-32 sm:h-36">
                {linea.muestra.map((p, k) => (
                  <img
                    key={p.id}
                    src={r2Image(p.imageUrl, { width: 256 })}
                    srcSet={r2Srcset(p.imageUrl, [160, 256, 384])}
                    sizes="128px"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      'absolute w-auto object-contain drop-shadow-[0_10px_8px_rgba(15,23,42,0.22)] transition-transform duration-500',
                      ABANICO[k]
                    )}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-end justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 sm:text-xl">{linea.nombre}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {linea.total} {linea.total === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
