import { ExternalLink, Package } from 'lucide-react';
import type { Product } from '../types/Product';
import { categorias } from '../types/Product';

interface ProductDetailProps {
  product: Product;
  showFullPageButton?: boolean;
  onViewFullPage?: () => void;
}

export default function ProductDetail({ product, showFullPageButton = false, onViewFullPage }: ProductDetailProps) {
  const whatsappMessage = `Hola, me interesa el producto: ${product.nombre}`;
  const whatsappUrl = `https://wa.me/50687167008?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.nombre}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {product.nombre}
              </h1>
              <div className="flex flex-wrap gap-2">
                {product.categorias.map(cat => (
                  <span
                    key={cat}
                    className="text-sm font-semibold text-[#2E5C9A] bg-blue-50 px-3 py-1.5 rounded uppercase tracking-wide"
                  >
                    {categorias.find(c => c.id === cat)?.nombre}
                  </span>
                ))}
              </div>
            </div>
            {showFullPageButton && (
              <button
                onClick={onViewFullPage}
                className="flex items-center gap-2 text-[#2E5C9A] hover:text-[#1e3a5f] transition-colors ml-4 flex-shrink-0"
                title="Ver página completa"
              >
                <ExternalLink size={20} />
                <span className="text-sm font-medium hidden sm:inline">Ver detalles completos</span>
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción</h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {product.descripcionLarga}
              </p>
            </div>

            {product.presentaciones && product.presentaciones.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Presentaciones Disponibles</h2>
                <ul className="space-y-2">
                  {product.presentaciones.map((presentacion, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <Package size={18} className="text-[#2E5C9A] flex-shrink-0" />
                      <span>{presentacion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.usos && product.usos.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Usos Recomendados</h2>
                <ul className="space-y-2">
                  {product.usos.map((uso, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-[#2E5C9A] font-bold mt-0.5">•</span>
                      <span>{uso}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20BA59] text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 text-lg shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Consultar Disponibilidad
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
