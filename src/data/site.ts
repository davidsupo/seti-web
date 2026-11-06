/**
 * Datos globales del sitio.
 * Único lugar donde viven los datos de contacto, navegación y redes.
 */

import { withBase } from '../lib/base';

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
}

export const site = {
  name: 'SETI TECHNOLOGY',
  shortName: 'SETI',
  legalName: 'SETI TECHNOLOGY',
  tagline: 'Seguridad electrónica · Projects & IA',
  description:
    'Empresa especializada en el desarrollo e implementación de soluciones integrales de seguridad electrónica: alarmas de intrusión, detección de incendio, videovigilancia, control de acceso y conectividad.',
  url: 'https://setitechnology.pe',
  locale: 'es_PE',
  language: 'es',
  founded: '2015',
  phone: {
    label: '914 725 255',
    href: 'tel:+51914725255',
    whatsapp: '51914725255',
  },
  email: {
    label: 'SETI_TECHNOLOGY@OUTLOOK.ES',
    href: 'mailto:SETI_TECHNOLOGY@OUTLOOK.ES',
  },
  social: {
    instagram: {
      label: '@SETITECHNOLOGY',
      href: 'https://www.instagram.com/setitechnology/',
    },
  },
  headquarters: {
    city: 'Trujillo',
    region: 'La Libertad',
    country: 'Perú',
    label: 'Trujillo, Perú',
  },
  hours: 'Lun – Vie · 8:00 a 18:00',
  support: 'Monitoreo y soporte 24/7',
} as const;

export const nav: NavItem[] = [
  { label: 'Inicio', href: withBase('/') },
  {
    label: 'Servicios',
    href: withBase('/servicios/'),
    children: [
      {
        label: 'Alarmas de intrusión',
        href: withBase('/servicios/alarmas-de-intrusion/'),
        description: 'Detección interior, exterior y perimetral.',
      },
      {
        label: 'Detección de incendio',
        href: withBase('/servicios/deteccion-de-incendio/'),
        description: 'Sistemas bajo normativa NFPA 72 y NFPA 70.',
      },
      {
        label: 'Videovigilancia',
        href: withBase('/servicios/videovigilancia/'),
        description: 'CCTV y analítica de video con IA.',
      },
      {
        label: 'Control de acceso',
        href: withBase('/servicios/control-de-acceso/'),
        description: 'Biometría, placas y control de personal.',
      },
      {
        label: 'Conectividad y redes',
        href: withBase('/servicios/conectividad-y-redes/'),
        description: 'Cableado estructurado, fibra óptica y radioenlaces.',
      },
    ],
  },
  { label: 'Cobertura', href: withBase('/cobertura/') },
  { label: 'Proyectos', href: withBase('/proyectos/') },
  { label: 'Blog', href: withBase('/blog/') },
  { label: 'Contacto', href: withBase('/contacto/') },
];

export const stats = [
  { value: '07', label: 'Ciudades con cobertura', detail: 'Piura a Arequipa' },
  { value: '24/7', label: 'Monitoreo y soporte', detail: 'Atención continua' },
  { value: 'NFPA', label: '72 y 70', detail: 'Normativa aplicada' },
  { value: 'IA', label: 'Analítica de video', detail: 'LPR, aforo y mapas de calor' },
];

/** Valor de WhatsApp listo para usar en enlaces wa.me */
export const whatsappLink = (message = 'Hola SETI TECHNOLOGY, quiero información sobre sus servicios.') =>
  `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`;
