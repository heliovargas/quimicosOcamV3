'use client';

import { useState } from 'react';
import { cn } from '../utils/cn';
import ProductImage from './ProductImage';

interface ProductGalleryProps {
  nombre: string;
  alt: string;
  /** La primera es la foto principal; el resto, otros ángulos o aromas. */
  imagenes: string[];
}

const MAIN_SIZES = '(min-width: 1024px) 600px, 100vw';
const MAIN_WIDTHS = [480, 640, 960, 1280];
const THUMB_WIDTHS = [96, 192];

export default function ProductGallery({ nombre, alt, imagenes }: ProductGalleryProps) {
  const [actual, setActual] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-panel bg-linear-to-b from-brand-50/80 to-white shadow-card ring-1 ring-slate-200/70">
        <ProductImage
          src={imagenes[actual]}
          alt={actual === 0 ? alt : `${nombre} - vista ${actual + 1}`}
          widths={MAIN_WIDTHS}
          sizes={MAIN_SIZES}
          loading="eager"
          className="h-full w-full object-contain p-8 drop-shadow-[0_18px_14px_rgba(15,23,42,0.18)] sm:p-12"
        />
      </div>

      {imagenes.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {imagenes.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setActual(index)}
              aria-label={`Ver foto ${index + 1} de ${nombre}`}
              aria-pressed={index === actual}
              className={cn(
                'h-18 w-18 shrink-0 overflow-hidden rounded-ui bg-white ring-1 transition-[box-shadow,transform] hover:-translate-y-0.5',
                index === actual ? 'ring-2 ring-brand-500 shadow-card' : 'ring-slate-200 hover:ring-brand-300'
              )}
            >
              <ProductImage src={url} alt="" widths={THUMB_WIDTHS} sizes="72px" className="h-full w-full object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
