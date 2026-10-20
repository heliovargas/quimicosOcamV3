import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import productosData from '../data/productos.json';
import type { Product } from '../types/Product';
import { r2Image, r2Srcset } from '../utils/r2';

const productos = productosData as Product[];

/** Tres repisas con cuatro productos cada una. Ids de productos.json; las fotos deben tener fondo transparente. */
const REPISAS = [
  ['multiplex-domestico', 'detergente-liquido-ropa', 'suavizante-ocam-floral', 'desinfectante-ocam'],
  ['crema-lavaplatos', 'glas-limpia-vidrios', 'alcohol-gel', 'manu-jabon-manos'],
  ['superclor-12', 'superclor-granulado', 'brillim-shampoo-car-cera', 'yodosell-barrera'],
];

const repisas = REPISAS.map((ids) =>
  ids.map((id) => productos.find((p) => p.id === id)).filter((p): p is Product => p !== undefined)
);

/** Acabado del estante. 'madera' es roble claro con veta sutil; 'metal' es gris neutro. */
const ACABADO: 'madera' | 'metal' = 'madera';

const acabados = {
  madera: {
    lateral: 'bg-[linear-gradient(to_bottom,#dcc39c,#b08a5e)]',
    caraSuperior: 'bg-[#e9d4b1]',
    frente:
      'bg-[repeating-linear-gradient(90deg,transparent_0_22px,rgba(0,0,0,0.06)_22px_24px),linear-gradient(to_bottom,#cfa97d,#b08a5e)]',
  },
  metal: {
    lateral: 'bg-linear-to-b from-slate-300 to-slate-400',
    caraSuperior: 'bg-slate-200',
    frente: 'bg-slate-300',
  },
}[ACABADO];

/** Una tabla horizontal con cara superior y frente. */
function Tabla({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute ${className}`}>
      <div className={`h-1.5 rounded-t-sm ${acabados.caraSuperior}`} />
      <div className={`h-2 rounded-b-sm shadow-[0_12px_14px_-6px_rgba(15,23,42,0.4)] ${acabados.frente}`} />
    </div>
  );
}

/** Estantería de limpieza: pared de azulejos, techo, dos laterales y tres repisas. Cada producto enlaza a su página. */
export default function Estanteria() {
  return (
    <div className="rounded-panel bg-white/75 p-4 shadow-card ring-1 ring-white/80 backdrop-blur-sm sm:p-5">
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-slate-800">Nuestros productos</p>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          Ver catálogo
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {/* Pared lisa detrás del estante, con luz que cae de arriba. */}
      <div className="relative mt-4 overflow-hidden rounded-ui bg-linear-to-b from-slate-50 to-slate-100 px-4 pt-12 pb-3 shadow-[inset_0_14px_24px_-18px_rgba(15,23,42,0.18)] sm:px-5">
        {/* Laterales y techo del mueble, colgado de la pared. */}
        <div aria-hidden="true" className={`absolute inset-y-3 left-1.5 w-2 rounded-full ${acabados.lateral}`} />
        <div aria-hidden="true" className={`absolute inset-y-3 right-1.5 w-2 rounded-full ${acabados.lateral}`} />
        <Tabla className="inset-x-1.5 top-3" />

        <div className="space-y-5">
          {repisas.map((fila, i) => (
            <div key={i} className="relative pb-5">
              {/* Repisa a la altura del pie de las fotos. */}
              <Tabla className="-inset-x-2 top-16 sm:top-20" />

              <ul className="relative flex h-16 items-end justify-around gap-1 sm:h-20">
                {fila.map((p) => (
                  <li key={p.id} className="group relative flex w-full justify-center">
                    <Link to={`/productos/${p.id}`} className="block" aria-label={p.nombre}>
                      <img
                        src={r2Image(p.imageUrl, { width: 160 })}
                        srcSet={r2Srcset(p.imageUrl, [96, 160, 240])}
                        sizes="80px"
                        alt={p.nombre}
                        loading="eager"
                        decoding="async"
                        className="h-16 w-auto object-contain drop-shadow-[0_8px_6px_rgba(15,23,42,0.22)] transition-transform duration-300 group-hover:-translate-y-1 sm:h-20"
                      />
                    </Link>
                    {/* Nombre al pasar el mouse o enfocar, encima del producto. */}
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[11px] whitespace-nowrap text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                      {p.nombre}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
