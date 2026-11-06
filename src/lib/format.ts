/** Utilidades de formato compartidas por el blog y las secciones. */

const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const shortFormatter = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatDate = (date: Date) => dateFormatter.format(date);

export const formatDateShort = (date: Date) => shortFormatter.format(date);

/** Tiempo de lectura estimado en minutos (200 palabras/minuto). */
export const readingTime = (body: string | undefined) => {
  const words = body?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 200));
};

/** Convierte un título en slug seguro para URLs. */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
