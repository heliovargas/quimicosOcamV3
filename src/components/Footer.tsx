import { Phone, Mail, MapPin, ChevronRight, ExternalLink, Instagram, Facebook, Linkedin } from 'lucide-react';
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
            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://www.instagram.com/quimicosocam"
                target="_blank"
                rel="noopener noreferrer"
                className="group/social"
                aria-label="Visitar Instagram de Químicos OCAM"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center group-hover/social:scale-110 group-hover/social:shadow-lg group-hover/social:shadow-pink-500/50 transition-all">
                  <Instagram size={20} />
                </div>
              </a>
              <a
                href="https://www.facebook.com/OCAMcr"
                target="_blank"
                rel="noopener noreferrer"
                className="group/social"
                aria-label="Visitar Facebook de Químicos OCAM"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover/social:scale-110 group-hover/social:shadow-lg group-hover/social:shadow-blue-500/50 transition-all">
                  <Facebook size={20} />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/quimicosocam"
                target="_blank"
                rel="noopener noreferrer"
                className="group/social"
                aria-label="Visitar LinkedIn de Químicos OCAM"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center group-hover/social:scale-110 group-hover/social:shadow-lg group-hover/social:shadow-blue-600/50 transition-all">
                  <Linkedin size={20} />
                </div>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 bg-gradient-to-r from-[#2E5C9A] to-[#51B848] rounded-full"></div>
              <div className="w-2 h-1 bg-[#51B848] rounded-full"></div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 relative inline-block">
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
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 relative inline-block">
              Información de Contacto
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#2E5C9A] to-[#51B848]"></div>
            </h3>
            <ul className="space-y-5">
              <li className="group">
                <a href="https://wa.me/50661951073" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#20BA59] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">WhatsApp</p>
                    <p className="font-semibold hover:text-[#25D366] transition-colors">+506 6195 1073</p>
                  </div>
                </a>
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
