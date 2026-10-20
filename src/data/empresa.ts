/** Datos de contacto de Químicos OCAM. Un solo lugar para navbar, hero, contacto y footer. */
export const empresa = {
  nombre: 'Químicos OCAM',
  telefono: '+506 6195 1073',
  telefonoHref: 'tel:+50661951073',
  whatsappNumero: '50661951073',
  email: 'quimicosocam@gmail.com',
  direccion: '800 metros este del Servicentro Cerro Cortez, Alajuela',
  horario: 'Lunes a viernes 7:00 a.m. a 5:00 p.m. · Sábados 7:00 a.m. a 12:00 p.m.',
  anioFundacion: 1998,
  redes: {
    instagram: 'https://www.instagram.com/quimicosocam',
    facebook: 'https://www.facebook.com/OCAMcr',
    linkedin: 'https://www.linkedin.com/company/quimicosocam',
  },
} as const;

/** Enlace a WhatsApp con mensaje prellenado. */
export function whatsappUrl(
  mensaje = 'Hola, vi su sitio web y me interesa información sobre sus productos de limpieza.'
): string {
  return `https://wa.me/${empresa.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}
