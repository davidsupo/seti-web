// QA visual: captura páginas con viewport real y reporta errores de consola y red.
// Uso: node tools/shoot.mjs [baseUrl] [salida]
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321';
const OUT = process.argv[3] ?? '.review/shots';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const pages = [
  { name: 'home', path: '/', viewport: { width: 1440, height: 900 }, full: true },
  { name: 'home-mobile', path: '/', viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, full: true },
  { name: 'servicios', path: '/servicios/', viewport: { width: 1440, height: 900 }, full: true },
  { name: 'servicio-detalle', path: '/servicios/videovigilancia/', viewport: { width: 1440, height: 900 }, full: true },
  { name: 'cobertura', path: '/cobertura/', viewport: { width: 1440, height: 900 }, full: true },
  { name: 'proyectos', path: '/proyectos/', viewport: { width: 1440, height: 900 }, full: true },
  { name: 'blog', path: '/blog/', viewport: { width: 1440, height: 900 }, full: true },
  { name: 'post', path: '/blog/nfpa-72-dimensionamiento-deteccion-incendio/', viewport: { width: 1440, height: 900 }, full: true },
  { name: 'contacto', path: '/contacto/', viewport: { width: 1440, height: 900 }, full: true },
  { name: 'contacto-mobile', path: '/contacto/', viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, full: true }
];

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--hide-scrollbars', '--disable-gpu', '--no-first-run', '--disable-crash-reporter'],
  protocolTimeout: 120000
});

const problems = [];

for (const page of pages) {
  const tab = await browser.newPage();
  const logs = [];

  tab.on('console', (msg) => {
    if (msg.type() === 'error') logs.push(`console: ${msg.text()}`);
  });
  tab.on('requestfailed', (req) => {
    logs.push(`requestfailed: ${req.url().slice(0, 120)} (${req.failure()?.errorText})`);
  });
  tab.on('pageerror', (err) => logs.push(`pageerror: ${err.message}`));

  await tab.setViewport(page.viewport);
  await tab.goto(BASE + page.path, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // fuerza la aparición de cualquier bloque diferido
  await tab.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  const metrics = await tab.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.body.scrollHeight,
    ready: document.readyState
  }));

  await tab.screenshot({ path: path.join(OUT, `${page.name}.png`), fullPage: page.full });

  if (metrics.scrollWidth > metrics.clientWidth + 1) {
    logs.push(`OVERFLOW X: scrollWidth ${metrics.scrollWidth} > clientWidth ${metrics.clientWidth}`);
  }

  console.log(`[${page.name}] ${metrics.clientWidth}px · alto ${metrics.height}px${logs.length ? ' · ' + logs.join(' | ') : ''}`);
  if (logs.length) problems.push({ page: page.name, logs });

  await tab.close();
}

await browser.close();
console.log(problems.length ? `\nPROBLEMAS en ${problems.length} página(s)` : '\nSin errores de consola ni de red.');
