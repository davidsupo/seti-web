/**
 * Utilidades de rutas para que el sitio funcione tanto en la raíz de un
 * dominio como en un subdirectorio (GitHub Pages: /nombre-del-repo/).
 *
 * `import.meta.env.BASE_URL` la define Astro a partir de `base` en
 * astro.config.mjs y siempre termina en "/".
 */

export const BASE: string = import.meta.env.BASE_URL || '/';

/** Prefija la base del sitio a una ruta interna. Ignora URLs externas y anclas. */
export const withBase = (path = ''): string => {
  if (!path) return BASE;
  if (
    /^(https?:)?\/\//i.test(path) ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#') ||
    path.startsWith('data:')
  ) {
    return path;
  }
  return `${BASE}${path.replace(/^\/+/, '')}`;
};

/** URL absoluta (para SEO, JSON-LD y RSS). */
export const absoluteUrl = (path = '', siteUrl = ''): string => {
  const origin = siteUrl.replace(/\/+$/, '');
  return `${origin}${withBase(path)}`;
};
