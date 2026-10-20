import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Sitio 100% estático: el build deja en `out/` un HTML por página (inicio, catálogo y cada producto).
  output: 'export',
  // Las fotos ya se optimizan en Cloudflare (ver src/utils/r2.ts); no usamos el optimizador de Next.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
