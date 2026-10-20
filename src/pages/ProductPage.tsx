import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import productosData from '../data/productos.json';
import { categorias, type Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import { Button, Container } from '../components/ui';
import { r2OgImage } from '../utils/r2';
import { addBreadcrumbSchema, addProductSchema, resetMetaTags, updateMetaTags } from '../utils/seo';

const productos = productosData as Product[];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = productos.find((p) => p.id === id);

  useEffect(() => {
    if (!product) {
      return;
    }

    const title = `${product.nombre} - Químicos OCAM | Zona Norte Costa Rica`;
    const description = product.descripcionCorta;
    const keywords = [
      product.nombre,
      product.nombre.toLowerCase(),
      ...product.categorias.map((cat) => categorias.find((c) => c.id === cat)?.nombre || ''),
      'Químicos OCAM',
      'Costa Rica',
      'San Carlos',
      'Zona Norte',
      ...(product.usos || []),
    ]
      .filter(Boolean)
      .join(', ');
    const url = `https://quimicosocam.com/productos/${product.id}`;

    // Los productos sin foto usan una imagen local; og:image debe ser una URL absoluta.
    const imagenOg = product.imageUrl.startsWith('/')
      ? `https://quimicosocam.com${product.imageUrl}`
      : r2OgImage(product.imageUrl);
    updateMetaTags(title, description, keywords, url, imagenOg);
    addProductSchema(product);
    addBreadcrumbSchema([
      { name: 'Inicio', url: 'https://quimicosocam.com' },
      { name: 'Catálogo', url: 'https://quimicosocam.com/catalogo' },
      { name: product.nombre, url: url },
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
      <Container className="flex min-h-[70vh] items-center justify-center pt-24">
        <div className="max-w-md rounded-panel bg-white p-10 text-center shadow-card ring-1 ring-slate-200/80">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <PackageSearch size={26} aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-slate-900">Producto no encontrado</h1>
          <p className="mt-2 text-[15px] text-slate-600">El producto que buscas no existe o fue removido del catálogo.</p>
          <Button to="/catalogo" className="mt-6">
            <ChevronLeft size={18} aria-hidden="true" />
            Volver al Catálogo
          </Button>
        </div>
      </Container>
    );
  }

  const linea = product.categorias[0];
  const relacionados = productos
    .filter((p) => p.id !== product.id && p.categorias.some((cat) => product.categorias.includes(cat)))
    .slice(0, 4);

  return (
    <Container className="pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Migas de pan y vuelta al catálogo */}
      <div className="flex items-center justify-between gap-4">
        <nav aria-label="Migas de pan" className="min-w-0 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link to="/" className="transition-colors hover:text-brand-700">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li>
              <Link to="/catalogo" className="transition-colors hover:text-brand-700">
                Catálogo
              </Link>
            </li>
            <li aria-hidden="true" className="hidden sm:block">
              <ChevronRight size={14} />
            </li>
            <li className="hidden sm:block">
              <Link to={`/catalogo?categoria=${linea}`} className="transition-colors hover:text-brand-700">
                {categorias.find((c) => c.id === linea)?.nombre}
              </Link>
            </li>
            <li aria-hidden="true" className="hidden md:block">
              <ChevronRight size={14} />
            </li>
            <li className="hidden truncate font-medium text-slate-900 md:block" aria-current="page">
              {product.nombre}
            </li>
          </ol>
        </nav>
        <Link
          to="/catalogo"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Volver al Catálogo
        </Link>
      </div>

      <div className="mt-8">
        <ProductDetail product={product} />
      </div>

      {relacionados.length > 0 && (
        <section className="mt-16 border-t border-slate-200 pt-12" aria-labelledby="relacionados">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent-700">
                <span aria-hidden="true" className="h-px w-8 bg-accent-500" />
                Misma línea
              </p>
              <h2 id="relacionados" className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Productos Relacionados
              </h2>
            </div>
            <Link
              to={`/catalogo?categoria=${linea}`}
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 sm:inline-flex"
            >
              Ver toda la línea
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
            {relacionados.map((p) => (
              <li key={p.id}>
                <ProductCard producto={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
