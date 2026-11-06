// Compila el sitio para servirlo en la raíz del dominio (base = "/").
// Útil para revisar `dist/` con `npx http-server dist` o para dominio propio.
// Uso: npm run build:root
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const astro = fileURLToPath(new URL('../node_modules/astro/astro.js', import.meta.url));

const child = spawn(process.execPath, [astro, 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    BASE_PATH: '/',
    ASTRO_TELEMETRY_DISABLED: '1',
  },
});

child.on('exit', (code) => process.exit(code ?? 0));
