import { MapPin, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Visítenos
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Encuéntrenose en la Zona Norte
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2E5C9A] to-[#1e4070] rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Ubicación</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Provincia de Alajuela, Cerro Cortez, 21004<br />
                  800 metros este del Servicentro Cerro Cortez
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#51B848] to-[#3d8f38] rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Horarios de Atención</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">Lunes a Jueves</span>
                    <span className="text-sm sm:text-base text-gray-600">8:00 a.m. - 5:30 p.m.</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">Viernes</span>
                    <span className="text-sm sm:text-base text-gray-600">8:00 a.m. - 3:30 p.m.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7847.4877407460435!2d-84.355933!3d10.441888000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa07b87142222af%3A0x79a613ed245c4ee9!2sOCAM%20Productos%20de%20Limpieza!5e0!3m2!1sen!2scr!4v1762612089967!5m2!1sen!2scr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Químicos OCAM"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
