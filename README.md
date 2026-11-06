# SETI TECHNOLOGY — Sitio web corporativo

Sitio estático construido con **Astro 5**, CSS propio con design tokens y un mapa dinámico con **Leaflet**. Todo el contenido proviene del brochure corporativo `BROCHURE SETI (2).pdf`, con la paleta de colores muestreada directamente del documento.

---

## 1. Arranque rápido

```bash
npm install
npm run dev      # http://localhost:4321/seti-web/
npm run build    # genera /dist listo para GitHub Pages
npm run preview  # sirve el build
```

> Requiere Node 18.20+, 20.9+ o 22+.
>
> La URL de desarrollo incluye el `base` (`/seti-web/`) para que local y producción se comporten igual. Si cambias el nombre del repositorio, actualiza `REPO_FALLBACK` en `astro.config.mjs`.

---

## 2. Estructura del proyecto

```
seti-technology/
├── public/
│   ├── brand/            Logo en dos versiones (claro / oscuro)
│   ├── images/           Fotos optimizadas a WebP
│   ├── icon-*.png        Iconos PWA
│   ├── og-default.png    Imagen para redes sociales
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   ├── ui/           Icon, Button, Badge, Section, SectionHeading, Logo
│   │   ├── sections/     Hero, Ticker, About, Services, Process, Coverage,
│   │   │                 Benefits, Projects, BlogPreview, Faq, Cta
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PageHero.astro
│   │   ├── CoverageMap.astro   Mapa Leaflet (100 % guiado por datos)
│   │   ├── CityList.astro
│   │   ├── ServiceCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── BlogCard.astro
│   │   └── BlogCover.astro     Portada generada cuando el post no tiene imagen
│   ├── content/
│   │   └── blog/          Publicaciones en Markdown
│   ├── data/              ← ÚNICA fuente de verdad del contenido
│   │   ├── site.ts        Contacto, navegación, redes
│   │   ├── cities.ts      Ciudades + configuración del mapa
│   │   ├── services.ts    5 líneas de servicio
│   │   ├── projects.ts    Casos / proyectos
│   │   ├── process.ts     Metodología de 4 etapas
│   │   ├── benefits.ts    Beneficios y diferenciales
│   │   └── faqs.ts        Preguntas frecuentes
│   ├── layouts/BaseLayout.astro
│   ├── lib/               format.ts (fechas, lectura) · schema.ts (JSON-LD)
│   ├── pages/             Rutas del sitio
│   └── styles/            tokens.css · base.css
├── tools/                 Utilidades de assets y QA (no entran al build)
└── astro.config.mjs
```

---

## 3. Paleta de colores

Muestreada del PDF (rellenos vectoriales y color de texto), centralizada en `src/styles/tokens.css`:

| Token | Hex | Uso |
| --- | --- | --- |
| `--navy-950` | `#04141f` | Fondos más profundos |
| `--navy-900` | `#0b2748` | Superficie oscura principal |
| `--navy-800` | `#003d60` | Color de marca primario |
| `--navy-700` | `#153f60` | Variantes de fondo |
| `--blue-500` | `#104d87` | Enlaces y texto sobre claro |
| `--teal-400` | `#3dbbc8` | Acento turquesa |
| `--cyan-300` | `#29e2f9` | Acento eléctrico / CTA |
| `--cyan-200` | `#12f1ff` | Brillo y contornos |

El brochure usa además `#153357` y `#0B2748` como azules de portada: ambos quedaron representados en la escala `navy`.

---

## 4. Cómo agregar una ciudad al mapa

**No hay que tocar el mapa.** Solo se agrega un objeto en `src/data/cities.ts`:

```ts
{
  id: 'tacna',                    // único y estable (se usa en los enlaces #tacna)
  name: 'Tacna',
  region: 'Tacna',
  coords: [-18.0066, -70.2463],   // [latitud, longitud]
  role: 'operativa',              // 'hq' para la sede principal
  summary: 'Cobertura para el sur del país.',
  services: ['videovigilancia', 'control-de-acceso'],
}
```

Con eso se actualizan automáticamente:

