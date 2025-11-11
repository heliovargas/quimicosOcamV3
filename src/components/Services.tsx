import { Factory, Truck, Phone, ShieldCheck, Store } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    icon: Factory,
    title: 'Producción',
    description: 'Nuestra amplia experiencia nos ha permitido desarrollar nuestras propias fórmulas de productos de calidad. Trabajamos con materias primas importadas, seleccionadas para ofrecer productos de calidad a bajo costo.',
    featured: true
  },
  {
    icon: Truck,
    title: 'Distribución',
    description: 'Nuestra red nacional de distribución cuenta con personal formado, comprometido y experto. Los años de permanencia en el mercado nos han permitido generar una alta capacidad de producción para suplir las necesidades de su empresa, comercio u hogar.',
    featured: true
  },
  {
    icon: Store,
    title: 'Ventas al Detalle',
    description: 'Contamos con oficinas físicas las cuales puede visitar en cualquier momento para adquirir nuestros productos, y donde comprobará que la calidad de nuestros productos son conformes a estándares y reglamentos nacionales o internacionales.',
    featured: false
  },
  {
    icon: Phone,
    title: 'Asistencia Telefónica',
    description: 'Le ayudamos con cualquier consulta sobre nuestros productos, procesos o servicios. Póngase en contacto con nosotros. Será un gusto servirle.',
    featured: false
  },
  {
    icon: ShieldCheck,
    title: 'Garantías',
    description: 'Nuestros productos y servicios cumplen con los estándares y las regulaciones nacionales. Contamos con regentes profesionales, que llevan a cabo las respectivas inspecciones de los procesos productivos y control de calidad.',
    featured: false
  }
];

export default function Services() {
  const featuredServices = services.filter(s => s.featured);
  const regularServices = services.filter(s => !s.featured);
  const featuredAnim = useScrollAnimation();
  const regularAnim = useScrollAnimation();
  const bannerAnim = useScrollAnimation();

  return (
    <section id="servicios" className="relative py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#2E5C9A] tracking-wider uppercase">Lo Que Ofrecemos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Nuestros <span className="text-[#2E5C9A]">Servicios</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Soluciones integrales que cubren toda la cadena de valor
          </p>
        </div>

        <div ref={featuredAnim.ref} className={`grid lg:grid-cols-2 gap-8 mb-8 transition-all duration-700 ${featuredAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {featuredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 lg:p-12 rounded-3xl shadow-xl border-2 border-gray-100 hover:border-[#2E5C9A] transition-all hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                    <Icon className="text-white" size={36} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={regularAnim.ref} className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-700 ${regularAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {regularServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-[#51B848] transition-all hover:shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={bannerAnim.ref} className={`group relative cursor-default transition-all duration-700 ${bannerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E5C9A] to-[#51B848] rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-700"></div>
          <div className="relative bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] p-8 sm:p-10 lg:p-16 rounded-3xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-shadow duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-[#51B848]/0 via-[#51B848]/20 to-[#51B848]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative max-w-4xl mx-auto text-center">
              <div className="inline-block w-16 h-1 bg-white/30 rounded-full mb-6 group-hover:w-24 transition-all duration-500"></div>
              <p className="text-base sm:text-xl lg:text-2xl text-white leading-relaxed font-light mb-2">
                Gracias a la combinación de la experiencia y conocimientos técnicos inigualables,
              </p>
              <p className="text-base sm:text-xl lg:text-2xl text-white leading-relaxed">
                <span className="font-bold">OCAM</span> abarca toda la cadena de suministro, desde materias primas hasta el consumo final.
              </p>
              <div className="inline-block w-16 h-1 bg-white/30 rounded-full mt-6 group-hover:w-24 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
