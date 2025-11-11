import { useState, useCallback, useRef } from 'react';
import Map, { Marker, Popup, Source, Layer, NavigationControl } from 'react-map-gl';
import { MapPin, Building2, Store } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationPoint {
  name: string;
  coordinates: [number, number];
  zone: string;
  strength: 'high' | 'medium' | 'new';
  isMain?: boolean;
}

const locationPoints: LocationPoint[] = [
  { name: 'Ciudad Quesada', coordinates: [-84.4333, 10.3167], zone: 'Zona Norte', strength: 'high', isMain: true },
  { name: 'Fortuna', coordinates: [-84.6433, 10.4708], zone: 'Zona Norte', strength: 'high' },
  { name: 'Los Chiles', coordinates: [-84.7094, 11.0361], zone: 'Zona Norte', strength: 'high' },
  { name: 'Upala', coordinates: [-85.0167, 10.8972], zone: 'Zona Norte', strength: 'high' },
  { name: 'Pital', coordinates: [-84.4333, 10.5667], zone: 'Zona Norte', strength: 'high' },
  { name: 'Venecia', coordinates: [-84.3167, 10.3667], zone: 'Zona Norte', strength: 'high' },
  { name: 'Aguas Zarcas', coordinates: [-84.3625, 10.3714], zone: 'Zona Norte', strength: 'high' },
  { name: 'La Tigra', coordinates: [-84.3097, 10.4039], zone: 'Zona Norte', strength: 'high' },
  { name: 'Florencia', coordinates: [-84.4694, 10.3328], zone: 'Zona Norte', strength: 'high' },
  { name: 'Buenavista', coordinates: [-84.2833, 10.3167], zone: 'Zona Norte', strength: 'high' },
  { name: 'Cutris', coordinates: [-84.4472, 10.5397], zone: 'Zona Norte', strength: 'high' },
  { name: 'Monterrey', coordinates: [-84.4069, 10.5714], zone: 'Zona Norte', strength: 'high' },
  { name: 'Pocosol', coordinates: [-84.6250, 10.6306], zone: 'Zona Norte', strength: 'high' },

  { name: 'Liberia', coordinates: [-85.4372, 10.6346], zone: 'Guanacaste', strength: 'high', isMain: true },
  { name: 'Cañas', coordinates: [-85.0931, 10.4308], zone: 'Guanacaste', strength: 'high' },
  { name: 'Tilarán', coordinates: [-84.9650, 10.4653], zone: 'Guanacaste', strength: 'high' },
  { name: 'Santa Cruz', coordinates: [-85.5853, 10.2644], zone: 'Guanacaste', strength: 'high' },
  { name: 'Nicoya', coordinates: [-85.4519, 10.1481], zone: 'Guanacaste', strength: 'high' },
  { name: 'Bagaces', coordinates: [-85.2497, 10.5269], zone: 'Guanacaste', strength: 'high' },
  { name: 'Filadelfia', coordinates: [-85.5467, 10.4542], zone: 'Guanacaste', strength: 'high' },
  { name: 'Hojancha', coordinates: [-85.4258, 10.0581], zone: 'Guanacaste', strength: 'high' },

  { name: 'Grecia', coordinates: [-84.3139, 10.0722], zone: 'Occidente', strength: 'medium', isMain: true },
  { name: 'Sarchí', coordinates: [-84.3472, 10.0917], zone: 'Occidente', strength: 'medium' },
  { name: 'San Ramón', coordinates: [-84.4686, 10.0875], zone: 'Occidente', strength: 'medium' },
  { name: 'Naranjo', coordinates: [-84.3858, 10.0978], zone: 'Occidente', strength: 'medium' },
  { name: 'Palmares', coordinates: [-84.4339, 10.0531], zone: 'Occidente', strength: 'medium' },
  { name: 'San Pedro', coordinates: [-84.4028, 10.0667], zone: 'Occidente', strength: 'medium' },

  { name: 'Guápiles', coordinates: [-83.7833, 10.2167], zone: 'Guápiles', strength: 'new', isMain: true },
  { name: 'Río Frío', coordinates: [-84.0167, 10.3333], zone: 'Guápiles', strength: 'new' },
  { name: 'Cariari', coordinates: [-83.5667, 10.2667], zone: 'Guápiles', strength: 'new' },
  { name: 'Pococí', coordinates: [-83.6167, 10.4333], zone: 'Guápiles', strength: 'new' },

  { name: 'Heredia', coordinates: [-84.1167, 9.9981], zone: 'Heredia', strength: 'new', isMain: true },
  { name: 'Barva', coordinates: [-84.1306, 10.0269], zone: 'Heredia', strength: 'new' },
  { name: 'Santo Domingo', coordinates: [-84.0889, 9.9742], zone: 'Heredia', strength: 'new' },
  { name: 'San Pablo', coordinates: [-84.0914, 9.9936], zone: 'Heredia', strength: 'new' },
  { name: 'San Isidro', coordinates: [-84.0992, 10.0069], zone: 'Heredia', strength: 'new' },
];

