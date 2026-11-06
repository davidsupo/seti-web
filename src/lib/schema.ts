import { site } from '../data/site';
import { cities, hq } from '../data/cities';
import type { Faq } from '../data/faqs';

/** Organización (usada en todas las páginas). */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  alternateName: 'SETI',
  url: site.url,
  logo: `${site.url}/brand/seti-logo-dark.png`,
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
  '@id': `${site.url}/#localbusiness`,
  name: site.name,
  image: `${site.url}/og-default.png`,
  url: site.url,
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
  parentOrganization: { '@id': `${site.url}/#organization` },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: 'es-PE',
  publisher: { '@id': `${site.url}/#organization` },
};

export const breadcrumbSchema = (items: { label: string; href?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: `${site.url}${item.href}` } : {}),
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
  '@id': `${site.url}${url}#service`,
  name,
  description,
  url: `${site.url}${url}`,
  serviceType: name,
  provider: { '@id': `${site.url}/#organization` },
  areaServed: cities.map((city) => ({ '@type': 'City', name: city.name })),
  ...(slug ? { identifier: slug } : {}),
});