- el marcador y el popup del mapa,
- la lista lateral y las tarjetas de `/cobertura`,
- el contador de ciudades de la portada, el hero y el footer,
- las «spokes» (líneas punteadas) que unen la sede con cada punto operativo,
- los datos estructurados `areaServed` de SEO,
- el texto de `robots`/sitemap no requiere cambios.

El encuadre del mapa se calcula con `fitBounds` sobre todas las coordenadas, así que una ciudad nueva reajusta la vista sola.

---

## 5. Cómo publicar en el blog (semanal)

1. Crea un archivo en `src/content/blog/` con nombre en kebab-case: `mi-nueva-nota.md`.
2. La URL será `/blog/mi-nueva-nota/`.
3. Frontmatter requerido:

```yaml
---
title: 'Título de la publicación'
description: 'Resumen de una o dos líneas (se usa en la tarjeta y en SEO).'
pubDate: 2026-11-13
author: 'Equipo SETI Technology'
icon: camera          # camera | flame | fingerprint | network | shield | sparkles | router
tags: ['Videovigilancia', 'Guías']
draft: false          # true = no se publica
---
```

Opcionales: `updatedDate`, `cover` (ruta en `/public/images`) y `coverAlt`.

El contenido va en Markdown normal (títulos `##`, listas, tablas, citas…). El sitio:

- ordena por fecha descendente,
- destaca la última publicación en `/blog/`,
- muestra las 3 más recientes en la portada,
- calcula el tiempo de lectura,
- genera el índice «En este artículo» a partir de los `##`,
- actualiza `/rss.xml` y el `sitemap`.

**Flujo semanal sugerido:** escribir el `.md` → `git push` → el hosting reconstruye. No hace falta tocar componentes.

---

## 6. Criterios de contenido y diseño

- **Se omitieron misión y visión**, tal como se pidió: no son secciones recomendadas para un sitio corporativo (no aportan información accionable ni SEO útil). En su lugar, la sección «Quiénes somos» usa el texto de bienvenida del brochure y tres diferenciales concretos.
- **Los datos de contacto** (teléfono, correo, Instagram, sede Trujillo) son exactamente los del PDF.
- **Los proyectos** (`src/data/projects.ts`) son casos *representativos* del tipo de solución. Reemplázalos por casos reales antes de publicar; no incluyen nombres de clientes.
- **Textos redactados**: los párrafos de beneficios, metodología y FAQ se redactaron a partir de los servicios y normativas del brochure. Revísalos con el equipo técnico antes de publicar.
- El titular del hero reutiliza el del brochure («Seguridad Electrónica · Projects & IA») con el contorno tipográfico en cian de la portada.

---

## 7. Accesibilidad y rendimiento

- HTML semántico, `skip-link`, `aria-*` en menú móvil, mapa y acordeón.
- Contraste revisado sobre fondos oscuros y claros.
- `prefers-reduced-motion`: se desactivan marquesina, pulsos y animaciones de entrada.
- El contenido nunca depende de JavaScript: la animación de aparición es progresiva y las secciones se ven con JS desactivado.
- Imágenes en WebP; mapa y analítica cargados solo donde se usan.
- JSON-LD: `Organization`, `SecuritySystemInstallationService`, `WebSite`, `BlogPosting`, `FAQPage`, `BreadcrumbList`, `Service`.

---

## 8. Despliegue en GitHub Pages

Este proyecto ya está publicado en `https://davidsupo.github.io/seti-web/`.

### Cómo se resuelven las rutas

GitHub Pages publica los repositorios de proyecto en `https://USUARIO.github.io/NOMBRE-REPO/`, **no** en la raíz del dominio. Por eso:

- `astro.config.mjs` calcula `base = '/NOMBRE-REPO/'` automáticamente desde `GITHUB_REPOSITORY` (en Actions) o desde `REPO_FALLBACK` (en local, hoy `seti-web`).
- Todas las rutas internas e imágenes pasan por `src/lib/base.ts` (`withBase()`), así funcionan igual en la raíz o en un subdirectorio.
- `public/.nojekyll` evita que GitHub ignore la carpeta `_astro/` (donde van el CSS y el JS).
- `robots.txt` y `site.webmanifest` se generan en el build respetando la base.

### Opción A — GitHub Actions (recomendada)

