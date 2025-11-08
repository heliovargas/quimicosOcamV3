import { Target, Heart, TrendingUp, Beaker, Award, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const card1 = useScrollAnimation();
  const card2 = useScrollAnimation();
  const card3 = useScrollAnimation();
  const card4 = useScrollAnimation();
  const visionCards = useScrollAnimation();
  return (
    <section id="nosotros" className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#2E5C9A] tracking-wider uppercase">Sobre Nosotros</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Líderes en <span className="text-[#2E5C9A]">Productos de Limpieza</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Más de 20 años produciendo y distribuyendo productos químicos de calidad certificada
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div ref={card1.ref} className={`bg-white p-6 lg:p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-700 ${card1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Beaker className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Tecnología e Innovación</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                    <span className="font-bold text-[#2E5C9A]">QUÍMICOS OCAM S.A.</span> es una compañía dirigida a la producción de productos de limpieza, considerada líder en área de distribución de productos químicos en la Zona Norte de nuestro país, gracias a la calidad e integridad que ofrecemos.
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Nuestra tecnología nos permite la creación de fórmulas para productos de limpieza y desinfección, desarrolladas bajo las más estrictas normas de calidad, con materias primas importadas y con el menor costo económico posible.
                  </p>
                </div>
              </div>
            </div>

            <div ref={card2.ref} className={`bg-gradient-to-br from-[#51B848] to-[#3d8f38] p-6 lg:p-10 rounded-3xl shadow-xl text-white transition-all duration-700 ${card2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Compromiso Social</h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    En Químicos OCAM S.A. nos solidarizamos con el sector doméstico, lechero e industrial, poniendo en sus manos productos de alta calidad a precios accesibles, ampliamente probados y debidamente registrados en el Ministerio de Salud.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div ref={card3.ref} className={`bg-white p-6 lg:p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-700 ${card3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Equipo y Capacidad</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Contamos con personal especializado en el área de producción, distribución y agentes de ventas, que con gusto le atenderán. Así como una red de comercios abastecidos a lo largo de diferentes cantones del país.
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Nuestra amplia experiencia y alta capacidad de producción nos permite suplir las necesidades de su empresa, comercio u hogar con la mayor rapidez, facilidad y eficacia.
                  </p>
                </div>
              </div>
            </div>

            <div ref={card4.ref} className={`bg-white p-6 lg:p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-700 ${card4.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Nuestra Promesa</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Nos comprometemos con usted al ofrecerle los mejores productos y servicios. Puede confiar en que con nosotros siempre contará con que todos nuestros artículos se encuentran disponibles para entrega inmediata.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={visionCards.ref} className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${visionCards.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group relative bg-white p-6 sm:p-10 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-[#2E5C9A] transition-all hover:shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Visión</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Aspiramos a ser una de las fábricas de productos de limpieza más competitiva y productiva del país, con procesos de mejora continua que nos mantienen a la vanguardia.
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-[#51B848] to-[#3d8f38] p-6 sm:p-10 rounded-2xl shadow-lg text-white hover:shadow-2xl transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Valores</h3>
              <p className="text-sm sm:text-base leading-relaxed text-white/95">
                Integridad, innovación y espíritu emprendedor. Estos valores nos guían en todo lo que hacemos y son la base de nuestra organización.
              </p>
            </div>
          </div>

          <div className="group relative bg-white p-6 sm:p-10 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-[#2E5C9A] transition-all hover:shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Historia</h3>
              <p className="text-gray-600 leading-relaxed">
                Desde 1998 hemos crecido constantemente hasta alcanzar nuestro actual nivel de liderazgo sectorial mediante la mejora e innovación continuas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
