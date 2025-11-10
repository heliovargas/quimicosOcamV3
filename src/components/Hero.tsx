import { Users, Package, Calendar, Award } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [counts, setCounts] = useState({ clients: 0, products: 0, years: 0, certified: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounters();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { clients: 1000, products: 50, years: 20, certified: 100 };
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        clients: Math.floor(targets.clients * progress),
        products: Math.floor(targets.products * progress),
        years: Math.floor(targets.years * progress),
        certified: Math.floor(targets.certified * progress),
      });

      if (currentStep >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, increment);
  };

  return (
    <section ref={sectionRef} id="inicio" className="relative bg-white pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/923228/pexels-photo-923228.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Vista del Volcán Arenal en la Zona Norte de Costa Rica, región donde opera Químicos OCAM"
          loading="eager"
          className="w-full h-full object-cover opacity-15 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-green-50/80"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6 opacity-0 animate-fade-in-up">
              Más de 20 años de experiencia
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight opacity-0 animate-fade-in-up animation-delay-100">
              Soluciones profesionales para
              <span className="text-[#2E5C9A]"> la limpieza</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
              Líderes en productos de limpieza y desinfección en la Zona Norte del país. Calidad certificada y respaldo garantizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animation-delay-300">
              <a
                href="/catalogo"
                className="inline-flex items-center justify-center bg-[#2E5C9A] text-white px-8 py-4 rounded-md font-medium hover:bg-[#234570] transition-all shadow-md hover:shadow-lg"
              >
                Explorar catálogo
              </a>
              <a
                href="#nosotros"
                className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md font-medium hover:border-[#2E5C9A] hover:text-[#2E5C9A] transition-all"
              >
                Conocer más
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 opacity-0 animate-scale-in animation-delay-100 hover:scale-105 hover:shadow-2xl transition-all cursor-default overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#2E5C9A] mb-1">+{counts.clients.toLocaleString()}</div>
                      <div className="text-gray-600 font-medium">Clientes satisfechos</div>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 opacity-0 animate-scale-in animation-delay-300 hover:scale-105 hover:shadow-2xl transition-all cursor-default overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#2E5C9A] mb-1">+{counts.products}</div>
                      <div className="text-gray-600 font-medium">Productos disponibles</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-8">
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 opacity-0 animate-scale-in animation-delay-200 hover:scale-105 hover:shadow-2xl transition-all cursor-default overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#51B848] mb-1">+{counts.years}</div>
                      <div className="text-gray-600 font-medium">Años de experiencia</div>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-[#2E5C9A]/90 backdrop-blur-sm p-8 rounded-xl shadow-lg text-white opacity-0 animate-scale-in animation-delay-400 hover:scale-105 hover:shadow-2xl transition-all cursor-default overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-1">{counts.certified}%</div>
                      <div className="font-medium">Certificados MinSalud</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-2 gap-4 mt-12">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-lg flex items-center justify-center">
                <Users className="text-white" size={18} />
              </div>
              <div className="text-3xl font-bold text-[#2E5C9A]">+{counts.clients.toLocaleString()}</div>
              <div className="text-gray-600 text-sm">Clientes</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-lg flex items-center justify-center">
                <Calendar className="text-white" size={18} />
              </div>
              <div className="text-3xl font-bold text-[#51B848]">+{counts.years}</div>
              <div className="text-gray-600 text-sm">Años</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-lg flex items-center justify-center">
                <Package className="text-white" size={18} />
              </div>
              <div className="text-3xl font-bold text-[#2E5C9A]">+{counts.products}</div>
              <div className="text-gray-600 text-sm">Productos</div>
            </div>
          </div>

          <div className="bg-[#2E5C9A]/90 backdrop-blur-sm p-6 rounded-xl shadow-md text-white text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Award className="text-white" size={18} />
              </div>
              <div className="text-3xl font-bold">{counts.certified}%</div>
              <div className="text-sm">Certificados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
