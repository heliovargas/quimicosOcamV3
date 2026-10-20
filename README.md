# Químicos OCAM

Sitio de Químicos OCAM S.A. (quimicosocam.com): Next.js 16 con export estático, React 19 y Tailwind CSS v4.

## Comandos

- `npm run dev`: servidor de desarrollo.
- `npm run build`: genera el sitio estático en `out/` (una página por producto, sitemap, robots y llms.txt).
- `npm run typecheck` y `npm run lint`.

## Deploy

Es un sitio 100% estático: se publica la carpeta `out/` en cualquier hosting estático (Cloudflare Pages: build `npm run build`, salida `out`). No hay variables de entorno ni backend.

## Dónde está cada cosa

- `src/app`: rutas (`/`, `/catalogo`, `/productos/[id]`), metadata, `sitemap.ts`, `robots.ts`, `llms.txt`.
- `src/components`: secciones y componentes; `src/components/ui` son los componentes base (botón, contenedor, sección).
- `src/app/globals.css`: tokens de diseño (colores, fuentes, sombras, animaciones).
- `src/data/productos.json`: catálogo. Editarlo y hacer build regenera páginas, sitemap y llms.txt.
- `src/data/empresa.ts` y `src/data/sitio.ts`: contacto, redes y metadata global.
- `src/utils/r2.ts`: URLs de las fotos en Cloudflare R2 (subir `VERSION` al reemplazar una foto con el mismo nombre).
