export interface Product {
  id: string;
  nombre: string;
  categorias: ('piscinas' | 'lecherias' | 'automotriz' | 'domestico')[];
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
  { id: 'domestico', nombre: 'Doméstico' },
] as const;
