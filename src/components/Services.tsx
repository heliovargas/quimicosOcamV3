'use client';

import { Factory, MessageCircle, Phone, Quote, ShieldCheck, Store, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { whatsappUrl } from '../data/empresa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { Button, Section } from './ui';

type Servicio = {
  icono: LucideIcon;
  titulo: string;
  texto: string;
  /** Las dos primeras van grandes, con tinte azul. */
  destacado?: boolean;
};

const servicios: Servicio[] = [
  {
    icono: Factory,
    titulo: 'Producción',
    destacado: true,
    texto:
      'Nuestra amplia experiencia nos ha permitido desarrollar nuestras propias fórmulas de productos de calidad. Trabajamos con materias primas importadas, seleccionadas para ofrecer productos de calidad a bajo costo.',
  },
  {
    icono: Truck,
    titulo: 'Distribución',
    destacado: true,
    texto:
      'Nuestra red nacional de distribución cuenta con personal formado, comprometido y experto. Los años de permanencia en el mercado nos han permitido generar una alta capacidad de producción para suplir las necesidades de su empresa, comercio u hogar.',
  },
  {
    icono: Store,
    titulo: 'Ventas al Detalle',
    texto:
      'Contamos con oficinas físicas las cuales puede visitar en cualquier momento para adquirir nuestros productos, y donde comprobará que la calidad de nuestros productos son conformes a estándares y reglamentos nacionales o internacionales.',
  },
  {
    icono: Phone,
    titulo: 'Asistencia Telefónica',
    texto:
      'Le ayudamos con cualquier consulta sobre nuestros productos, procesos o servicios. Póngase en contacto con nosotros. Será un gusto servirle.',
  },
  {
    icono: ShieldCheck,
    titulo: 'Garantías',
    texto:
      'Nuestros productos y servicios cumplen con los estándares y las regulaciones nacionales. Contamos con regentes profesionales, que llevan a cabo las respectivas inspecciones de los procesos productivos y control de calidad.',
  },
];

/** Entrada en cascada: cada tarjeta espera un poco más que la anterior. */
const entrada = (visible: boolean, i = 0) => ({
  className: cn('transition-all duration-700 ease-out', visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'),
  style: { transitionDelay: `${i * 110}ms` },
});

export default function Services() {
  const [tarjetasRef, tarjetasVisible] = useScrollAnimation();
  const [citaRef, citaVisible] = useScrollAnimation();

  return (
    <Section id="servicios">
      {/* Encabezado a la izquierda y botón de cotización a la derecha. */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent-700">
            <span aria-hidden="true" className="h-px w-8 bg-accent-500" />
            Lo que ofrecemos
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Nuestros <span className="text-brand-600">Servicios</span>
          </h2>
          <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-linear-to-r from-brand-600 to-accent-500" />
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Soluciones integrales que cubren toda la cadena de valor
          </p>
        </div>
        <Button href={whatsappUrl('Hola, quiero información sobre sus servicios.')} variant="outline" className="shrink-0">
          <MessageCircle size={18} className="text-whatsapp" aria-hidden="true" />
          Cotizar por WhatsApp
        </Button>
      </div>

      {/* Bento: dos tarjetas grandes arriba y tres abajo, numeradas como una cadena. */}
      <div ref={tarjetasRef} className="mt-12 grid gap-5 md:grid-cols-6">
        {servicios.map(({ icono: Icono, titulo, texto, destacado }, i) => {
          const anim = entrada(tarjetasVisible, i);
          return (
            <article
              key={titulo}
              className={cn(
                'group relative overflow-hidden rounded-panel p-7 shadow-card ring-1 hover:-translate-y-1 hover:shadow-card-hover',
                destacado
                  ? 'bg-linear-to-br from-brand-50 to-white ring-brand-100 md:col-span-3 lg:p-8'
                  : 'bg-white ring-slate-200/80 md:col-span-2',
                anim.className
              )}
              style={anim.style}
            >
              <Icono
                aria-hidden="true"
                size={destacado ? 190 : 150}
                strokeWidth={1}
                className={cn(
                  'pointer-events-none absolute -right-10 -bottom-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6',
                  destacado ? 'text-brand-100/80' : 'text-accent-100/70'
                )}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-ui text-white',
                    destacado
                      ? 'h-12 w-12 bg-linear-to-br from-brand-500 to-brand-700 shadow-brand'
                      : 'h-11 w-11 bg-linear-to-br from-accent-400 to-accent-600 shadow-[0_8px_20px_-8px_rgb(81_184_72/0.6)]'
                  )}
                >
                  <Icono size={destacado ? 24 : 22} aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-bold text-slate-300">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={cn('relative mt-5 font-display font-semibold text-slate-900', destacado ? 'text-2xl' : 'text-xl')}>
                {titulo}
              </h3>
              <p className="relative mt-2 max-w-prose text-[15px] leading-relaxed text-slate-600">{texto}</p>
            </article>
          );
        })}
      </div>

      {/* Frase de cierre en un panel claro. */}
      <figure
        ref={citaRef}
        className={cn(
          'relative mt-10 overflow-hidden rounded-panel bg-linear-to-r from-brand-50 via-white to-accent-50 px-7 py-9 text-center ring-1 ring-slate-200/70 sm:px-12 lg:py-12',
          entrada(citaVisible).className
        )}
      >
        <Quote aria-hidden="true" size={120} strokeWidth={1} className="pointer-events-none absolute -top-6 -left-4 text-brand-100" />
        <blockquote className="relative mx-auto max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
          Gracias a la combinación de la experiencia y conocimientos técnicos inigualables,{' '}
          <span className="font-semibold text-brand-700">OCAM</span> abarca toda la cadena de suministro, desde materias
          primas hasta el consumo final.
        </blockquote>
        <span aria-hidden="true" className="relative mx-auto mt-6 block h-1 w-16 rounded-full bg-linear-to-r from-brand-600 to-accent-500" />
      </figure>
    </Section>
  );
}