const baseLocation: LocationPoint = {
  name: 'Base Cerro Cortez',
  coordinates: [-84.4333, 10.4667],
  zone: 'Base',
  strength: 'high',
  isMain: true
};

const zoneDescriptions: Record<string, { title: string; cities: number }> = {
  'Zona Norte': { title: 'Zona Norte', cities: 13 },
  'Guanacaste': { title: 'Guanacaste', cities: 8 },
  'Occidente': { title: 'Occidente', cities: 6 },
  'Guápiles': { title: 'Guápiles', cities: 4 },
  'Heredia': { title: 'Heredia', cities: 5 }
};

const mainZones = locationPoints.filter(p => p.isMain);

export default function MapboxCoverageMap() {
  const [activePoint, setActivePoint] = useState<LocationPoint | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -84.2,
    latitude: 10.1,
    zoom: 7.5,
    pitch: 0,
    bearing: 0
  });

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

  const resetView = useCallback(() => {
    setViewState({
      longitude: -84.2,
      latitude: 10.1,
      zoom: 7.5,
      pitch: 0,
      bearing: 0
    });
  }, []);

  const flyToZone = useCallback((point: LocationPoint) => {
    setViewState({
      longitude: point.coordinates[0],
      latitude: point.coordinates[1],
      zoom: 9,
      pitch: 0,
      bearing: 0
    });
    setActivePoint(point);
  }, []);


  const influenceCirclesGeoJSON = {
    type: 'FeatureCollection' as const,
    features: locationPoints
      .filter(point => point.isMain)
      .map(point => ({
        type: 'Feature' as const,
        properties: {
          color: getStrengthColor(point.strength),
          name: point.name
        },
        geometry: {
          type: 'Point' as const,
          coordinates: point.coordinates
        }
      }))
  };

  const circleLayerStyle = {
    id: 'influence-circles',
    type: 'circle' as const,
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        7, 35,
        10, 80
      ],
      'circle-color': ['get', 'color'],
      'circle-opacity': 0.2,
      'circle-blur': 0.9,
      'circle-stroke-width': 2,
      'circle-stroke-color': ['get', 'color'],
      'circle-stroke-opacity': 0.4
    }
  };

  const routesGeoJSON = {
    type: 'FeatureCollection' as const,
    features: locationPoints
      .filter(point => point.isMain)
      .map(point => ({
        type: 'Feature' as const,
        properties: {
          color: getStrengthColor(point.strength)
        },
        geometry: {
          type: 'LineString' as const,
          coordinates: [baseLocation.coordinates, point.coordinates]
        }
      }))
  };

  const lineLayerStyle = {
    id: 'routes',
    type: 'line' as const,
    paint: {
      'line-color': ['get', 'color'],
      'line-width': 3,
      'line-gradient': [
        'interpolate',
        ['linear'],
        ['line-progress'],
        0, ['get', 'color'],
        1, ['get', 'color']
      ],
      'line-opacity': 0.8
    },
    layout: {
      'line-cap': 'round' as const,
      'line-join': 'round' as const
    }
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
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
            Presencia en <span className="text-[#2E5C9A]">Todo</span> Costa Rica
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Con <span className="font-bold text-[#2E5C9A]">{locationPoints.length + 1} puntos de distribución</span> activos, llevamos productos de limpieza de primera calidad desde nuestra base en Cerro Cortez, Zona Norte
          </p>
        </div>

        <div ref={mapAnim.ref} className={`transition-all duration-700 ${mapAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-white p-4 sm:p-8 rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-gray-100 w-full sm:max-w-[90%] mx-auto">


            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100">
                <div className="w-2 h-2 bg-[#51B848] rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700">En Expansión</span>
              </div>
            </div>

            <div className="relative w-full h-[54vh] sm:h-[58vh] lg:h-[67vh] max-h-[630px] rounded-none sm:rounded-2xl overflow-hidden border-0 sm:border-2 border-gray-100">
              <Map
                ref={mapRef}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/light-v11"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                maxBounds={[[-86.0, 8.0], [-82.5, 11.3]]}
                minZoom={7}
                maxZoom={11}
                dragRotate={false}
                pitchWithRotate={false}
                scrollZoom={true}
                doubleClickZoom={true}
                touchZoomRotate={true}
                dragPan={true}
              >

                <Source id="influence-circles" type="geojson" data={influenceCirclesGeoJSON}>
                  <Layer {...circleLayerStyle} />
                </Source>

                <Source id="routes" type="geojson" data={routesGeoJSON}>
                  <Layer {...lineLayerStyle} />
                </Source>

                <Marker
                  longitude={baseLocation.coordinates[0]}
                  latitude={baseLocation.coordinates[1]}
                  anchor="center"
                >
                  <div
                    className="relative flex items-center justify-center cursor-pointer group"
                    onClick={() => setActivePoint(baseLocation)}
                  >
                    <div className="absolute w-20 h-20 bg-red-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute w-16 h-16 bg-red-500/40 rounded-full animate-pulse"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 border-4 border-white group-hover:border-red-200">
                      <Building2 className="text-white drop-shadow-lg" size={28} />
                    </div>
                  </div>
                </Marker>

                {locationPoints.map((point, index) => {
                  const color = getStrengthColor(point.strength);
                  const isActive = activePoint?.name === point.name;
                  const isHovered = hoveredPoint === point.name;

                  return (
                    <Marker
                      key={index}
                      longitude={point.coordinates[0]}
                      latitude={point.coordinates[1]}
                      anchor="center"
                    >
                      <div
                        className="relative flex items-center justify-center cursor-pointer group"
                        onClick={() => flyToZone(point)}
                        onMouseEnter={() => setHoveredPoint(point.name)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        {point.isMain && (
                          <>
                            <div
                              className="absolute w-12 h-12 rounded-full animate-ping opacity-30"
                              style={{ backgroundColor: color }}
                            />
                            <div
                              className="absolute w-10 h-10 rounded-full animate-pulse opacity-20"
                              style={{ backgroundColor: color }}
                            />
                          </>
                        )}
                        <div
                          className={`relative rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border-3 border-white ${
                            point.isMain ? 'w-10 h-10' : 'w-7 h-7'
                          } ${isActive || isHovered ? 'scale-150 shadow-2xl z-10' : 'scale-100 group-hover:scale-125'}`}
                          style={{
                            backgroundColor: color,
                            boxShadow: isActive || isHovered ? `0 0 30px ${color}, 0 0 60px ${color}50` : undefined
                          }}
                        >
                          {point.isMain ? (
                            <Store className="text-white drop-shadow" size={18} />
                          ) : (
                            <MapPin className="text-white drop-shadow" size={14} />
                          )}
                        </div>
                      </div>
                    </Marker>
                  );
                })}

                {activePoint && (
                  <Popup
                    longitude={activePoint.coordinates[0]}
                    latitude={activePoint.coordinates[1]}
                    anchor="bottom"
                    onClose={() => setActivePoint(null)}
                    closeButton={true}
                    closeOnClick={false}
                    offset={25}
                    className="custom-popup"
                  >
                    <div className="p-4 min-w-[200px]">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                          style={{ backgroundColor: getStrengthColor(activePoint.strength) }}
                        >
                          {activePoint.zone === 'Base' ? (
                            <Building2 className="text-white" size={24} />
                          ) : (
                            <Store className="text-white" size={24} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-lg">{activePoint.name}</h4>
                          <p className="text-sm text-gray-600">{activePoint.zone}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">Cobertura:</span>
                          <span className="font-bold" style={{ color: getStrengthColor(activePoint.strength) }}>
                            {activePoint.strength === 'high' ? 'Alta' : activePoint.strength === 'medium' ? 'Media' : 'Nueva'}
                          </span>
                        </div>
                        {activePoint.zone !== 'Base' && (
                          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Estado:</span>
                            <span className="font-semibold text-green-600">Activo</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                )}

                <NavigationControl position="bottom-right" showCompass={true} showZoom={true} />
              </Map>
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
                        <span className="text-gray-600 font-semibold">{info.cities} ubicaciones</span>
                        <MapPin size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://wa.me/50661951073"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#2E5C9A] to-[#51B848] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>¿Tu zona no aparece? Contáctanos</span>
          </a>
        </div>
      </div>
    </section>
  );
}
