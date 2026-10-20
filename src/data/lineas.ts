import type { Product } from '../types/Product';

type Categoria = Product['categorias'][number];

/** Textos de las páginas por línea (/catalogo/<linea>). El resaltado va en azul en el título. */
export const lineas: Record<Categoria, { titulo: string; resaltado: string; intro: string }> = {
  domestico: {
    titulo: 'Productos de limpieza para',
    resaltado: 'el hogar',
    intro: 'Detergentes, desinfectantes, suavizantes, ceras, limpiadores y jabones para casas, comercios y oficinas.',
  },
  lecherias: {
    titulo: 'Productos de limpieza para',
    resaltado: 'lecherías',
    intro: 'Detergentes alcalinos, desincrustadores, selladores y desinfectantes para la rutina de ordeño y el equipo de la lechería.',
  },
  automotriz: {
    titulo: 'Productos de limpieza',
    resaltado: 'automotriz',
    intro: 'Shampoo para carros, desengrasantes, abrillantadores, fragancias y coolant para talleres, lavacar y flotillas.',
  },
  piscinas: {
    titulo: 'Productos químicos para',
    resaltado: 'piscinas',
    intro: 'Cloro granulado, alguicidas, clarificadores y reguladores de pH para mantener el agua limpia y segura.',
  },
};
