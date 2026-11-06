import { site } from '../data/site';
import { cities, hq } from '../data/cities';
import { withBase, BASE } from './base';
import type { Faq } from '../data/faqs';

const origin = (import.meta.env.SITE || site.url).replace(/\/+$/, '');
/** Raíz absoluta del sitio, incluida la base de GitHub Pages. */
const root = `${origin}${BASE}`;
/** Convierte una ruta interna en URL absoluta respetando la base. */
const abs = (path = '') => `${origin}${withBase(path)}`;

/** Organización (usada en todas las páginas). */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${root}#organization`,
  name: site.name,
  alternateName: 'SETI',
  url: root,
  logo: abs('/brand/seti-logo-dark.png'),
  description: site.description,
  slogan: site.tagline,
  email: site.email.label,
  telephone: `+51 ${site.phone.label}`,
  areaServed: cities.map((city) => ({
    '@type': 'City',
    name: city.name,
    address: {
      '@type': 'PostalAddress',
      addressRegion: city.region,
      addressCountry: 'PE',
    },
  })),
  address: {
    '@type': 'PostalAddress',
    addressLocality: hq.city,
    addressRegion: hq.region,
    addressCountry: 'PE',
  },
  sameAs: [site.social.instagram.href],
};

/** Ficha de negocio local, con la sede principal. */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'SecuritySystemInstallationService',
  '@id': `${root}#localbusiness`,
  name: site.name,
  image: abs('/og-default.png'),
  url: root,
  telephone: `+51 ${site.phone.label}`,
  email: site.email.label,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: hq.city,
    addressRegion: hq.region,
    addressCountry: 'PE',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  parentOrganization: { '@id': `${root}#organization` },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${root}#website`,
  url: root,
  name: site.name,
  inLanguage: 'es-PE',
  publisher: { '@id': `${root}#organization` },
};

export const breadcrumbSchema = (items: { label: string; href?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: abs(item.href) } : {}),
  })),
});

export const faqSchema = (faqs: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

export const serviceSchema = (
  name: string,
  description: string,
  url: string,
  slug: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${abs(url)}#service`,
  name,
  description,
  url: abs(url),
  serviceType: name,
  provider: { '@id': `${root}#organization` },
  areaServed: cities.map((city) => ({ '@type': 'City', name: city.name })),
  ...(slug ? { identifier: slug } : {}),
});
