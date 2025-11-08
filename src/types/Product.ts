export interface Product {
  id: string;
  nombre: string;
  categorias: ('piscinas' | 'lecherias' | 'automotriz' | 'ferreteria' | 'domestico' | 'institucional')[];
  descripcionCorta: string;
  descripcionLarga: string;
  imageUrl: string;
  usos?: string[];
  presentaciones?: string[];
}

export const categorias = [
  { id: 'piscinas', nombre: 'Piscinas' },
  { id: 'lecherias', nombre: 'Lecherías' },
  { id: 'automotriz', nombre: 'Automotriz' },
  { id: 'ferreteria', nombre: 'Ferretería' },
  { id: 'domestico', nombre: 'Doméstico' },
  { id: 'institucional', nombre: 'Institucional' },
] as const;
