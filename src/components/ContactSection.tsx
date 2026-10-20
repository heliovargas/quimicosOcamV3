import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { empresa, whatsappUrl } from '../data/empresa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { Button, Section } from './ui';

/** Coordenadas de la planta, las mismas del mapa incrustado. */
const UBICACION = { lat: 10.441888, lng: -84.355933 };
const MAPA_URL = `https://www.google.com/maps?q=${UBICACION.lat},${UBICACION.lng}`;
const RUTA_URL = `https://www.google.com/maps/dir/?api=1&destination=${UBICACION.lat},${UBICACION.lng}`;

const HORARIOS = [
  { dias: 'Lunes a Viernes', horas: '7:00 a.m. - 5:00 p.m.', desde: 7, hasta: 17, diasSemana: [1, 2, 3, 4, 5] },
  { dias: 'Sábados', horas: '7:00 a.m. - 12:00 p.m.', desde: 7, hasta: 12, diasSemana: [6] },
];

/** ¿Está abierto ahora mismo, en hora de Costa Rica? */
function abiertoAhora(): boolean {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Costa_Rica',
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(new Date());
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(partes.find((p) => p.type === 'weekday')?.value ?? '');
  const hora = Number(partes.find((p) => p.type === 'hour')?.value ?? -1);
  return HORARIOS.some((h) => h.diasSemana.includes(dia) && hora >= h.desde && hora < h.hasta);
}

const entrada = (visible: boolean, i = 0) => ({
  className: cn('transition-all duration-700 ease-out', visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'),
  style: { transitionDelay: `${i * 110}ms` },
});

export default function ContactSection() {
  const anim = useScrollAnimation();
  const abierto = abiertoAhora();

  return (
    <Section id="contacto">
      <div ref={anim.ref} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Datos de contacto */}
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent-700">
            <span aria-hidden="true" className="h-px w-8 bg-accent-500" />
            Contacto
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-brand-600 sm:text-4xl">Visítenos</h2>
          <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-linear-to-r from-brand-600 to-accent-500" />
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Encuéntrenos en la Zona Norte</p>

          <ul className="mt-8 space-y-6">
            <li className={cn('flex gap-4', entrada(anim.isVisible, 0).className)} style={entrada(anim.isVisible, 0).style}>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-ui bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-brand">
                <MapPin size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900">Ubicación</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                  Provincia de Alajuela, Cerro Cortez, 21004
                  <br />
                  800 metros este del Servicentro Cerro Cortez
                </p>
                <a
                  href={RUTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                >
                  <Navigation size={14} aria-hidden="true" />
                  Cómo llegar
                </a>
              </div>
            </li>

            <li className={cn('flex gap-4', entrada(anim.isVisible, 1).className)} style={entrada(anim.isVisible, 1).style}>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-ui bg-linear-to-br from-accent-400 to-accent-600 text-white shadow-[0_8px_20px_-8px_rgb(81_184_72/0.6)]">
                <Clock size={20} aria-hidden="true" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-slate-900">Horarios de Atención</h3>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
                      abierto ? 'bg-accent-50 text-accent-800 ring-accent-200' : 'bg-slate-100 text-slate-600 ring-slate-200'
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', abierto ? 'bg-accent-500' : 'bg-slate-400')} aria-hidden="true" />
                    {abierto ? 'Abierto ahora' : 'Cerrado ahora'}
                  </span>
                </div>
                <dl className="mt-2 divide-y divide-slate-200">
                  {HORARIOS.map((h) => (
                    <div key={h.dias} className="flex items-center justify-between gap-4 py-2 text-[15px]">
                      <dt className="font-medium text-slate-900">{h.dias}</dt>
                      <dd className="text-slate-600">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>

            <li className={cn('flex gap-4', entrada(anim.isVisible, 2).className)} style={entrada(anim.isVisible, 2).style}>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-ui bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-brand">
                <Phone size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900">Teléfono y correo</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                  <a href={empresa.telefonoHref} className="transition-colors hover:text-brand-700">
                    {empresa.telefono}
                  </a>
                  <br />
                  <a href={`mailto:${empresa.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-700">
                    <Mail size={14} aria-hidden="true" className="text-slate-400" />
                    {empresa.email}
                  </a>
                </p>
              </div>
            </li>
          </ul>

          <div className={cn('mt-8 flex flex-col gap-3 sm:flex-row', entrada(anim.isVisible, 3).className)} style={entrada(anim.isVisible, 3).style}>
            <Button href={whatsappUrl()} variant="whatsapp">
              <MessageCircle size={18} aria-hidden="true" />
              Escribinos por WhatsApp
            </Button>
            <Button href={empresa.telefonoHref} variant="outline">
              <Phone size={18} aria-hidden="true" />
              Llamar
            </Button>
          </div>
        </div>

        {/* Mapa */}
        <div className={cn('lg:col-span-7', entrada(anim.isVisible, 1).className)} style={entrada(anim.isVisible, 1).style}>
          <div className="relative h-[380px] overflow-hidden rounded-panel shadow-card ring-1 ring-slate-200/80 lg:h-full lg:min-h-[460px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7847.4877407460435!2d-84.355933!3d10.441888000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa07b87142222af%3A0x79a613ed245c4ee9!2sOCAM%20Productos%20de%20Limpieza!5e0!3m2!1sen!2scr!4v1762612089967!5m2!1sen!2scr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Químicos OCAM"
              className="absolute inset-0 h-full w-full"
            />
            {/* Tarjeta flotante sobre el mapa. */}
            <div className="absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-ui bg-white/90 py-2.5 pr-4 pl-3 shadow-card-hover ring-1 ring-slate-200/70 backdrop-blur-sm sm:bottom-5 sm:left-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-frog/10 text-frog">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{empresa.nombre} · Cerro Cortez</p>
                <a
                  href={MAPA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 transition-colors hover:text-brand-800"
                >
                  Abrir en Google Maps
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
