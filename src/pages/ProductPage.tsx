import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ChevronLeft, Package } from 'lucide-react';
import productosData from '../data/productos.json';
import type { Product } from '../types/Product';
import ProductDetail from '../components/ProductDetail';
import { categorias } from '../types/Product';
import { updateMetaTags, resetMetaTags, addProductSchema, addBreadcrumbSchema } from '../utils/seo';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productos = productosData as Product[];
  const product = productos.find(p => p.id === id);

  useEffect(() => {
    if (!product) {
      return;
    }

    const title = `${product.nombre} - Químicos OCAM | Zona Norte Costa Rica`;
    const description = product.descripcionCorta;
    const keywords = [
      product.nombre,
      product.nombre.toLowerCase(),
      ...product.categorias.map(cat => categorias.find(c => c.id === cat)?.nombre || ''),
      'Químicos OCAM',
      'Costa Rica',
      'San Carlos',
      'Zona Norte',
      ...(product.usos || [])
    ].filter(Boolean).join(', ');
    const url = `https://quimicosocam.com/productos/${product.id}`;

    updateMetaTags(title, description, keywords, url, product.imageUrl);
    addProductSchema(product);
    addBreadcrumbSchema([
      { name: 'Inicio', url: 'https://quimicosocam.com' },
      { name: 'Catálogo', url: 'https://quimicosocam.com/catalogo' },
      { name: product.nombre, url: url }
    ]);

    window.scrollTo(0, 0);

    return () => {
      resetMetaTags();
      const productScript = document.querySelector('script[data-schema="product"]');
      const breadcrumbScript = document.querySelector('script[data-schema="breadcrumb"]');
      if (productScript) productScript.remove();
      if (breadcrumbScript) breadcrumbScript.remove();
    };
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="text-gray-400" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Producto no encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            El producto que buscas no existe o fue removido del catálogo.
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            className="inline-flex items-center gap-2 bg-[#2E5C9A] hover:bg-[#1e3a5f] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = productos
    .filter(p =>
      p.id !== product.id &&
      p.categorias.some(cat => product.categorias.includes(cat))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#2E5C9A] transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link to="/catalogo" className="hover:text-[#2E5C9A] transition-colors">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.nombre}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/catalogo')}
          className="inline-flex items-center gap-2 text-[#2E5C9A] hover:text-[#1e3a5f] font-medium mb-8 transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al Catálogo
        </button>

        <ProductDetail product={product} />

        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/productos/${relatedProduct.id}`}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all border border-gray-200 group"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={relatedProduct.imageUrl}
                      alt={`${relatedProduct.nombre} - ${relatedProduct.descripcionCorta}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {relatedProduct.categorias.map(cat => (
                        <span
                          key={cat}
                          className="text-xs font-semibold text-[#2E5C9A] bg-blue-50 px-2 py-1 rounded uppercase tracking-wide"
                        >
                          {categorias.find(c => c.id === cat)?.nombre}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#2E5C9A] transition-colors">
                      {relatedProduct.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedProduct.descripcionCorta}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
