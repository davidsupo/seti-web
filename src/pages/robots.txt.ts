import type { APIContext } from 'astro';
import { BASE } from '../lib/base';

/** robots.txt generado en build para respetar la base de GitHub Pages. */
export function GET({ site }: APIContext) {
  const origin = site?.origin ?? 'https://setitechnology.pe';
  const sitemap = new URL(`${BASE}sitemap-index.xml`, origin).href;

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /admin/',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
