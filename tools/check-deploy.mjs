// Verifica que el build funcione servido bajo la base de GitHub Pages.
// Uso: node tools/check-deploy.mjs [puerto] [base]
import puppeteer from 'puppeteer-core';

const PORT = process.argv[2] ?? 4400;
const BASE = (process.argv[3] ?? '/seti-technology/').replace(/\/?$/, '/');
const ORIGIN = `http://127.0.0.1:${PORT}`;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const routes = [
  '',
  'servicios/',
  'servicios/videovigilancia/',
  'cobertura/',
  'proyectos/',
  'blog/',
  'blog/nfpa-72-dimensionamiento-deteccion-incendio/',
  'contacto/',
  'privacidad/',
  'rss.xml',
  'site.webmanifest',
  'robots.txt',
  'sitemap-index.xml'
];

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--hide-scrollbars', '--disable-gpu', '--no-first-run', '--disable-crash-reporter']
});

let problems = 0;

for (const route of routes) {
  const tab = await browser.newPage();
  const bad = [];

  tab.on('response', (res) => {
    if (res.status() >= 400 && !res.url().endsWith('/favicon.ico')) bad.push(`${res.status()} ${res.url()}`);
  });
  tab.on('requestfailed', (req) => {
    const reason = req.failure()?.errorText ?? '';
    if (!reason.includes('ERR_ABORTED')) bad.push(`FAIL ${req.url()} (${reason})`);
  });

  const url = `${ORIGIN}${BASE}${route}`;
  await tab.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch((e) => bad.push(`NAV ${e.message}`));
  await new Promise((r) => setTimeout(r, 1200));

  // Revisa enlaces internos rotos de la página
  const internal = await tab.evaluate((base) => {
    return [...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && !/^https?:|^mailto:|^tel:|^#/.test(h))
      .filter((h) => !h.startsWith(base));
  }, BASE);

  const localProblems = [...bad, ...internal.map((href) => `ENLACE SIN BASE: ${href}`)];
  if (localProblems.length) {
    problems += localProblems.length;
    console.log(`✗ ${route || '(inicio)'}`);
    localProblems.forEach((p) => console.log(`   ${p}`));
  } else {
    console.log(`✓ ${route || '(inicio)'}`);
  }

  await tab.close();
}

await browser.close();
console.log(problems === 0 ? '\nTodo correcto: 0 errores de recursos ni enlaces.' : `\n${problems} problema(s) encontrados.`);
process.exitCode = problems === 0 ? 0 : 1;
