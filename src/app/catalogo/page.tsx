import type { Metadata } from 'next';
import Catalog from '../../components/Catalog';
import productosData from '../../data/productos.json';
import { sitio } from '../../data/sitio';
import { categorias, type Product } from '../../types/Product';
import { r2Image } from '../../utils/r2';

const productos = productosData as Product[];

const descripcion = `${productos.length} productos de limpieza y desinfección certificados por el Ministerio de Salud: líneas doméstica, lecherías, automotriz y piscinas. Fabricados y distribuidos en la Zona Norte de Costa Rica.`;

export const metadata: Metadata = {
  title: 'Catálogo de Productos de Limpieza y Desinfección',
  description: descripcion,
  alternates: { canonical: '/catalogo' },
  openGraph: {
    title: `Catálogo de Productos | ${sitio.nombre}`,
    description: descripcion,
    url: '/catalogo',
  },
};

const coleccion = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${sitio.url}/catalogo#pagina`,
  name: 'Catálogo de Productos',
  description: descripcion,
  url: `${sitio.url}/catalogo`,
  isPartOf: { '@id': `${sitio.url}/#sitio` },
  about: categorias.map((c) => ({ '@type': 'Thing', name: `Productos de limpieza para ${c.nombre.toLowerCase()}` })),
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: productos.length,
    itemListElement: productos.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${sitio.url}/productos/${p.id}`,
      name: p.nombre,
      image: p.imageUrl.startsWith('/') ? `${sitio.url}${p.imageUrl}` : r2Image(p.imageUrl, { width: 640 }),
    })),
  },
};

export default function CatalogoPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <Catalog />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(coleccion) }} />
    </div>
  );
}
