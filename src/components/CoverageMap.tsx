import { useState, type MouseEvent } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import type { GeometryCollection, GeometryObject, Topology } from 'topojson-specification';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import topologia from '../data/costa-rica.json';
import { Badge, Section } from './ui';
import { cn } from '../utils/cn';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Mapa de cobertura dibujado en SVG a partir de los límites cantonales reales
 * (src/data/costa-rica.json, geoBoundaries CC BY 4.0, simplificados con mapshaper).
 * No usa tiles ni servicios externos: los puntos se ubican por coordenadas con d3-geo.
 */

type Nivel = 'alta' | 'media' | 'nueva';
type Lado = 'izquierda' | 'derecha' | 'arriba' | 'abajo';

interface Zona {
  provincia: string;
  nivel: Nivel;
  /** Nombres tal como vienen en costa-rica.json (con tildes). */
  cantones: string[];
  /** Punto de referencia de la zona: [longitud, latitud] y de qué lado va su etiqueta. */
  hub: { nombre: string; coords: [number, number]; etiqueta: Lado };
}

/** Planta y bodega. Coordenadas tomadas del mapa de Google de la sección de contacto. */
const BASE = { nombre: 'Base Cerro Cortez', coords: [-84.3559, 10.4419] as [number, number] };

const ZONAS: Zona[] = [
  {
    provincia: 'Alajuela',
    nivel: 'alta',
    cantones: ['San Carlos', 'Guatuso', 'Los Chiles', 'Upala', 'Río Cuarto', 'Zarcero', 'Grecia', 'Sarchí', 'Naranjo', 'Palmares', 'San Ramón'],
    hub: { nombre: 'San Carlos', coords: [-84.4333, 10.3167], etiqueta: 'abajo' },
  },
  {
    provincia: 'Guanacaste',
    nivel: 'alta',
    cantones: ['Liberia', 'La Cruz', 'Bagaces', 'Cañas', 'Tilarán', 'Abangares', 'Carrillo', 'Santa Cruz', 'Nicoya'],
    hub: { nombre: 'Liberia', coords: [-85.4372, 10.6346], etiqueta: 'arriba' },
  },
  {
    provincia: 'Puntarenas',
    nivel: 'media',
    cantones: ['Montes de Oro', 'Puntarenas'],
    hub: { nombre: 'Montes de Oro', coords: [-84.7833, 10.1167], etiqueta: 'izquierda' },
  },
  {
    provincia: 'Heredia',
    nivel: 'nueva',
    cantones: ['Santo Domingo', 'Santa Bárbara', 'Sarapiquí'],
    hub: { nombre: 'Santo Domingo', coords: [-84.0889, 9.9742], etiqueta: 'abajo' },
  },
  {
    provincia: 'Limón',
    nivel: 'nueva',
    cantones: ['Pococí'],
    hub: { nombre: 'Guápiles', coords: [-83.7833, 10.2167], etiqueta: 'derecha' },
  },
];

const NIVELES: Record<Nivel, { etiqueta: string; fill: string; dot: string; badge: 'brand' | 'accent' }> = {
  alta: { etiqueta: 'Cobertura alta', fill: 'fill-brand-500', dot: 'bg-brand-500', badge: 'brand' },
  media: { etiqueta: 'Cobertura media', fill: 'fill-brand-300', dot: 'bg-brand-300', badge: 'brand' },
  nueva: { etiqueta: 'Ruta nueva', fill: 'fill-accent-400', dot: 'bg-accent-400', badge: 'accent' },
};

const ETIQUETA: Record<Lado, { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }> = {
  derecha: { dx: 18, dy: 7, anchor: 'start' },
  izquierda: { dx: -18, dy: 7, anchor: 'end' },
  arriba: { dx: 0, dy: -20, anchor: 'middle' },
  abajo: { dx: 0, dy: 34, anchor: 'middle' },
};

// --- Geometría (se calcula una sola vez al cargar el módulo) ---------------------------

const ANCHO = 1000;
const ALTO = 920;
const MARGEN = 28;

type PropsCanton = { nombre: string; provincia: string };
type Objetos = {
  cantones: GeometryCollection<PropsCanton>;
  provincias: GeometryCollection<{ provincia: string }>;
  pais: GeometryCollection;
};
const topo = topologia as unknown as Topology<Objetos>;

const cantones: Feature<Geometry, PropsCanton>[] = (
  feature(topo, topo.objects.cantones) as FeatureCollection<Geometry, PropsCanton>
).features;
const pais = feature(topo, topo.objects.pais);
const proyeccion = geoMercator().fitExtent([[MARGEN, MARGEN], [ANCHO - MARGEN, ALTO - MARGEN]], pais);
const trazar = geoPath(proyeccion);
const distintos = (a: GeometryObject, b: GeometryObject) => a !== b;
const TRAZOS = {
  pais: trazar(pais) ?? '',
  provincias: trazar(mesh(topo, topo.objects.provincias, distintos)) ?? '',
  cantones: trazar(mesh(topo, topo.objects.cantones, distintos)) ?? '',
};
const zonaPorCanton = new Map<string, Zona>(ZONAS.flatMap((z) => z.cantones.map((c) => [c, z] as const)));

