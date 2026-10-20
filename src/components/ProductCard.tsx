import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { categorias, type Product } from '../types/Product';
import ProductImage from './ProductImage';

const nombreCategoria = (id: Product['categorias'][number]) => categorias.find((c) => c.id === id)?.nombre ?? id;

/** "3.785 litros" → "3.785 L". Solo para los chips de la tarjeta. */
const abreviar = (presentacion: string) => presentacion.replace(/\s*litros?$/i, ' L');

/** Tarjeta de producto del catálogo y de los relacionados. Enlaza a la página del producto. */
export default function ProductCard({ producto: p }: { producto: Product }) {
  return (
    <Link
      href={`/productos/${p.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-panel bg-white shadow-card ring-1 ring-slate-200/80 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-square bg-linear-to-b from-brand-50/70 to-white">
        <ProductImage
          src={p.imageUrl}
          alt={p.nombre}
          className="h-full w-full object-contain p-6 drop-shadow-[0_10px_8px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:scale-[1.04] sm:p-8"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-700">
          {p.categorias.map(nombreCategoria).join(' · ')}
        </p>
        <h3 className="mt-1 font-display text-base font-semibold text-slate-900 transition-colors group-hover:text-brand-700 sm:text-lg">
          {p.nombre}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">{p.descripcionCorta}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          {p.presentaciones && p.presentaciones.length > 0 ? (
            <ul className="flex flex-wrap gap-1">
              {p.presentaciones.slice(0, 2).map((pr) => (
                <li key={pr} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                  {abreviar(pr)}
                </li>
              ))}
              {p.presentaciones.length > 2 && (
                <li className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                  +{p.presentaciones.length - 2}
                </li>
              )}
            </ul>
          ) : (
            <span />
          )}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
