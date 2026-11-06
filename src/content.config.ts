import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog: cada publicación es un archivo .md dentro de src/content/blog.
 * El nombre del archivo se convierte en la URL: /blog/<nombre>/
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Equipo SETI Technology'),
    /** Icono de la portada generada (ver BlogCover.astro) */
    icon: z
      .enum(['camera', 'flame', 'fingerprint', 'network', 'shield', 'sparkles', 'router'])
      .default('sparkles'),
    /** Imagen opcional en /public/images — si existe, reemplaza la portada generada */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