if (import.meta.env.DEV) {
  const nombres = new Set(cantones.map((c) => c.properties.nombre));
  for (const nombre of zonaPorCanton.keys()) {
    if (!nombres.has(nombre)) console.warn(`CoverageMap: el cantón "${nombre}" no existe en costa-rica.json`);
  }
}

function proyectar(coords: [number, number]): [number, number] {
  return proyeccion(coords) ?? [0, 0];
}

/** Curva suave entre dos puntos, para las rutas desde la base. */
function curva([x1, y1]: [number, number], [x2, y2]: [number, number]): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = (x1 + x2) / 2 - dy * 0.18;
  const cy = (y1 + y2) / 2 + dx * 0.18;
  return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
}

// ----------------------------------------------------------------------------------------

interface Tooltip {
  nombre: string;
  provincia: string;
  nivel?: Nivel;
  x: number;
  y: number;
}

const TOTAL_CANTONES = ZONAS.reduce((n, z) => n + z.cantones.length, 0);

export default function CoverageMap() {
  const [zonaFija, setZonaFija] = useState<string | null>(null);
  const [zonaHover, setZonaHover] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const anim = useScrollAnimation();

  const resaltada = zonaHover ?? zonaFija;
  const atenuar = (zona?: Zona) => resaltada !== null && zona?.provincia !== resaltada;

  const mostrarTooltip = (e: MouseEvent<SVGPathElement>, nombre: string, provincia: string) => {
    const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ nombre, provincia, nivel: zonaPorCanton.get(nombre)?.nivel, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const [baseX, baseY] = proyectar(BASE.coords);

  return (
    <Section id="cobertura">
      <div
        ref={anim.ref}
        className={cn(
          'grid gap-10 transition-all duration-700 lg:grid-cols-12 lg:gap-12',
          anim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        {/* Mapa */}
        <div className="lg:col-span-7">
          <div className="relative rounded-panel bg-linear-to-b from-white to-brand-50/60 p-3 shadow-card ring-1 ring-slate-200/70 sm:p-5">
            <svg
              viewBox={`0 0 ${ANCHO} ${ALTO}`}
              role="img"
              aria-labelledby="mapa-cobertura-titulo"
              className="h-auto w-full"
              onMouseLeave={() => setTooltip(null)}
            >
              <title id="mapa-cobertura-titulo">
                Mapa de Costa Rica con los cantones donde distribuye Químicos OCAM
              </title>

              <g className="drop-shadow-[0_14px_22px_rgba(46,92,154,0.16)]">
                <path d={TRAZOS.pais} className="fill-brand-50" />
              </g>

              {cantones.map((canton) => {
                const { nombre, provincia } = canton.properties;
                const zona = zonaPorCanton.get(nombre);
                return (
                  <path
                    key={nombre}
                    d={trazar(canton) ?? ''}
                    className={cn(
                      'transition-opacity duration-300',
                      zona ? NIVELES[zona.nivel].fill : 'fill-brand-50 hover:fill-brand-100',
                      atenuar(zona) && 'opacity-30'
                    )}
                    onMouseEnter={(e) => mostrarTooltip(e, nombre, provincia)}
                    onMouseMove={(e) => mostrarTooltip(e, nombre, provincia)}
                    onClick={(e) => mostrarTooltip(e, nombre, provincia)}
                  />
                );
              })}

              <path d={TRAZOS.cantones} className="pointer-events-none fill-none stroke-white" strokeWidth={1} />
              <path
                d={TRAZOS.provincias}
                className="pointer-events-none fill-none stroke-brand-200"
                strokeWidth={1.5}
                strokeLinejoin="round"
              />
              <path
                d={TRAZOS.pais}
                className="pointer-events-none fill-none stroke-brand-300"
                strokeWidth={1.5}
                strokeLinejoin="round"
              />

              <g className="pointer-events-none">
                {ZONAS.map((zona) => (
                  <path
                    key={zona.provincia}
                    d={curva([baseX, baseY], proyectar(zona.hub.coords))}
                    className={cn('fill-none stroke-brand-600 transition-opacity duration-300 animate-ruta', atenuar(zona) && 'opacity-15')}
                    strokeWidth={2.5}
                    strokeDasharray="7 6"
                    strokeLinecap="round"
                  />
                ))}

                {ZONAS.map((zona) => {
                  const [x, y] = proyectar(zona.hub.coords);
                  const etiqueta = ETIQUETA[zona.hub.etiqueta];
                  return (
                    <g key={zona.provincia} className={cn('transition-opacity duration-300', atenuar(zona) && 'opacity-30')}>
                      <circle cx={x} cy={y} r={13} className="fill-white" />
                      <circle cx={x} cy={y} r={9} className={NIVELES[zona.nivel].fill} />
                      <text
                        x={x + etiqueta.dx}
                        y={y + etiqueta.dy}
                        textAnchor={etiqueta.anchor}
                        className="font-display fill-slate-800 text-[22px] font-bold"
                        style={{ paintOrder: 'stroke', stroke: 'white', strokeWidth: 6, strokeLinejoin: 'round' }}
                      >
                        {zona.hub.nombre}
                      </text>
                    </g>
                  );
                })}

                <g>
                  <circle cx={baseX} cy={baseY} r={16} className="fill-frog/30">
                    <animate attributeName="r" values="14;32;14" dur="2.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={baseX} cy={baseY} r={15} className="fill-white" />
                  <circle cx={baseX} cy={baseY} r={11} className="fill-frog" />
                  <text
                    x={baseX + ETIQUETA.arriba.dx}
                    y={baseY + ETIQUETA.arriba.dy - 4}
                    textAnchor="middle"
                    className="font-display fill-slate-900 text-[23px] font-bold"
                    style={{ paintOrder: 'stroke', stroke: 'white', strokeWidth: 6, strokeLinejoin: 'round' }}
                  >
                    {BASE.nombre}
                  </text>
                </g>
              </g>
            </svg>

            {tooltip && (
              <div
                className="pointer-events-none absolute z-10 rounded-ui bg-slate-900 px-3 py-2 text-sm text-white shadow-card"
                style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, calc(-100% - 14px))' }}
              >
                <p className="font-semibold">{tooltip.nombre}</p>
                <p className="text-xs text-slate-300">
                  {tooltip.provincia}
                  {tooltip.nivel ? ` · ${NIVELES[tooltip.nivel].etiqueta}` : ''}
                </p>
              </div>
            )}

            {/* Leyenda sobre el mapa, abajo a la izquierda. */}
            <ul className="absolute bottom-4 left-4 flex flex-wrap gap-x-4 gap-y-1.5 rounded-ui bg-white/85 px-3 py-2 text-xs text-slate-600 ring-1 ring-slate-200/70 backdrop-blur-sm sm:bottom-6 sm:left-6">
              <li className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-frog" aria-hidden="true" />
                Base principal
              </li>
              {(Object.keys(NIVELES) as Nivel[]).map((nivel) => (
                <li key={nivel} className="flex items-center gap-1.5">
                  <span className={cn('h-2.5 w-2.5 rounded-full', NIVELES[nivel].dot)} aria-hidden="true" />
                  {NIVELES[nivel].etiqueta}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 text-right text-xs text-slate-400">Límites cantonales: geoBoundaries (CC BY 4.0).</p>
        </div>

        {/* Encabezado, cifras y lista de zonas */}
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent-700">
            <span aria-hidden="true" className="h-px w-8 bg-accent-500" />
            Nuestra cobertura
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Cobertura <span className="text-brand-600">regional</span> en Costa Rica
          </h2>
          <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-linear-to-r from-brand-600 to-accent-500" />
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Desde nuestra base en Cerro Cortez de San Carlos distribuimos a{' '}
            <strong className="font-semibold text-slate-900">{TOTAL_CANTONES} cantones</strong> de la Zona Norte,
            Occidente, Guanacaste, Heredia y el Caribe.
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            {[
              { valor: String(TOTAL_CANTONES), label: 'Cantones' },
              { valor: String(ZONAS.length), label: 'Provincias' },
              { valor: '1', label: 'Base en San Carlos' },
            ].map((c) => (
              <div key={c.label} className="flex flex-col-reverse gap-0.5 rounded-ui bg-brand-50/70 px-3 py-3 ring-1 ring-brand-100">
                <dt className="text-xs text-slate-500">{c.label}</dt>
                <dd className="font-display text-2xl font-bold text-brand-700">{c.valor}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-panel bg-white shadow-card ring-1 ring-slate-200/80">
            {ZONAS.map((zona) => {
              const abierta = zonaFija === zona.provincia;
              return (
                <li key={zona.provincia} onMouseEnter={() => setZonaHover(zona.provincia)} onMouseLeave={() => setZonaHover(null)}>
                  <button
                    type="button"
                    aria-expanded={abierta}
                    onClick={() => setZonaFija(abierta ? null : zona.provincia)}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-brand-50/60',
                      abierta && 'bg-brand-50/60'
                    )}
                  >
                    <span className={cn('h-3 w-3 shrink-0 rounded-full', NIVELES[zona.nivel].dot)} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-semibold text-slate-900">{zona.provincia}</span>
                      <span className="block text-xs text-slate-500">
                        {zona.cantones.length} {zona.cantones.length === 1 ? 'cantón' : 'cantones'} · desde {zona.hub.nombre}
                      </span>
                    </span>
                    <Badge tone={NIVELES[zona.nivel].badge} dot={zona.nivel === 'nueva'} className="hidden sm:inline-flex">
                      {NIVELES[zona.nivel].etiqueta}
                    </Badge>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={cn('shrink-0 text-slate-400 transition-transform duration-300', abierta && 'rotate-180')}
                    />
                  </button>
                  {abierta && (
                    <div className="flex flex-wrap gap-1.5 px-4 pt-1 pb-4">
                      {zona.cantones.map((canton) => (
                        <span
                          key={canton}
                          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                        >
                          <MapPin size={11} aria-hidden="true" className="text-slate-400" />
                          {canton}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
