import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { withBase } from '../lib/base';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: `Blog · ${site.name}`,
    description:
      'Criterios técnicos sobre seguridad electrónica: videovigilancia, detección de incendio, control de acceso y redes.',
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withBase(`/blog/${post.id}/`),
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: `<language>es-pe</language>`,
  });
}
