import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

/** Tarjeta 1200x630 para WhatsApp, Facebook y demás. Fondo opaco: el logo PNG con transparencia se veía en negro. */
export function GET() {
  const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public', 'ocam.png')).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: 'linear-gradient(180deg, #ffffff 0%, #eef4fb 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 16, background: 'linear-gradient(90deg, #2e5c9a, #51b848)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 60, padding: '0 80px', width: '100%', height: '100%' }}>
          <img src={logo} width={420} height={256} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: 24, color: '#33782e', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
              Zona Norte · Costa Rica
            </div>
            <div style={{ fontSize: 56, fontWeight: 700, color: '#0f172a', lineHeight: 1.1, marginTop: 14 }}>
              Productos de limpieza y desinfección
            </div>
            <div style={{ fontSize: 26, color: '#475569', marginTop: 22, lineHeight: 1.35 }}>
              Fabricante y distribuidor desde 1998. Certificados por el Ministerio de Salud.
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
