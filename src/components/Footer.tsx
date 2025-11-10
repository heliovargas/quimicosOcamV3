import { Phone, Mail, MapPin, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2E5C9A] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#51B848] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="group mb-6">
              <img
                src="/ocam.png"
                alt="Químicos OCAM"
                className="h-16 w-auto group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Líderes en la distribución de productos químicos de limpieza en la Zona Norte del país desde 1998.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-[#2E5C9A] to-[#51B848] rounded-full"></div>
              <div className="w-2 h-1 bg-[#51B848] rounded-full"></div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Enlaces Rápidos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#2E5C9A] to-[#51B848]"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  <span>Catálogo</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Información de Contacto
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#2E5C9A] to-[#51B848]"></div>
            </h3>
            <ul className="space-y-5">
              <li className="group">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Asistencia telefónica</p>
                    <p className="font-semibold">Disponible para consultas</p>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <a href="mailto:quimicosocam@gmail.com" className="font-semibold hover:text-[#51B848] transition-colors">
                      quimicosocam@gmail.com
                    </a>
                  </div>
                </div>
              </li>
              <li className="group">
                <a
                  href="https://maps.google.com/?q=Provincia+de+Alajuela,+Cerro+Cortez,+800m+este+del+Servicentro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-1">Ubicación</p>
                    <p className="font-semibold leading-relaxed">
                      Provincia de Alajuela, Cerro Cortez<br />
                      800m este del Servicentro
                    </p>
                    <p className="text-[#51B848] text-xs mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={12} />
                      <span>Ver en Google Maps</span>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-gray-800 pt-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="text-center">
            <p className="text-gray-400 text-sm leading-relaxed">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Químicos OCAM S.A.</span> Todos los derechos reservados.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>
              Productos registrados en el Ministerio de Salud.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
