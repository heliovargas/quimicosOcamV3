import { r2Image, r2Srcset } from '../utils/r2';

interface ProductImageProps {
  src: string;
  alt: string;
  /** Anchos (px) ofrecidos en el srcset; el navegador elige según `sizes` y el DPR. */
  widths?: number[];
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

/** Ancho que ocupa una tarjeta del catálogo en cada breakpoint (grid de 1 a 4 columnas). */
export const CARD_SIZES = '(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';
const CARD_WIDTHS = [320, 480, 640, 960];

export default function ProductImage({
  src,
  alt,
  widths = CARD_WIDTHS,
  sizes = CARD_SIZES,
  loading = 'lazy',
  className = ''
}: ProductImageProps) {
  return (
    <img
      src={r2Image(src, { width: widths[widths.length - 1] })}
      srcSet={r2Srcset(src, widths)}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
}
