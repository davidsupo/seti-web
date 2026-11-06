// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/* ────────────────────────────────────────────────────────────────────────────
   CONFIGURACIÓN DE DESPLIEGUE
   ────────────────────────────────────────────────────────────────────────────
   GitHub Pages sirve los repositorios de proyecto en:
       https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/
   Por eso el sitio necesita un `base` y todas las rutas internas lo respetan.

   En GitHub Actions no hay que tocar nada: el nombre del repositorio y el
   usuario se detectan automáticamente de las variables del entorno.

   En local:
     · Si tu repo se llama distinto a "seti-technology", cambia REPO_FALLBACK.
     · Para servir en la raíz (dominio propio o repo TU-USUARIO.github.io):
         BASE_PATH=/ npm run build
   ──────────────────────────────────────────────────────────────────────────── */

const REPO_FALLBACK = 'seti-web';

const [ownerFromEnv, repoFromEnv] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const repo = process.env.REPO_NAME ?? repoFromEnv ?? REPO_FALLBACK;
const isUserSite = repo.endsWith('.github.io');

// '/' para páginas de usuario/dominio propio · '/repo/' para páginas de proyecto
const base = process.env.BASE_PATH ?? (isUserSite ? '/' : `/${repo}/`);

// Dominio del sitio. En GitHub Actions se detecta el usuario; en local usa la
// URL real de GitHub Pages. Cámbialo si algún día usas un dominio propio.
const site =
  process.env.SITE_URL ??
  (ownerFromEnv ? `https://${ownerFromEnv}.github.io` : 'https://davidsupo.github.io');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  devToolbar: { enabled: false },
});
