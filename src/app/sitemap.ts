import type { MetadataRoute } from 'next';
import productosData from '../data/productos.json';
import { sitio } from '../data/sitio';
import { categorias, type Product } from '../types/Product';

const productos = productosData as Product[];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: `${sitio.url}/`, lastModified: ahora, changeFrequency: 'weekly', priority: 1, images: [`${sitio.url}${sitio.logo.src}`] },
    { url: `${sitio.url}/catalogo`, lastModified: ahora, changeFrequency: 'weekly', priority: 0.9 },
    ...categorias.map((c) => ({
      url: `${sitio.url}/catalogo?categoria=${c.id}`,
      lastModified: ahora,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...productos.map((p) => ({
      url: `${sitio.url}/productos/${p.id}`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      // Los productos sin foto usan una imagen local; esa no va al sitemap.
      images: [p.imageUrl, ...(p.galeria ?? [])].filter((f) => f.startsWith('https://')),
    })),
  ];
}
