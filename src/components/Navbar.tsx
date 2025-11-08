import { Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50'
          : 'bg-white/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'h-20' : 'h-24'
        }`}>
          <Link
            to="/"
            className="relative group flex items-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2E5C9A]/10 to-[#51B848]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="/ocam.png"
              alt="Químicos OCAM - Productos de Limpieza"
              className={`relative transition-all duration-300 ${
                scrolled ? 'h-16' : 'h-20'
              } w-auto group-hover:scale-105`}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="relative group px-4 py-2"
            >
              <span className={`relative z-10 text-sm font-semibold uppercase tracking-wider transition-colors ${
                isActive('/') ? 'text-[#2E5C9A]' : 'text-gray-700 group-hover:text-[#2E5C9A]'
              }`}>
                Inicio
              </span>
              <div className={`absolute inset-0 bg-gradient-to-r from-[#2E5C9A]/5 to-[#51B848]/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${
                isActive('/') ? 'scale-100' : ''
              }`}></div>
              {isActive('/') && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#2E5C9A] to-[#51B848]"></div>
              )}
            </Link>

            <Link
              to="/catalogo"
              className="relative group ml-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2E5C9A] to-[#51B848] rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className={`relative flex items-center gap-1 px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all ${
                isActive('/catalogo')
                  ? 'bg-gradient-to-r from-[#1e4070] to-[#2E5C9A] text-white'
                  : 'bg-gradient-to-r from-[#2E5C9A] to-[#51B848] text-white group-hover:shadow-lg'
              }`}>
                Catálogo
                <ChevronRight
                  size={16}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative group p-2"
            >
              <div className="absolute inset-0 bg-[#2E5C9A]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative text-gray-700 group-hover:text-[#2E5C9A] transition-colors">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-screen' : 'max-h-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                isActive('/')
                  ? 'bg-gradient-to-r from-[#2E5C9A]/10 to-[#51B848]/10 text-[#2E5C9A]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="font-semibold">Inicio</span>
              <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/catalogo"
              className="relative group overflow-hidden rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2E5C9A] to-[#51B848]"></div>
              <div className="relative flex items-center justify-between px-4 py-3 text-white font-semibold">
                <span>Catálogo</span>
                <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
