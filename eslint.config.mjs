import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Las fotos van por <img> a propósito: se optimizan en Cloudflare, no en Next.
      '@next/next/no-img-element': 'off',
    },
  },
  { ignores: ['.next/**', 'out/**', 'node_modules/**'] },
];

export default config;
