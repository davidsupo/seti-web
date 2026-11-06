import { BASE } from '../lib/base';

/** Manifest generado en build para que start_url respete la base del sitio. */
export function GET() {
  const manifest = {
    name: 'SETI TECHNOLOGY',
    short_name: 'SETI',
    description: 'Seguridad electrónica, proyectos e inteligencia artificial.',
    start_url: BASE,
    scope: BASE,
    display: 'standalone',
    background_color: '#04141f',
    theme_color: '#0b2748',
    lang: 'es-PE',
    icons: [
      { src: `${BASE}icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${BASE}icon-512.png`, sizes: '512x512', type: 'image/png' },
      {
        src: `${BASE}icon-maskable-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
}
