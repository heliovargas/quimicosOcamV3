import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { empresa, whatsappUrl } from '../data/empresa';
import { cn } from '../utils/cn';
import { Button } from './ui';

const enlaces = [
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Nosotros', to: '/#nosotros' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Cobertura', to: '/#cobertura' },
  { label: 'Contacto', to: '/#contacto' },
];

/** Navbar flotante tipo píldora. Translúcida arriba del todo, blanca con sombra al hacer scroll. */
export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [conScroll, setConScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setConScroll(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Al cambiar de ruta: cierra el menú móvil y resuelve los anchors (/#nosotros) desde cualquier página.
  useEffect(() => {
    setAbierto(false);
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const esActivo = (to: string) => to === location.pathname;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Principal"
        className={cn(
          'mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full pr-2 pl-4 ring-1 backdrop-blur-xl transition-[background-color,box-shadow] duration-300',
          conScroll || abierto ? 'bg-white/90 shadow-card ring-slate-200/80' : 'bg-white/60 ring-white/60'
        )}
      >
        <Link to="/" className="flex shrink-0 items-center" aria-label="Químicos OCAM, inicio">
          <img src="/ocam.png" alt="Químicos OCAM" className="h-9 w-auto" />
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {enlaces.map((e) => (
            <li key={e.to}>
              <Link
                to={e.to}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  esActivo(e.to)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-brand-700'
                )}
              >
                {e.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1.5 md:flex">
          <Button href={empresa.telefonoHref} variant="ghost" size="sm" className="hidden rounded-full lg:inline-flex">
            <Phone size={16} aria-hidden="true" />
            {empresa.telefono}
          </Button>
          <Button href={whatsappUrl()} variant="whatsapp" size="sm" className="rounded-full">
            <MessageCircle size={16} aria-hidden="true" />
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="rounded-full p-2.5 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          {abierto ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {abierto && (
        <div
          id="menu-movil"
          className="mx-auto mt-2 max-w-6xl rounded-panel bg-white p-3 shadow-card-hover ring-1 ring-slate-200 md:hidden"
        >
          <ul className="flex flex-col">
            {enlaces.map((e) => (
              <li key={e.to}>
                <Link
                  to={e.to}
                  className={cn(
                    'block rounded-ui px-3 py-3 text-base font-medium transition-colors hover:bg-slate-100 hover:text-brand-700',
                    esActivo(e.to) ? 'text-brand-700' : 'text-slate-700'
                  )}
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3">
            <Button href={whatsappUrl()} variant="whatsapp" className="w-full">
              <MessageCircle size={18} aria-hidden="true" />
              Escribinos por WhatsApp
            </Button>
            <Button href={empresa.telefonoHref} variant="outline" className="w-full">
              <Phone size={18} aria-hidden="true" />
              {empresa.telefono}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
