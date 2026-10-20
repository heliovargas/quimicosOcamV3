import type { SVGProps } from 'react';
import { ExternalLink, Mail, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { empresa, whatsappUrl } from '../data/empresa';
import { categorias } from '../types/Product';
import { Container } from './ui';

/** Iconos de redes (lucide ya no incluye marcas). */
const svgProps: SVGProps<SVGSVGElement> = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const Instagram = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} {...svgProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Facebook = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} {...svgProps}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Linkedin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} {...svgProps}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navegacion = [
  { label: 'Inicio', to: '/' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Nosotros', to: '/#nosotros' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Cobertura', to: '/#cobertura' },
  { label: 'Contacto', to: '/#contacto' },
];

const redes = [
  { nombre: 'Instagram', href: empresa.redes.instagram, icono: Instagram },
  { nombre: 'Facebook', href: empresa.redes.facebook, icono: Facebook },
  { nombre: 'LinkedIn', href: empresa.redes.linkedin, icono: Linkedin },
];

const MAPA_URL = 'https://www.google.com/maps?q=10.441888,-84.355933';

/** Misma ola del hero, invertida: la página termina "entrando al agua". */
const OLA =
  'M0,48 C180,96 540,0 720,48 C900,96 1260,0 1440,48 C1620,96 1980,0 2160,48 C2340,96 2700,0 2880,48 L2880,120 L0,120 Z';

const enlace = 'text-[15px] text-brand-200 transition-colors hover:text-white';

function Titulo({ children }: { children: string }) {
  return (
    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
      {children}
      <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-linear-to-r from-brand-400 to-accent-400" />
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-brand-100">
      {/* Ola blanca arriba y dos luces suaves de marca. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-10 rotate-180 sm:h-14">
        <svg className="absolute bottom-0 left-0 h-full w-[200%] animate-ola [animation-duration:40s]" viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path d={OLA} fill="white" />
        </svg>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 -z-10 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -bottom-32 -z-10 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />

      <Container className="pt-24 pb-8 sm:pt-28">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex" aria-label="Químicos OCAM, inicio">
              <img src="/ocam.png" alt="Químicos OCAM" className="h-14 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-brand-200">
              Líderes en la distribución de productos químicos de limpieza en la Zona Norte del país desde 1998.
            </p>
            <ul className="mt-6 flex items-center gap-2">
              {redes.map(({ nombre, href, icono: Icono }) => (
                <li key={nombre}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${nombre} de Químicos OCAM`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition-colors hover:bg-white/20"
                  >
                    <Icono size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-2">
            <Titulo>Navegación</Titulo>
            <ul className="mt-5 space-y-2.5">
              {navegacion.map((e) => (
                <li key={e.to}>
                  <Link href={e.to} className={enlace}>
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Líneas de producto */}
          <div className="lg:col-span-3">
            <Titulo>Líneas de producto</Titulo>
            <ul className="mt-5 space-y-2.5">
              {categorias.map((c) => (
                <li key={c.id}>
                  <Link href={`/catalogo?categoria=${c.id}`} className={enlace}>
                    {c.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <Titulo>Contacto</Titulo>
            <ul className="mt-5 space-y-4">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ui bg-white/10 text-accent-300">
                    <MessageCircle size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-brand-300">WhatsApp</span>
                    <span className="block font-semibold text-white transition-colors group-hover:text-accent-300">{empresa.telefono}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${empresa.email}`} className="group flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ui bg-white/10 text-accent-300">
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-brand-300">Email</span>
                    <span className="block font-semibold text-white transition-colors group-hover:text-accent-300">{empresa.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={MAPA_URL} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ui bg-white/10 text-accent-300">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-brand-300">Ubicación</span>
                    <span className="block font-semibold leading-snug text-white">
                      Provincia de Alajuela, Cerro Cortez
                      <br />
                      800m este del Servicentro
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-accent-300 opacity-0 transition-opacity group-hover:opacity-100">
                      <ExternalLink size={12} aria-hidden="true" />
                      Ver en Google Maps
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-[11px] text-brand-400 sm:text-right">
          Desarrollado por{' '}
          <a
            href="https://distriib.com"
            target="_blank"
            rel="noopener"
            className="font-medium text-brand-300 transition-colors hover:text-white"
          >
            distriib.com
          </a>
        </p>

        <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Químicos OCAM S.A.</span> Todos los
            derechos reservados.
          </p>
          <p>Productos registrados en el Ministerio de Salud.</p>
        </div>
      </Container>
    </footer>
  );
}
