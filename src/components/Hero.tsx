import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import productosData from '../data/productos.json';
import { whatsappUrl } from '../data/empresa';
import { categorias } from '../types/Product';
import Burbujas from './Burbujas';
import Estanteria from './Estanteria';
import { Button, Container } from './ui';

const totalProductos = (productosData as unknown[]).length;

const cifras = [
  { valor: '+1,000', label: 'Clientes satisfechos' },
  { valor: '+20', label: 'Años de experiencia' },
  { valor: `+${Math.floor(totalProductos / 10) * 10}`, label: 'Productos disponibles' },
  { valor: String(categorias.length), label: 'Líneas de producto' },
];

/** Una ola, con el periodo de 720 unidades repetido cuatro veces para que el desplazamiento del 50% cierre sin salto. */
const OLA =
  'M0,48 C180,96 540,0 720,48 C900,96 1260,0 1440,48 C1620,96 1980,0 2160,48 C2340,96 2700,0 2880,48 L2880,120 L0,120 Z';

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-linear-to-b from-white via-brand-50/70 to-brand-100">
      <Burbujas />

      {/* El contenedor deja pasar los clics a las burbujas; solo los bloques con contenido los capturan. */}
      <Container className="pointer-events-none relative pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full bg-accent-50 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-accent-800 ring-1 ring-accent-200 animate-fade-in-up">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-white">
                <ShieldCheck size={14} aria-hidden="true" />
              </span>
              Certificados por el Ministerio de Salud
            </div>

            <h1 className="pointer-events-auto mt-5 max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] animate-fade-in-up animation-delay-100">
              Soluciones profesionales para{' '}
              <span className="relative inline-block whitespace-nowrap text-brand-600">
                la limpieza
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="absolute -top-3 -right-5 h-5 w-5 text-accent-500 animate-destello"
                >
                  <path fill="currentColor" d="M12 0c.6 7.2 4.8 11.4 12 12-7.2.6-11.4 4.8-12 12-.6-7.2-4.8-11.4-12-12C7.2 11.4 11.4 7.2 12 0z" />
                </svg>
              </span>
            </h1>

            <p className="pointer-events-auto mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg animate-fade-in-up animation-delay-200">
              Líderes en productos de limpieza y desinfección en la Zona Norte del país. Calidad certificada y
              respaldo garantizado.
            </p>

            <div className="pointer-events-auto mt-7 flex flex-col gap-3 sm:flex-row animate-fade-in-up animation-delay-300">
              <Button to="/catalogo" size="md">
                Explorar catálogo
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button
                href={whatsappUrl('Hola, quiero cotizar productos de limpieza.')}
                variant="outline"
                size="md"
                className="bg-white/80 backdrop-blur"
              >
                <MessageCircle size={18} className="text-whatsapp" aria-hidden="true" />
                Cotizar por WhatsApp
              </Button>
            </div>
          </div>

          <div className="pointer-events-auto lg:col-span-6 animate-fade-in-up animation-delay-200">
            <Estanteria />
          </div>
        </div>

        <dl className="pointer-events-auto mt-10 grid grid-cols-2 gap-4 border-t border-brand-200/70 pt-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-brand-200/70 animate-fade-in-up animation-delay-500">
          {cifras.map((c) => (
            <div key={c.label} className="flex flex-col-reverse gap-0.5 md:px-6 md:first:pl-0 md:last:pr-0">
              <dt className="text-sm text-slate-500">{c.label}</dt>
              <dd className="font-display text-2xl font-bold text-brand-700">{c.valor}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Ola de agua en el borde inferior: dos capas blancas que se desplazan a distinta velocidad. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-14 sm:h-20">
        <svg
          className="absolute bottom-0 left-0 h-full w-[200%] opacity-60 animate-ola [animation-duration:30s]"
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
        >
          <path d={OLA} fill="white" transform="translate(360 0)" />
        </svg>
        <svg className="absolute bottom-0 left-0 h-full w-[200%] animate-ola" viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path d={OLA} fill="white" />
        </svg>
      </div>
    </section>
  );
}
