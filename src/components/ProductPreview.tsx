import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categorias } from '../types/Product';
import type { Product } from '../types/Product';
import productosData from '../data/productos.json';
import ProductModal from './ProductModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ProductPreview() {
  const productos = productosData as Product[];

  const featuredProductIds = [
    'superclor-granulado-70',
    'carbocam',
    'brillim-shampoo-car-cera',
    'abrillantador-pisos-mosaico'
  ];

  const featuredProducts = featuredProductIds
    .map(id => productos.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsAnim = useScrollAnimation();

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#2E5C9A] tracking-wider uppercase">Productos Destacados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Nuestros <span className="text-[#2E5C9A]">Productos</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra amplia gama de productos certificados para diferentes sectores
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <>
            <div ref={productsAnim.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-700 ${productsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all border border-gray-200 group cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={`${product.nombre} - ${product.descripcionCorta}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.categorias.slice(0, 2).map(cat => (
                        <span key={cat} className="text-[8px] font-semibold text-[#2E5C9A] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wide">
                          {categorias.find(c => c.id === cat)?.nombre}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2E5C9A] transition-colors">
                      {product.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {product.descripcionCorta}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/catalogo"
                className="group relative inline-flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2E5C9A] to-[#51B848] rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-2 bg-gradient-to-r from-[#2E5C9A] to-[#51B848] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg group-hover:shadow-2xl transition-all">
                  Ver catálogo completo
                  <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600 text-lg">
              Próximamente encontrarás aquí nuestros productos destacados
            </p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
