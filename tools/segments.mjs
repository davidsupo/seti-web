// Captura por segmentos para páginas muy altas (evita el límite de textura de Chrome)
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321';
const OUT = process.argv[3] ?? '.review/shots3';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const targets = [
  { name: 'home', path: '/', width: 1440, height: 900, dpr: 1, segments: 5 },
  { name: 'home-mobile', path: '/', width: 390, height: 844, dpr: 2, segments: 5 },
  { name: 'cobertura', path: '/cobertura/', width: 1440, height: 900, dpr: 1, segments: 3 },
  { name: 'servicios', path: '/servicios/', width: 1440, height: 900, dpr: 1, segments: 3 },
  { name: 'servicio-detalle', path: '/servicios/videovigilancia/', width: 1440, height: 900, dpr: 1, segments: 2 },
  { name: 'blog', path: '/blog/', width: 1440, height: 900, dpr: 1, segments: 2 },
  { name: 'post', path: '/blog/nfpa-72-dimensionamiento-deteccion-incendio/', width: 1440, height: 900, dpr: 1, segments: 3 },
  { name: 'proyectos', path: '/proyectos/', width: 1440, height: 900, dpr: 1, segments: 2 },
  { name: 'contacto', path: '/contacto/', width: 1440, height: 900, dpr: 1, segments: 2 },
  { name: 'contacto-mobile', path: '/contacto/', width: 390, height: 844, dpr: 2, segments: 3 },
  { name: '404', path: '/no-existe/', width: 1440, height: 900, dpr: 1, segments: 1 }
];

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--hide-scrollbars', '--disable-gpu', '--no-first-run', '--disable-crash-reporter'],
  protocolTimeout: 180000
});

for (const t of targets) {
  const tab = await browser.newPage();
  await tab.setViewport({ width: t.width, height: t.height, deviceScaleFactor: t.dpr });
  await tab.goto(BASE + t.path, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  const total = await tab.evaluate(() => document.body.scrollHeight);
  const step = Math.ceil(total / t.segments);

  for (let i = 0; i < t.segments; i += 1) {
    const y = Math.min(i * step, Math.max(0, total - t.height));
    await tab.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise((r) => setTimeout(r, 700));
    await tab.screenshot({ path: path.join(OUT, `${t.name}-${i + 1}.png`) });
  }

  console.log(`${t.name}: ${total}px en ${t.segments} segmentos`);
  await tab.close();
}

await browser.close();
