import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';

const OUT = 'preview';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--hide-scrollbars', '--disable-gpu', '--no-first-run', '--disable-crash-reporter']
});

const shot = async (name, path, width, height, selector, dpr = 1) => {
  const tab = await browser.newPage();
  await tab.setViewport({ width, height, deviceScaleFactor: dpr });
  await tab.goto('http://127.0.0.1:4321' + path, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1800));
  if (selector) {
    await tab.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo(0, Math.max(0, y));
      }
    }, selector);
    await new Promise((r) => setTimeout(r, 1400));
  }
  await tab.screenshot({ path: `${OUT}/${name}.png` });
  console.log(name);
  await tab.close();
};

await shot('01-home', '/', 1440, 900);
await shot('02-servicios', '/servicios/', 1440, 900);
await shot('03-cobertura', '/cobertura/', 1440, 900, '.map-shell');
await shot('04-proyectos', '/proyectos/', 1440, 900, '#main');
await shot('05-blog', '/blog/', 1440, 900);
await shot('06-articulo', '/blog/cinco-preguntas-antes-de-contratar-videovigilancia/', 1440, 900);
await shot('07-contacto', '/contacto/', 1440, 900);
await shot('08-mobile', '/', 390, 844, null, 2);

await browser.close();
