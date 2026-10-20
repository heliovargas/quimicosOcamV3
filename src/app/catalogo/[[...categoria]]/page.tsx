import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Catalog from '../../../components/Catalog';
import { lineas } from '../../../data/lineas';
import productosData from '../../../data/productos.json';
import { sitio } from '../../../data/sitio';
import { categorias, type Product } from '../../../types/Product';
import { r2Image } from '../../../utils/r2';

const productos = productosData as Product[];
type Categoria = Product['categorias'][number];

const esCategoria = (valor: string | undefined): valor is Categoria => categorias.some((c) => c.id === valor);
const nombreCategoria = (id: Categoria) => categorias.find((c) => c.id === id)?.nombre ?? id;

/** /catalogo y una página por línea. Cualquier otra ruta es 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ categoria: [] }, ...categorias.map((c) => ({ categoria: [c.id] }))];
}

type Props = { params: Promise<{ categoria?: string[] }> };

function resolver(segmentos: string[] | undefined): Categoria | null | undefined {
  if (!segmentos || segmentos.length === 0) return undefined; // /catalogo
  if (segmentos.length === 1 && esCategoria(segmentos[0])) return segmentos[0];
  return null; // no existe
}

function descripcionDe(categoria?: Categoria): string {
  if (!categoria) {
    return `${productos.length} productos de limpieza y desinfección certificados por el Ministerio de Salud: líneas doméstica, lecherías, automotriz y piscinas. Fabricados y distribuidos en la Zona Norte de Costa Rica.`;
  }
  const lista = productos.filter((p) => p.categorias.includes(categoria));
  const ejemplos = lista.slice(0, 3).map((p) => p.nombre).join(', ');
  return `${lista.length} productos de la línea ${nombreCategoria(categoria)} de Químicos OCAM, como ${ejemplos}. ${lineas[categoria].intro} Registrados en el Ministerio de Salud, con entrega en la Zona Norte de Costa Rica.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria: segmentos } = await params;
  const categoria = resolver(segmentos);
  if (categoria === null) return {};

  const ruta = categoria ? `/catalogo/${categoria}` : '/catalogo';
  const titulo = categoria ? `${lineas[categoria].titulo} ${lineas[categoria].resaltado}` : 'Catálogo de Productos de Limpieza y Desinfección';
  const descripcion = descripcionDe(categoria);
  const tituloOg = categoria ? `${titulo} | ${sitio.nombre}` : `Catálogo de Productos | ${sitio.nombre}`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: { title: tituloOg, description: descripcion, url: ruta, images: [{ url: '/og.png', width: 1200, height: 630, alt: sitio.nombre }] },
    twitter: { card: 'summary_large_image', title: tituloOg, description: descripcion, images: ['/og.png'] },
  };
}

export default async function CatalogoPage({ params }: Props) {
  const { categoria: segmentos } = await params;
  const categoria = resolver(segmentos);
  if (categoria === null) notFound();

  const lista = categoria ? productos.filter((p) => p.categorias.includes(categoria)) : productos;
  const ruta = `${sitio.url}${categoria ? `/catalogo/${categoria}` : '/catalogo'}`;

  const coleccion = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${ruta}#pagina`,
    name: categoria ? `${lineas[categoria].titulo} ${lineas[categoria].resaltado}` : 'Catálogo de Productos',
    description: descripcionDe(categoria),
    url: ruta,
    isPartOf: { '@id': `${sitio.url}/#sitio` },
    ...(categoria
      ? {}
      : { about: categorias.map((c) => ({ '@type': 'Thing', name: `Productos de limpieza para ${c.nombre.toLowerCase()}` })) }),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: lista.length,
      itemListElement: lista.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${sitio.url}/productos/${p.id}`,
        name: p.nombre,
        image: p.imageUrl.startsWith('/') ? `${sitio.url}${p.imageUrl}` : r2Image(p.imageUrl, { width: 640 }),
      })),
    },
  };

  const migas = categoria
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: sitio.url },
          { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${sitio.url}/catalogo` },
          { '@type': 'ListItem', position: 3, name: nombreCategoria(categoria), item: ruta },
        ],
      }
    : null;

  return (
    <div className="pt-20 sm:pt-24">
      <Catalog categoria={categoria} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(coleccion) }} />
      {migas && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(migas) }} />}
    </div>
  );
}