El workflow ya está incluido en `.github/workflows/deploy.yml` y crea el sitio de Pages
automáticamente si aún no existe (`enablement: true`).

1. Sube los cambios:

   ```bash
   git add .
   git commit -m "Rutas con base para GitHub Pages"
   git push origin main
   ```

2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   Si Pages nunca se activó, este paso también lo habilita.
3. Cada `push` a `main` compila y publica en `https://USUARIO.github.io/NOMBRE-REPO/`.
4. Revisa la pestaña **Actions** hasta que “Deploy to GitHub Pages” termine en verde.

No hace falta subir `dist/` ni `node_modules/`: están en `.gitignore` y el workflow ejecuta `npm ci && npm run build`.

> **Error `Get Pages site failed … Not Found`**: significa que Pages no está habilitado
> en el repositorio. Actívalo en **Settings → Pages** (Source: *GitHub Actions*) y vuelve
> a ejecutar el workflow desde la pestaña Actions → *Re-run all jobs*. Si el repositorio es
> privado, GitHub Pages requiere un plan de pago.

### Opción B — subir `dist/` a mano

```bash
npm run build
```

Sube **el contenido** de `dist/` a la rama `gh-pages` (incluido el archivo `.nojekyll`) y en **Settings → Pages** elige *Deploy from a branch → gh-pages / (root)*.

> ⚠️ Si subes `dist/` a `main`, la carpeta `_astro/` devolverá 404 porque GitHub ignora las carpetas que empiezan con `_`. `.nojekyll` lo evita.

### Dominio propio o repo `USUARIO.github.io`

Ahí el sitio vive en la raíz y la base debe ser `/`:

```bash
# PowerShell
$env:BASE_PATH='/'; $env:SITE_URL='https://setitechnology.pe'; npm run build

# bash
BASE_PATH=/ SITE_URL=https://setitechnology.pe npm run build
```

En Actions basta con descomentar el bloque `env:` del workflow.

### Comprobar el despliegue en local

El build normal usa `base = /seti-web/`, así que **no funciona servido en la raíz**. Hay dos formas de revisarlo:

```bash
# A) respetando la base real de GitHub Pages
npm run build
npm run serve                  # http://127.0.0.1:4321/seti-web/
npm run check:deploy           # verifica que no haya 404

# B) como si estuviera en la raíz (sirve para `npx http-server dist`)
npm run build:root
npx http-server dist
```

`build:root` recompila con `BASE_PATH=/`; el resto es idéntico. Vuelve a ejecutar
`npm run build` antes de hacer commit para dejar el `dist` con la base correcta.

`check-deploy.mjs` recorre las 10 rutas principales y falla si algún recurso, script, imagen o enlace interno queda sin la base (detecta exactamente los 404 típicos).

### Antes de publicar

1. Ajusta `SITE_URL` (o `site` en `astro.config.mjs`) al dominio real: afecta canonical, Open Graph, JSON-LD, `robots.txt` y sitemap.
2. Reemplaza `public/og-default.png` si cambia el mensaje de marca.
3. Verifica el enlace de Instagram y añade otras redes en `src/data/site.ts`.
4. Si el formulario debe enviar correos sin abrir el cliente de correo, conecta un endpoint (Formspree, Resend) en `src/pages/contacto.astro`.

---

## 9. Scripts de assets (opcional)

`tools/` contiene los scripts usados para extraer y optimizar material del PDF. **No forman parte del build** y requieren `pymupdf` + `Pillow` (`pip install pymupdf pillow`) apuntando a una carpeta local de dependencias:

- `build_assets.py` — extrae fotos del PDF y las convierte a WebP.
- `circulars.py` — recorta las ilustraciones circulares con transparencia.
- `case_images.py` — genera las portadas de proyectos.
- `og.py` — genera la imagen Open Graph.
- `serve.mjs` — servidor estático que respeta la base (`node tools/serve.mjs 4400 /seti-web/`).
- `shoot.mjs`, `segments.mjs`, `mapshots.mjs`, `preview.mjs`, `check-deploy.mjs`, `check-map-base.mjs` — QA visual y verificación de rutas con Puppeteer.

`preview/` guarda capturas de referencia del sitio ya construido (portada, servicios, cobertura, proyectos, blog, artículo, contacto y móvil).

