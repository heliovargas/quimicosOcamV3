/**
 * Imágenes de productos en Cloudflare R2 (bucket quimicos-ocam), servidas desde
 * media.quimicosocam.com con Image Transformations activado: el tamaño y el
 * formato (AVIF/WebP según el navegador) se resuelven en el edge, así que en el
 * bucket vive una sola versión de cada foto.
 */
export const R2_DOMAIN = 'https://media.quimicosocam.com';

/**
 * Va en cada URL como `?v=`. Cloudflare y los navegadores cachean las fotos 7 días:
 * si se reemplaza una foto en el bucket con el mismo nombre, hay que subir este
 * número para que todos vean la nueva sin purgar nada.
 */
const VERSION = 3;

interface R2ImageOptions {
  width?: number;
  height?: number;
  fit?: 'scale-down' | 'contain' | 'cover' | 'pad';
  /** `auto` negocia AVIF/WebP con el navegador. */
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  quality?: number;
  /** Color de relleno para `pad`, por ejemplo "#ffffff". */
  background?: string;
}

export function r2Image(url: string, options: R2ImageOptions = {}): string {
  if (!url.startsWith(R2_DOMAIN) || url.includes('/cdn-cgi/image/')) return url;

  const { width, height, fit = 'scale-down', format = 'auto', quality = 80, background } = options;
  const params: string[] = [];
  if (width) params.push(`width=${width}`);
  if (height) params.push(`height=${height}`);
  params.push(`fit=${fit}`, `format=${format}`, `quality=${quality}`);
  if (background) params.push(`background=${encodeURIComponent(background)}`);

  return `${R2_DOMAIN}/cdn-cgi/image/${params.join(',')}${url.slice(R2_DOMAIN.length)}?v=${VERSION}`;
}

/** `srcset` con descriptores de ancho: el navegador elige según el espacio disponible y el DPR. */
export function r2Srcset(url: string, widths: number[]): string | undefined {
  if (!url.startsWith(R2_DOMAIN)) return undefined;
  return widths.map(w => `${r2Image(url, { width: w })} ${w}w`).join(', ');
}

/**
 * Imagen 1200x630 para og:image. JPEG sobre fondo blanco a propósito: WhatsApp y
 * Facebook no muestran bien WebP con transparencia.
 */
export function r2OgImage(url: string): string {
  return r2Image(url, { width: 1200, height: 630, fit: 'pad', background: '#ffffff', format: 'jpeg', quality: 82 });
}
