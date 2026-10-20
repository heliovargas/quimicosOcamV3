export interface Product {
  id: string;
  nombre: string;
  categorias: ('piscinas' | 'lecherias' | 'automotriz' | 'domestico')[];
  descripcionCorta: string;
  descripcionLarga: string;
  /** Foto principal, en media.quimicosocam.com (ver utils/r2.ts). */
  imageUrl: string;
  /** Fotos adicionales (otros ángulos o aromas); se muestran como miniaturas en el detalle. */
  galeria?: string[];
  usos?: string[];
  presentaciones?: string[];
}

export const categorias = [
  { id: 'piscinas', nombre: 'Piscinas' },
  { id: 'lecherias', nombre: 'Lecherías' },
  { id: 'automotriz', nombre: 'Automotriz' },
  { id: 'domestico', nombre: 'Doméstico' },
] as const;
