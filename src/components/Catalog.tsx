'use client';

import { useMemo, useState } from 'react';
import { PackageSearch, Search, X } from 'lucide-react';
import Link from 'next/link';
import { lineas } from '../data/lineas';
import productosData from '../data/productos.json';
import { categorias, type Product } from '../types/Product';
import { cn } from '../utils/cn';
import ProductCard from './ProductCard';
import { Container } from './ui';

const productos = productosData as Product[];
type Categoria = Product['categorias'][number];

const conteo = Object.fromEntries(
  categorias.map((c) => [c.id, productos.filter((p) => p.categorias.includes(c.id)).length])
) as Record<Categoria, number>;

const nombreCategoria = (id: Categoria) => categorias.find((c) => c.id === id)?.nombre ?? id;

/**
 * Catálogo con filtro por línea y buscador. La línea viene de la URL (/catalogo/<linea>), así cada una
 * es una página real para Google; al cambiar de línea Next no recarga y el texto del buscador se conserva.
 */
export default function Catalog({ categoria }: { categoria?: Categoria }) {
  const [busqueda, setBusqueda] = useState('');
  const linea = categoria ? lineas[categoria] : null;

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const porCategoria = !categoria || p.categorias.includes(categoria);
      const porTexto = q === '' || p.nombre.toLowerCase().includes(q) || p.descripcionCorta.toLowerCase().includes(q);
      return porCategoria && porTexto;
    });
  }, [categoria, busqueda]);

  const total = categoria ? conteo[categoria] : productos.length;

  return (
    <>
      {/* Cabecera */}
      <div className="bg-linear-to-b from-brand-50/70 to-white">
        <Container className="pt-6 pb-8 sm:pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent-700">
                <span aria-hidden="true" className="h-px w-8 bg-accent-500" />
                Catálogo
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {linea ? (
                  <>
                    {linea.titulo} <span className="text-brand-600">{linea.resaltado}</span>
                  </>
                ) : (
                  <>
                    Catálogo de <span className="text-brand-600">Productos</span>
                  </>
                )}
              </h1>
              <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-linear-to-r from-brand-600 to-accent-500" />
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                {linea ? linea.intro : 'Soluciones especializadas para cada sector, certificadas por el Ministerio de Salud'}
              </p>
            </div>
            <dl className="flex gap-3">
              {[
                { valor: String(total), label: categoria ? `Productos en ${nombreCategoria(categoria)}` : 'Productos' },
                { valor: String(categorias.length), label: 'Líneas' },
              ].map((c) => (
                <div key={c.label} className="flex min-w-24 flex-col-reverse gap-0.5 rounded-ui bg-white/80 px-4 py-3 ring-1 ring-brand-100">
                  <dt className="text-xs text-slate-500">{c.label}</dt>
                  <dd className="font-display text-2xl font-bold text-brand-700">{c.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </div>

      {/* Barra de filtros: cada línea es un enlace a su página, sin recarga. */}
      <div className="border-y border-slate-200/70 bg-white">
        <Container className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Líneas de producto" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-wrap lg:px-0 lg:pb-0 [scrollbar-width:none]">
            {(['todos', ...categorias.map((c) => c.id)] as const).map((id) => {
              const activa = id === 'todos' ? !categoria : categoria === id;
              const n = id === 'todos' ? productos.length : conteo[id];
              return (
                <Link
                  key={id}
                  href={id === 'todos' ? '/catalogo' : `/catalogo/${id}`}
                  scroll={false}
                  aria-current={activa ? 'page' : undefined}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    activa ? 'bg-brand-600 text-white shadow-brand' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  )}
                >
                  {id === 'todos' ? 'Todos' : nombreCategoria(id)}
                  <span className={cn('rounded-full px-1.5 text-xs', activa ? 'bg-white/20' : 'bg-white text-slate-500')}>{n}</span>
                </Link>
              );
            })}
          </nav>

          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Buscar productos</span>
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos..."
              className="h-11 w-full rounded-full border border-slate-200 bg-white pr-10 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-hidden"
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda('')}
                aria-label="Limpiar búsqueda"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </label>
        </Container>
      </div>

      {/* Resultados */}
      <Container className="py-8 sm:py-10">
        <p className="text-sm text-slate-500" aria-live="polite">
          {filtrados.length === total ? `${total} productos` : `${filtrados.length} de ${total} productos`}
          {categoria && <> en {nombreCategoria(categoria)}</>}
        </p>

        {filtrados.length === 0 ? (
          <div className="mx-auto mt-10 max-w-md rounded-panel bg-white p-10 text-center shadow-card ring-1 ring-slate-200/80">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <PackageSearch size={26} aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold text-slate-900">No se encontraron productos</h2>
            <p className="mt-2 text-[15px] text-slate-600">Intenta con otra búsqueda o categoría</p>
            <Link
              href="/catalogo"
              scroll={false}
              onClick={() => setBusqueda('')}
              className="mt-5 inline-block text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <ul className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {filtrados.map((p, i) => (
              <li key={p.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}>
                <ProductCard producto={p} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
