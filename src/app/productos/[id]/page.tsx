import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../../components/ProductCard';
import ProductDetail from '../../../components/ProductDetail';
import { Container } from '../../../components/ui';
import productosData from '../../../data/productos.json';
import { sitio } from '../../../data/sitio';
import { categorias, type Product } from '../../../types/Product';
import { r2Image, r2OgImage } from '../../../utils/r2';

const productos = productosData as Product[];
const nombreCategoria = (id: Product['categorias'][number]) => categorias.find((c) => c.id === id)?.nombre ?? id;

/** Solo existen las páginas de los productos del JSON; cualquier otro id es 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return productos.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

const absoluta = (url: string) => (url.startsWith('/') ? `${sitio.url}${url}` : url);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = productos.find((x) => x.id === id);
  if (!p) return {};

  const lineas = p.categorias.map(nombreCategoria).join(', ');
  const descripcion = `${p.descripcionCorta} Línea ${lineas}. Producto de Químicos OCAM, registrado en el Ministerio de Salud, con entrega en la Zona Norte de Costa Rica.`;
  // JPEG 1200x630 sobre blanco: WhatsApp y Facebook no muestran bien WebP con transparencia.
  const imagenOg = p.imageUrl.startsWith('/') ? absoluta(p.imageUrl) : r2OgImage(p.imageUrl);

  return {
    title: p.nombre,
    description: descripcion,
    keywords: [p.nombre, ...p.categorias.map(nombreCategoria), ...(p.usos ?? []), 'Químicos OCAM', 'Zona Norte', 'Costa Rica'],
    alternates: { canonical: `/productos/${p.id}` },
    openGraph: {
      type: 'website',
      title: `${p.nombre} | ${sitio.nombre}`,
      description: p.descripcionCorta,
      url: `/productos/${p.id}`,
      images: [{ url: imagenOg, width: 1200, height: 630, alt: p.nombre }],
    },
    twitter: { card: 'summary_large_image', title: `${p.nombre} | ${sitio.nombre}`, description: p.descripcionCorta, images: [imagenOg] },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { id } = await params;
  const product = productos.find((p) => p.id === id);
  if (!product) notFound();

  const linea = product.categorias[0];
  const url = `${sitio.url}/productos/${product.id}`;
  const relacionados = productos
    .filter((p) => p.id !== product.id && p.categorias.some((cat) => product.categorias.includes(cat)))
    .slice(0, 4);

  const schemaProducto = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#producto`,
    name: product.nombre,
    description: product.descripcionLarga,
    disambiguatingDescription: product.descripcionCorta,
    sku: product.id,
    url,
    image: [product.imageUrl, ...(product.galeria ?? [])].map((img) => (img.startsWith('/') ? absoluta(img) : r2Image(img, { width: 1200 }))),
    category: product.categorias.map(nombreCategoria).join(' / '),
    brand: { '@type': 'Brand', name: sitio.nombre },
    manufacturer: { '@id': `${sitio.url}/#negocio` },
    ...(product.presentaciones?.length
      ? {
          additionalProperty: product.presentaciones.map((valor) => ({ '@type': 'PropertyValue', name: 'Presentación', value: valor })),
        }
      : {}),
    ...(product.usos?.length ? { audience: { '@type': 'Audience', audienceType: product.usos.join('; ') } } : {}),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'CRC',
      url,
      seller: { '@id': `${sitio.url}/#negocio` },
      areaServed: 'CR',
    },
  };

  const migas = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: sitio.url },
      { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${sitio.url}/catalogo` },
      { '@type': 'ListItem', position: 3, name: nombreCategoria(linea), item: `${sitio.url}/catalogo/${linea}` },
      { '@type': 'ListItem', position: 4, name: product.nombre, item: url },
    ],
  };

  return (
    <Container className="pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Migas de pan y vuelta al catálogo */}
      <div className="flex items-center justify-between gap-4">
        <nav aria-label="Migas de pan" className="min-w-0 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-brand-700">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li>
              <Link href="/catalogo" className="transition-colors hover:text-brand-700">
                Catálogo
              </Link>
            </li>
            <li aria-hidden="true" className="hidden sm:block">
              <ChevronRight size={14} />
            </li>
            <li className="hidden sm:block">
              <Link href={`/catalogo/${linea}`} className="transition-colors hover:text-brand-700">
                {nombreCategoria(linea)}
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
        <Link href="/catalogo" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800">
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
              href={`/catalogo/${linea}`}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProducto) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(migas) }} />
    </Container>
  );
}
