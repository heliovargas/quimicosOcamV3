import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { MapPin, Building2, Store } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import 'leaflet/dist/leaflet.css';

interface LocationPoint {
  name: string;
  coordinates: [number, number];
  zone: string;
  strength: 'high' | 'medium' | 'new';
  isMain?: boolean;
}

const locationPoints: LocationPoint[] = [
  { name: 'San Carlos', coordinates: [10.3167, -84.4333], zone: 'Alajuela', strength: 'high', isMain: true },
  { name: 'Guatuso', coordinates: [10.6583, -84.8167], zone: 'Alajuela', strength: 'high' },
  { name: 'Grecia', coordinates: [10.0722, -84.3139], zone: 'Alajuela', strength: 'high' },
  { name: 'Los Chiles', coordinates: [11.0361, -84.7094], zone: 'Alajuela', strength: 'high' },
  { name: 'Naranjo', coordinates: [10.0978, -84.3858], zone: 'Alajuela', strength: 'high' },
  { name: 'Palmares', coordinates: [10.0531, -84.4339], zone: 'Alajuela', strength: 'high' },
  { name: 'Río Cuarto', coordinates: [10.3444, -84.2081], zone: 'Alajuela', strength: 'high' },
  { name: 'San Ramón', coordinates: [10.0875, -84.4686], zone: 'Alajuela', strength: 'high' },
  { name: 'Sarchí', coordinates: [10.0917, -84.3472], zone: 'Alajuela', strength: 'high' },
  { name: 'Zarcero', coordinates: [10.1764, -84.3972], zone: 'Alajuela', strength: 'high' },
  { name: 'Upala', coordinates: [10.8947, -85.0161], zone: 'Alajuela', strength: 'high' },


  { name: 'Santo Domingo', coordinates: [9.9742, -84.0889], zone: 'Heredia', strength: 'new', isMain: true },
  { name: 'Santa Bárbara', coordinates: [10.0347, -84.1778], zone: 'Heredia', strength: 'new' },
  { name: 'Sarapiquí', coordinates: [10.4544, -84.0086], zone: 'Heredia', strength: 'new' },

  { name: 'Montes de Oro', coordinates: [10.1167, -84.7833], zone: 'Puntarenas', strength: 'medium', isMain: true },
  { name: 'Puntarenas', coordinates: [9.9764, -84.8342], zone: 'Puntarenas', strength: 'medium' },

  { name: 'Liberia', coordinates: [10.6346, -85.4372], zone: 'Guanacaste', strength: 'high', isMain: true },
  { name: 'Abangares', coordinates: [10.2833, -85.0167], zone: 'Guanacaste', strength: 'high' },
  { name: 'Bagaces', coordinates: [10.5269, -85.2497], zone: 'Guanacaste', strength: 'high' },
  { name: 'Cañas', coordinates: [10.4308, -85.0931], zone: 'Guanacaste', strength: 'high' },
  { name: 'Carrillo', coordinates: [10.0833, -85.4833], zone: 'Guanacaste', strength: 'high' },
  { name: 'La Cruz', coordinates: [11.0686, -85.6294], zone: 'Guanacaste', strength: 'high' },
  { name: 'Nicoya', coordinates: [10.1481, -85.4519], zone: 'Guanacaste', strength: 'high' },
  { name: 'Santa Cruz', coordinates: [10.2644, -85.5853], zone: 'Guanacaste', strength: 'high' },
  { name: 'Tilarán', coordinates: [10.4653, -84.9650], zone: 'Guanacaste', strength: 'high' },

  { name: 'Guápiles', coordinates: [10.2167, -83.7833], zone: 'Limón', strength: 'new', isMain: true },
];

const baseLocation: LocationPoint = {
  name: 'Base Cerro Cortez',
  coordinates: [10.4667, -84.4333],
  zone: 'Base',
  strength: 'high',
  isMain: true
};

const zoneDescriptions: Record<string, { title: string; cities: number }> = {
  'Alajuela': { title: 'Alajuela', cities: 11 },
  'Heredia': { title: 'Heredia', cities: 3 },
  'Puntarenas': { title: 'Puntarenas', cities: 2 },
  'Guanacaste': { title: 'Guanacaste', cities: 9 },
  'Limón': { title: 'Limón', cities: 1 }
};

