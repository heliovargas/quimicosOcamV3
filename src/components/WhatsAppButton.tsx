import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola, visité su sitio web y me interesa conocer más sobre sus productos de limpieza. ¿Podrían brindarme información?');
    window.open(`https://api.whatsapp.com/send?phone=50661951073&text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-50 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ¿Necesitas ayuda?
      </span>
    </button>
  );
}
