import { MapPin, TrendingUp, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';

interface CoverageZone {
  name: string;
  cities: string[];
  strength: 'high' | 'medium' | 'new';
  position: { x: number; y: number };
  description: string;
}

const coverageZones: CoverageZone[] = [
  {
    name: 'Zona Norte',
    cities: ['San Carlos', 'Ciudad Quesada', 'Fortuna', 'Los Chiles', 'Upala'],
    strength: 'high',
    position: { x: 580, y: 180 },
    description: 'Nuestra zona más fuerte con amplia cobertura y distribución establecida'
  },
  {
    name: 'Guanacaste',
    cities: ['Liberia', 'Cañas', 'Tilarán', 'Santa Cruz', 'Nicoya'],
    strength: 'high',
    position: { x: 350, y: 250 },
    description: 'Cobertura completa con distribución regular y clientes establecidos'
  },
  {
    name: 'Occidente',
    cities: ['Grecia', 'Sarchí', 'San Ramón', 'Naranjo', 'Palmares'],
    strength: 'medium',
    position: { x: 500, y: 320 },
    description: 'Zona en crecimiento con cobertura intermedia'
  },
  {
    name: 'Guápiles',
    cities: ['Guápiles', 'Río Frío', 'Cariari', 'Pococí'],
    strength: 'new',
    position: { x: 750, y: 330 },
    description: 'Nueva ruta en expansión - ¡Ahora disponible!'
  },
  {
    name: 'Heredia',
    cities: ['Heredia', 'Barva', 'Santo Domingo', 'San Pablo', 'San Isidro'],
    strength: 'new',
    position: { x: 600, y: 310 },
    description: 'Nueva ruta en expansión - ¡Ahora disponible!'
  }
];

export default function CoverageMap() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const headerAnim = useScrollAnimation();
  const mapAnim = useScrollAnimation();

  const getStrengthStyles = (strength: string) => {
    switch (strength) {
      case 'high':
        return {
          bg: 'from-[#2E5C9A] to-[#1e4070]',
          ring: 'ring-[#2E5C9A]/30',
          pulse: 'bg-[#2E5C9A]',
          size: 'w-6 h-6 md:w-8 md:h-8'
        };
      case 'medium':
        return {
          bg: 'from-[#51B848] to-[#3d8f38]',
          ring: 'ring-[#51B848]/30',
          pulse: 'bg-[#51B848]',
          size: 'w-5 h-5 md:w-6 md:h-6'
        };
      case 'new':
        return {
          bg: 'from-orange-500 to-orange-600',
          ring: 'ring-orange-500/30',
          pulse: 'bg-orange-500',
          size: 'w-5 h-5 md:w-6 md:h-6'
        };
      default:
        return {
          bg: 'from-gray-400 to-gray-500',
          ring: 'ring-gray-400/30',
          pulse: 'bg-gray-400',
          size: 'w-4 h-4 md:w-5 md:h-5'
        };
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerAnim.ref} className={`text-center mb-16 transition-all duration-700 ${headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#2E5C9A] tracking-wider uppercase">Nuestra Cobertura</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Llevamos <span className="text-[#2E5C9A]">Calidad</span> a Todo el País
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Desde nuestra base en Cerro Cortez, Zona Norte, distribuimos productos de limpieza de primera calidad a múltiples regiones de Costa Rica
          </p>
        </div>

        <div ref={mapAnim.ref} className={`transition-all duration-700 ${mapAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-gradient-to-r from-[#2E5C9A]/10 to-[#51B848]/10 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-[#51B848] rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700">En Expansión</span>
              </div>

              <div className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: '1099/707' }}>
                <svg viewBox="0 0 1099 707" className="w-full h-full">
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e0f2fe" />
                      <stop offset="50%" stopColor="#f0fdf4" />
                      <stop offset="100%" stopColor="#dbeafe" />
                    </linearGradient>
                  </defs>

                  <rect
                    x="0"
                    y="0"
                    width="1099"
                    height="707"
                    rx="40"
                    ry="40"
                    fill="url(#mapGradient)"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />

                  <image
                    href="/cr.svg"
                    x="0"
                    y="0"
                    width="1099"
                    height="707"
                    preserveAspectRatio="xMidYMid meet"
                  />

                  <circle cx="580" cy="180" r="10" className="fill-red-500 animate-pulse" />
                  <text
                    x="580"
                    y="165"
                    fontSize="16"
                    className="fill-gray-700 font-bold"
                    textAnchor="middle"
                  >
                    Base Zona Norte
                  </text>

                  {coverageZones.map((zone, i) => {
                    const styles = getStrengthStyles(zone.strength);
                    const isActive = activeZone === zone.name;
                    const x = zone.position.x;
                    const y = zone.position.y;

                    return (
                      <g key={i}>
                        <line
                          x1={580}
                          y1={180}
                          x2={x}
                          y2={y}
                          className={`stroke-gray-400 transition-all ${
                            isActive ? 'stroke-[#2E5C9A] opacity-100' : 'opacity-40'
                          }`}
                          strokeWidth={2}
                          strokeDasharray="4,4"
                        />

                        {zone.strength === 'high' && (
                          <circle
                            cx={x}
                            cy={y}
                            r={30}
                            className={`${styles.pulse} opacity-20 animate-ping`}
                          />
                        )}

                        <circle
                          cx={x}
                          cy={y}
                          r={14}
                          className={`cursor-pointer transition-all ${
                            isActive ? 'fill-[#51B848] scale-125' : styles.pulse
                          }`}
                          onMouseEnter={() => setActiveZone(zone.name)}
                          onMouseLeave={() => setActiveZone(null)}
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute inset-0 pointer-events-none">
                  {coverageZones.map((zone, index) => {
                    const isActive = activeZone === zone.name;
                    if (!isActive) return null;

                    return (
                      <div
                        key={index}
                        className="absolute bg-white rounded-xl shadow-2xl p-4 border-2 border-[#2E5C9A] z-10 w-64 animate-in fade-in slide-in-from-bottom-2 duration-300"
                        style={{
                          left: `${(zone.position.x / 1099) * 100}%`,
                          top: `${(zone.position.y / 707) * 100}%`,
                          transform: 'translate(-50%, -120%)'
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 bg-gradient-to-br ${
                              getStrengthStyles(zone.strength).bg
                            } rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            {zone.strength === 'new' ? (
                              <Sparkles className="text-white" size={20} />
                            ) : (
                              <MapPin className="text-white" size={20} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 mb-1">{zone.name}</h4>
                            <p className="text-xs text-gray-600 mb-2">{zone.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {zone.cities.slice(0, 3).map((city, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {city}
                                </span>
                              ))}
                              {zone.cities.length > 3 && (
                                <span className="text-xs bg-[#2E5C9A] text-white px-2 py-1 rounded font-semibold">
                                  +{zone.cities.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-full"></div>
                  <span className="text-gray-600 font-medium">Cobertura Alta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-full"></div>
                  <span className="text-gray-600 font-medium">Cobertura Media</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full"></div>
                  <span className="text-gray-600 font-medium">Rutas Nuevas</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {coverageZones.map((zone, index) => {
                const styles = getStrengthStyles(zone.strength);
                const isActive = activeZone === zone.name;

                return (
                  <div
                    key={index}
                    className={`group relative bg-white p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#2E5C9A] shadow-xl scale-[1.02]'
                        : 'border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl'
                    }`}
                    onMouseEnter={() => setActiveZone(zone.name)}
                    onMouseLeave={() => setActiveZone(null)}
                  >
                    {zone.strength === 'new' && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Sparkles size={12} />
                        NUEVA
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`${styles.size} bg-gradient-to-br ${styles.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md`}>
                        {zone.strength === 'high' ? (
                          <TrendingUp className="text-white" size={16} />
                        ) : (
                          <MapPin className="text-white" size={16} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{zone.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{zone.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {zone.cities.map((city, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-50 text-gray-700 px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
