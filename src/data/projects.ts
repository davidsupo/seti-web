/**
 * Proyectos / casos representativos.
 * Sustituye estos datos por los casos reales del equipo comercial.
 */

export interface Project {
  slug: string;
  title: string;
  sector: string;
  city: string;
  year: string;
  services: string[];
  summary: string;
  results: { value: string; label: string }[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'planta-agroindustrial-trujillo',
    title: 'Perímetro y video analítica en planta agroindustrial',
    sector: 'Agroindustria',
    city: 'Trujillo',
    year: '2025',
    services: ['videovigilancia', 'alarmas-de-intrusion', 'conectividad-y-redes'],
    summary:
      'Cercado electrónico perimetral, 42 cámaras con analítica de intrusión y enlace de fibra óptica entre tres sedes de planta.',
    results: [
      { value: '42', label: 'cámaras integradas' },
      { value: '3', label: 'sedes enlazadas' },
      { value: '24/7', label: 'monitoreo centralizado' },
    ],
    image: '/images/alarmas-intrusion.webp',
    imageAlt: 'Planta industrial monitoreada por sistema de detección perimetral',
    featured: true,
  },
  {
    slug: 'centro-comercial-lima',
    title: 'Control de aforo y video analítica en centro comercial',
    sector: 'Retail',
    city: 'Lima',
    year: '2025',
    services: ['videovigilancia', 'control-de-acceso', 'deteccion-de-incendio'],
    summary:
      'Conteo de personas por acceso, mapas de calor por zona y control de aforo integrado al sistema de detección de incendio.',
    results: [
      { value: '18', label: 'accesos monitoreados' },
      { value: '6', label: 'zonas con heatmap' },
      { value: '1', label: 'plataforma unificada' },
    ],
    image: '/images/caso-retail.webp',
    imageAlt: 'Cámara de videovigilancia y sala de monitoreo en centro comercial',
    featured: true,
  },
  {
    slug: 'planta-pesquera-chimbote',
    title: 'Detección de incendio para planta pesquera',
    sector: 'Industria pesquera',
    city: 'Chimbote',
    year: '2024',
    services: ['deteccion-de-incendio', 'alarmas-de-intrusion'],
    summary:
      'Sistema direccionable con detección temprana en almacenes refrigerados, estaciones manuales y alertas zonificadas bajo NFPA 72.',
    results: [
      { value: '180', label: 'dispositivos direccionables' },
      { value: '12', label: 'zonas de detección' },
      { value: 'NFPA 72', label: 'norma aplicada' },
    ],
    image: '/images/caso-pesquera.webp',
    imageAlt: 'Sistema de detección de incendio en una planta pesquera',
    featured: true,
  },
  {
    slug: 'campus-educativo-piura',
    title: 'Acceso peatonal y control de asistencia en campus',
    sector: 'Educación',
    city: 'Piura',
    year: '2024',
    services: ['control-de-acceso', 'videovigilancia'],
    summary:
      'Torniquetes con biometría facial, control de asistencia del personal y correlación de eventos con videovigilancia.',
    results: [
      { value: '9', label: 'puntos de acceso' },
      { value: '1 200', label: 'personas registradas' },
      { value: '0', label: 'contacto físico requerido' },
    ],
    image: '/images/caso-campus.webp',
    imageAlt: 'Lector biométrico de control de acceso en campus educativo',
  },
  {
    slug: 'red-metropolitana-chiclayo',
    title: 'Red metropolitana y radioenlaces para sede corporativa',
    sector: 'Corporativo',
    city: 'Chiclayo',
    year: '2023',
    services: ['conectividad-y-redes', 'videovigilancia'],
    summary:
      'Cableado estructurado categoría 6A, backbone de fibra óptica y radioenlace redundante entre casa matriz y almacén.',
    results: [
      { value: '320', label: 'puntos de red' },
      { value: '2', label: 'rutas redundantes' },
      { value: '10 Gb', label: 'backbone de fibra' },
    ],
    image: '/images/caso-redes.webp',
    imageAlt: 'Rack de comunicaciones con cableado estructurado',
  },
  {
    slug: 'minera-arequipa',
    title: 'Videovigilancia perimetral en unidad operativa',
    sector: 'Minería',
    city: 'Arequipa',
    year: '2023',
    services: ['videovigilancia', 'alarmas-de-intrusion', 'conectividad-y-redes'],
    summary:
      'Cámaras térmicas y PTZ para perímetro extendido, con enlace inalámbrico y detección automática de intrusiones nocturnas.',
    results: [
      { value: '4 km', label: 'de perímetro cubierto' },
      { value: '16', label: 'cámaras térmicas y PTZ' },
      { value: '90 %', label: 'menos falsas alarmas' },
    ],
    image: '/images/caso-mineria.webp',
    imageAlt: 'Videovigilancia perimetral en una unidad minera',
  },
];

export const sectors = [...new Set(projects.map((project) => project.sector))];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
