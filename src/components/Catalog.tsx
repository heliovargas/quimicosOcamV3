import { useState, useMemo } from 'react';
import { Package, Search } from 'lucide-react';
import { categorias } from '../types/Product';
import type { Product } from '../types/Product';
import productosData from '../data/productos.json';
import ProductModal from './ProductModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const catalogAnim = useScrollAnimation();

  const productos = productosData as Product[];

  const filteredProducts = useMemo(() => {
    return productos.filter(product => {
      const matchesCategory = selectedCategory === 'todos' || product.categorias.includes(selectedCategory as any);
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.descripcionCorta.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [productos, selectedCategory, searchTerm]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Catálogo de Productos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones especializadas para cada sector, certificadas por el Ministerio de Salud
          </p>
        </div>

        <div className="mb-12">
          <div className="relative mb-8 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:border-[#2E5C9A] focus:outline-none focus:ring-2 focus:ring-[#2E5C9A]/20 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-5 py-2.5 rounded-md font-medium transition-all ${
                selectedCategory === 'todos'
                  ? 'bg-[#2E5C9A] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Todos
            </button>
            {categorias.map(categoria => (
              <button
                key={categoria.id}
                onClick={() => setSelectedCategory(categoria.id)}
                className={`px-5 py-2.5 rounded-md font-medium transition-all ${
                  selectedCategory === categoria.id
                    ? 'bg-[#2E5C9A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>

        {productos.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-xl p-12 max-w-2xl mx-auto shadow-sm border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="text-gray-400" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Catálogo en Construcción
              </h3>
              <p className="text-gray-600 text-lg">
                Próximamente encontrarás aquí todos nuestros productos organizados por categorías.
              </p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 text-lg">
              Intenta con otra búsqueda o categoría
            </p>
          </div>
        ) : (
          <div ref={catalogAnim.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 ${catalogAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all border border-gray-200 group cursor-pointer"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.nombre}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.categorias.map(cat => (
                      <span key={cat} className="text-[8px] font-semibold text-[#2E5C9A] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wide">
                        {categorias.find(c => c.id === cat)?.nombre}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2E5C9A] transition-colors">
                    {product.nombre}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.descripcionCorta}
                  </p>
                </div>
              </div>
            ))}
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