export default function LeafletCoverageMap() {
  const [activePoint, setActivePoint] = useState<LocationPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const headerAnim = useScrollAnimation();
  const mapAnim = useScrollAnimation();

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'high': return '#2E5C9A';
      case 'medium': return '#51B848';
      case 'new': return '#f97316';
      default: return '#9ca3af';
    }
  };

  const createCustomIcon = (point: LocationPoint, isHovered: boolean, isActive: boolean) => {
    const color = getStrengthColor(point.strength);
    const isBase = point.zone === 'Base';
    const size = point.isMain ? 40 : 28;
    const iconSize = point.isMain ? 18 : 14;
    const scale = (isActive || isHovered) ? 1.5 : 1;

    const iconHtml = `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        transform: scale(${scale});
        transition: all 0.3s ease;
      ">
        ${point.isMain ? `
          <div style="
            position: absolute;
            width: ${size * 1.2}px;
            height: ${size * 1.2}px;
            background-color: ${color};
            border-radius: 50%;
            opacity: 0.3;
            animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "></div>
        ` : ''}
        <div style="
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${isBase ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15), ${(isActive || isHovered) ? `0 0 30px ${color}` : '0 0 0px transparent'};
          border: 3px solid white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        ">
          ${renderToString(
      isBase ? <Building2 size={iconSize} color="white" /> :
        point.isMain ? <Store size={iconSize} color="white" /> :
          <MapPin size={iconSize} color="white" />
    )}
        </div>
      </div>
    `;

    return divIcon({
      html: iconHtml,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const flyToZone = (point: LocationPoint) => {
    if (mapRef.current) {
      mapRef.current.flyTo([point.coordinates[0], point.coordinates[1]], 9, {
        duration: 1.5
      });
    }
    setActivePoint(point);
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <style>
        {`
          @keyframes ping {
            75%, 100% {
              transform: translate(-50%, -50%) scale(1.5);
              opacity: 0;
            }
          }
          .leaflet-container {
            background: #f8f9fa;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 12px;
            padding: 0;
            min-width: 160px;
          }
          .leaflet-popup-content {
            margin: 0;
            width: auto !important;
            min-width: 160px;
          }
          .leaflet-popup-tip-container {
            top: 0 !important;
            transform: rotate(180deg) !important;
            margin-top: -1px !important;
          }
          .leaflet-popup-close-button {
            color: #374151 !important;
            font-size: 18px !important;
            padding: 4px 8px !important;
            width: 24px !important;
            height: 24px !important;
            top: 4px !important;
            right: 4px !important;
            font-weight: bold !important;
            line-height: 1 !important;
          }
          .leaflet-popup-close-button:hover {
            color: #111827 !important;
            background-color: #f3f4f6 !important;
            border-radius: 4px !important;
          }
        `}
      </style>

      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-0 sm:px-6 lg:px-8">
        <div ref={headerAnim.ref} className={`text-center mb-16 transition-all duration-700 ${headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#2E5C9A] tracking-wider uppercase">Nuestra Cobertura</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Cobertura <span className="text-[#2E5C9A]">Regional</span> en Costa Rica
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Atendiendo <span className="font-bold text-[#2E5C9A]">{locationPoints.length} regiones</span> de la zona norte y noroeste, llevamos productos de limpieza de primera calidad desde nuestra base en Cerro Cortez a miles de comercios
          </p>
        </div>

        <div ref={mapAnim.ref} className={`transition-all duration-700 ${mapAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-white p-4 sm:p-8 rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-gray-100 w-full sm:max-w-[90%] mx-auto">

            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-[1000] flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100">
                <div className="w-2 h-2 bg-[#51B848] rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700">En Expansión</span>
              </div>
            </div>

            <div className="relative w-full h-[54vh] sm:h-[58vh] lg:h-[67vh] max-h-[630px] rounded-none sm:rounded-2xl overflow-hidden border-0 sm:border-2 border-gray-100">
              <MapContainer
                ref={mapRef}
                center={[10.2, -84.3]}
                zoom={8.5}
                minZoom={8.5}
                maxZoom={8.5}
                scrollWheelZoom={true}
                zoomControl={true}
                style={{ height: '100%', width: '100%' }}
                maxBounds={[[8.2, -85.95], [11.70, -82.55]]}
                maxBoundsViscosity={1.0}
              >
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                  subdomains={['a', 'b', 'c', 'd']}
                />

                {locationPoints.filter(p => p.isMain).map((point, index) => (
                  <Circle
                    key={`circle-${index}`}
                    center={[point.coordinates[0], point.coordinates[1]]}
                    radius={25000}
                    pathOptions={{
                      color: getStrengthColor(point.strength),
                      fillColor: getStrengthColor(point.strength),
                      fillOpacity: 0.2,
                      weight: 2,
                      opacity: 0.4
                    }}
                  />
                ))}

                {locationPoints.filter(p => p.isMain).map((point, index) => (
                  <Polyline
                    key={`line-${index}`}
                    positions={[
                      [baseLocation.coordinates[0], baseLocation.coordinates[1]],
                      [point.coordinates[0], point.coordinates[1]]
                    ]}
                    pathOptions={{
                      color: getStrengthColor(point.strength),
                      weight: 3,
                      opacity: 0.8
                    }}
                  />
                ))}

                <Marker
                  position={[baseLocation.coordinates[0], baseLocation.coordinates[1]]}
                  icon={createCustomIcon(baseLocation, false, activePoint?.name === baseLocation.name)}
                  eventHandlers={{
                    click: () => setActivePoint(baseLocation)
                  }}
                >
                  <Popup offset={[0, -20]} autoPan={true} autoPanPadding={[50, 50]}>
                    <div className="p-3">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{baseLocation.name}</h4>
                      <p className="text-xs text-red-600 font-semibold">Base Principal</p>
                    </div>
                  </Popup>
                </Marker>

                {locationPoints.map((point, index) => (
                  <Marker
                    key={index}
                    position={[point.coordinates[0], point.coordinates[1]]}
                    icon={createCustomIcon(
                      point,
                      hoveredPoint === point.name,
                      activePoint?.name === point.name
                    )}
                    eventHandlers={{
                      click: () => setActivePoint(point),
                      mouseover: () => setHoveredPoint(point.name),
                      mouseout: () => setHoveredPoint(null)
                    }}
                  >
                    <Popup offset={[0, -20]} autoPan={true} autoPanPadding={[50, 50]}>
                      <div className="p-3">
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{point.name}</h4>
                        <p className="text-xs font-semibold" style={{ color: getStrengthColor(point.strength) }}>
                          Cobertura {point.strength === 'high' ? 'Alta' : point.strength === 'medium' ? 'Media' : 'Nueva'}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="mt-6 sm:mt-8 px-2 sm:px-0">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm mb-6">
                <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 px-4 py-2 rounded-full border border-red-200">
                  <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg"></div>
                  <span className="text-red-900 font-bold">Base Principal</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border border-blue-200">
                  <div className="w-3 h-3 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-full shadow-lg"></div>
                  <span className="text-blue-900 font-bold">Cobertura Alta</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-full border border-green-200">
                  <div className="w-3 h-3 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-full shadow-lg"></div>
                  <span className="text-green-900 font-bold">Cobertura Media</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-2 rounded-full border border-orange-200">
                  <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
                  <span className="text-orange-900 font-bold">Rutas Nuevas</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {Object.entries(zoneDescriptions).map(([zone, info]) => {
                  const points = locationPoints.filter(p => p.zone === zone);
                  const strength = points[0]?.strength || 'medium';
                  const color = getStrengthColor(strength);
                  const mainPoint = points.find(p => p.isMain);

                  return (
                    <button
                      key={zone}
                      onClick={() => mainPoint && flyToZone(mainPoint)}
                      className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-xl hover:scale-105 group cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg"
                          style={{ backgroundColor: color }}
                        >
                          <Store className="text-white" size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm truncate text-left">{info.title}</h4>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 font-semibold">{info.cities} cantones</span>
                        <MapPin size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
