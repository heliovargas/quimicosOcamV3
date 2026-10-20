import productosData from '../../data/productos.json';
import { empresa } from '../../data/empresa';
import { sitio } from '../../data/sitio';
import { categorias, type Product } from '../../types/Product';

const productos = productosData as Product[];

export const dynamic = 'force-static';

/** Resumen del sitio en texto plano para asistentes de IA (convención llms.txt). */
function generar(): string {
  const lineas = categorias
    .map((c) => {
      const items = productos
        .filter((p) => p.categorias.includes(c.id))
        .map((p) => `- [${p.nombre}](${sitio.url}/productos/${p.id}): ${p.descripcionCorta}`)
        .join('\n');
      return `### ${c.nombre}\n\n${items}`;
    })
    .join('\n\n');

  return `# ${sitio.nombre}

> Fabricante y distribuidor de productos de limpieza y desinfección en la Zona Norte de Costa Rica desde 1998. ${productos.length} productos en cuatro líneas (doméstico, lecherías, automotriz y piscinas), registrados en el Ministerio de Salud. Base en Cerro Cortez, San Carlos, Alajuela.

## Empresa

- Nombre legal: ${sitio.razonSocial}
- Sitio web: ${sitio.url}
- Teléfono y WhatsApp: ${empresa.telefono}
- Correo: ${empresa.email}
- Dirección: ${empresa.direccion}
- Horario: ${empresa.horario}
- Cobertura: distribución a 26 cantones de Alajuela (San Carlos, Guatuso, Los Chiles, Upala, Río Cuarto, Zarcero, Grecia, Sarchí, Naranjo, Palmares, San Ramón), Guanacaste (Liberia, La Cruz, Bagaces, Cañas, Tilarán, Abangares, Carrillo, Santa Cruz, Nicoya), Puntarenas (Montes de Oro, Puntarenas), Heredia (Santo Domingo, Santa Bárbara, Sarapiquí) y Limón (Pococí).
- Qué hace: producción de fórmulas propias con materias primas importadas, distribución con personal propio, ventas al detalle en sus oficinas, asistencia telefónica y garantía de cumplimiento de regulaciones nacionales con regentes profesionales.
- Para quién: sector doméstico, lechero, automotriz, piscinas, comercios e industria.

## Páginas principales

- [Inicio](${sitio.url}/): quiénes somos, servicios, cobertura y contacto.
- [Catálogo completo](${sitio.url}/catalogo): todos los productos con filtro por línea.
${categorias.map((c) => `- [Línea ${c.nombre}](${sitio.url}/catalogo?categoria=${c.id})`).join('\n')}

## Catálogo de productos

${lineas}
`;
}

export function GET() {
  return new Response(generar(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
