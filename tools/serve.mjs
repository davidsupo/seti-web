// Servidor estático mínimo para revisar el build (sin dependencias).
// Uso: node tools/serve.mjs [puerto]
import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv[2] ?? 4321);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const resolve = async (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  let file = path.join(root, clean);
  if (!file.startsWith(root)) return null;

  try {
    const stat = await fs.stat(file);
    if (stat.isDirectory()) file = path.join(file, 'index.html');
    else return file;
  } catch {
    if (!path.extname(file)) {
      const withHtml = `${file.replace(/\/$/, '')}/index.html`;
      try {
        await fs.access(withHtml);
        return withHtml;
      } catch {
        return null;
      }
    }
    return null;
  }

  try {
    await fs.access(file);
    return file;
  } catch {
    return null;
  }
};

const server = createServer(async (req, res) => {
  const file = await resolve(req.url ?? '/');
  if (!file) {
    const notFound = path.join(root, '404.html');
    const body = await fs.readFile(notFound).catch(() => 'Not found');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(body);
    return;
  }

  const body = await fs.readFile(file);
  res.writeHead(200, {
    'content-type': MIME[path.extname(file)] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  res.end(body);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`SETI preview: http://127.0.0.1:${port}`);
});
