// Genera public/sitemap.xml a partir de src/data/productos.json.
// Uso: npm run sitemap (correrlo cada vez que se agregan o quitan productos).
import fs from 'node:fs';

const SITE = 'https://quimicosocam.com';

const raiz = new URL('../', import.meta.url);
const productos = JSON.parse(fs.readFileSync(new URL('src/data/productos.json', raiz), 'utf8'));
const hoy = new Date().toISOString().slice(0, 10);

const escapar = (texto) => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function imagen(loc, titulo) {
  return `    <image:image>
      <image:loc>${loc}</image:loc>
      <image:title>${escapar(titulo)}</image:title>
    </image:image>`;
}

function url(loc, prioridad, frecuencia, imagenes = []) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${frecuencia}</changefreq>
    <priority>${prioridad}</priority>
${imagenes.length ? imagenes.join('\n') + '\n' : ''}  </url>`;
}

const entradasProductos = productos.map((p) => {
  // Los productos sin foto usan /producto-sin-foto.webp; esa imagen no va al sitemap.
  const fotos = [p.imageUrl, ...(p.galeria ?? [])].filter((f) => f.startsWith('https://'));
  return url(`${SITE}/productos/${p.id}`, '0.8', 'monthly', fotos.map((f) => imagen(f, p.nombre)));
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Página Principal -->
${url(`${SITE}/`, '1.0', 'weekly', [imagen(`${SITE}/ocam.png`, 'Químicos OCAM - Logo')])}

  <!-- Página de Catálogo -->
${url(`${SITE}/catalogo`, '0.9', 'weekly')}

  <!-- Productos Individuales -->
${entradasProductos.join('\n\n')}

</urlset>
`;

fs.writeFileSync(new URL('public/sitemap.xml', raiz), xml);
console.log(`sitemap.xml: ${productos.length} productos`);
