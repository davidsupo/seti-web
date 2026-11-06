import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';

const OUT = 'C:\\Users\\SAID\\OneDrive\\Documentos\\DeepSeek\\.review\\shots5';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--hide-scrollbars', '--disable-gpu', '--no-first-run', '--disable-crash-reporter']
});

for (const [name, width, height] of [
  ['map-desktop', 1440, 900],
  ['map-mobile', 390, 844]
]) {
  const tab = await browser.newPage();
  await tab.setViewport({ width, height, deviceScaleFactor: 1 });
  await tab.goto('http://127.0.0.1:4321/cobertura/', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2500));
  const el = await tab.$('.map-shell');
  if (el) {
    await el.screenshot({ path: `${OUT}\\${name}.png` });
    const info = await tab.evaluate(() => {
      const map = document.querySelector('.map');
      return { h: map?.clientHeight, w: map?.clientWidth };
    });
    console.log(name, info);
  }
  await tab.close();
}

// Abre un popup para revisar el diseño
const tab = await browser.newPage();
await tab.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await tab.goto('http://127.0.0.1:4321/cobertura/', { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 2000));
await tab.evaluate(() => {
  const target = document.querySelector('[data-city-target="lima"]');
  if (target) target.click();
});
await new Promise((r) => setTimeout(r, 2200));
const shell = await tab.$('.map-shell');
if (shell) await shell.screenshot({ path: `${OUT}\\map-popup.png` });
console.log('popup listo');
await browser.close();
