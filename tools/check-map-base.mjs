// Verifica el mapa interactivo servido bajo la base de GitHub Pages.
// Uso: node tools/check-map-base.mjs [puerto] [base]
import puppeteer from 'puppeteer-core';

const PORT = process.argv[2] ?? 4400;
const BASE = (process.argv[3] ?? '/seti-web/').replace(/\/?$/, '/');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--hide-scrollbars', '--disable-gpu', '--no-first-run', '--disable-crash-reporter']
});

const tab = await browser.newPage();
await tab.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await tab.goto(`http://127.0.0.1:${PORT}${BASE}`, { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 1500));
await tab.screenshot({ path: 'preview/10-github-pages.png' });

await tab.goto(`http://127.0.0.1:${PORT}${BASE}cobertura/`, { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 2500));

const info = await tab.evaluate(() => ({
  pins: document.querySelectorAll('.map-pin').length,
  tiles: document.querySelectorAll('.leaflet-tile-loaded').length,
  leaflet: Boolean(document.querySelector('.leaflet-container'))
}));

await tab.evaluate(() => document.querySelector('[data-city-target="lima"]')?.click());
await new Promise((r) => setTimeout(r, 2200));

const popup = await tab.evaluate(() => {
  const a = document.querySelector('.leaflet-popup .map-popup__link');
  return a ? a.getAttribute('href') : null;
});

console.log('mapa:', info);
console.log('enlace del popup:', popup);
console.log(info.pins === 7 && info.tiles > 0 && popup === `${BASE}contacto/` ? 'OK' : 'REVISAR');

await browser.close();
