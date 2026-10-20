import { Check, ExternalLink, MessageCircle, Package, Phone, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { empresa, whatsappUrl } from '../data/empresa';
import { categorias, type Product } from '../types/Product';
import ProductGallery from './ProductGallery';
import { Button } from './ui';

interface ProductDetailProps {
  product: Product;
  showFullPageButton?: boolean;
  onViewFullPage?: () => void;
}

const nombreCategoria = (id: Product['categorias'][number]) => categorias.find((c) => c.id === id)?.nombre ?? id;

export default function ProductDetail({ product, showFullPageButton = false, onViewFullPage }: ProductDetailProps) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <ProductGallery
            key={product.id}
            nombre={product.nombre}
            alt={`${product.nombre} - ${product.descripcionCorta}`}
            imagenes={[product.imageUrl, ...(product.galeria ?? [])]}
          />
        </div>

        <div className="flex flex-col lg:col-span-6">
          <div className="flex items-start justify-between gap-4">
            <p className="flex flex-wrap gap-x-2 text-sm font-semibold uppercase tracking-wider text-accent-700">
              {product.categorias.map((cat, i) => (
                <span key={cat}>
                  {i > 0 && <span aria-hidden="true" className="mr-2 text-slate-300">·</span>}
                  <Link href={`/catalogo/${cat}`} className="transition-colors hover:text-accent-800">
                    {nombreCategoria(cat)}
                  </Link>
                </span>
              ))}
            </p>
            {showFullPageButton && (
              <button
                type="button"
                onClick={onViewFullPage}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
              >
                <ExternalLink size={16} aria-hidden="true" />
                <span className="hidden sm:inline">Ver detalles completos</span>
              </button>
            )}
          </div>

          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{product.nombre}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{product.descripcionCorta}</p>

          {product.presentaciones && product.presentaciones.length > 0 && (
            <div className="mt-7">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Presentaciones Disponibles</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.presentaciones.map((presentacion) => (
                  <li
                    key={presentacion}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-800 ring-1 ring-slate-200"
                  >
                    <Package size={14} aria-hidden="true" className="text-brand-600" />
                    {presentacion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.usos && product.usos.length > 0 && (
            <div className="mt-7">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Usos Recomendados</h2>
              <ul className="mt-3 space-y-2">
                {product.usos.map((uso) => (
                  <li key={uso} className="flex items-start gap-3 text-[15px] text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {uso}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappUrl(`Hola, me interesa el producto: ${product.nombre}`)} variant="whatsapp" size="lg">
              <MessageCircle size={18} aria-hidden="true" />
              Consultar Disponibilidad
            </Button>
            <Button href={empresa.telefonoHref} variant="outline" size="lg">
              <Phone size={18} aria-hidden="true" />
              Llamar
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} aria-hidden="true" className="text-accent-600" />
              Registrado en el Ministerio de Salud
            </li>
            <li className="flex items-center gap-2">
              <Truck size={16} aria-hidden="true" className="text-accent-600" />
              Entrega en la Zona Norte
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 max-w-3xl border-t border-slate-200 pt-8">
        <h2 className="font-display text-xl font-semibold text-slate-900">Descripción</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">{product.descripcionLarga}</p>
      </div>
    </div>
  );
}
