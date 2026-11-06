/**
 * Ciudades con cobertura operativa.
 *
 * ─────────────────────────────────────────────────────────────
 *  PARA AGREGAR UNA CIUDAD: copia un objeto del arreglo y ajusta
 *  los datos. No hay que tocar el mapa ni ningún componente:
 *  el mapa, los contadores y las tarjetas se generan solos.
 * ─────────────────────────────────────────────────────────────
 */

export interface City {
  /** Identificador único y estable (se usa en el DOM y en las URLs internas) */
  id: string;
  name: string;
  region: string;
  /** Coordenadas [latitud, longitud] */
  coords: [number, number];
  /** 'hq' = sede principal · 'operativa' = punto operativo */
  role: 'hq' | 'operativa';
  /** Texto corto para el popup y la tarjeta */
  summary: string;
  /** Servicios disponibles en la ciudad (slugs de src/data/services.ts) */
  services: string[];
  address?: string;
  phone?: string;
  featured?: boolean;
}

export const cities: City[] = [
  {
    id: 'trujillo',
    name: 'Trujillo',
    region: 'La Libertad',
    coords: [-8.1116, -79.0287],
    role: 'hq',
    summary: 'Sede principal. Ingeniería, integración, monitoreo y soporte para todo el país.',
    services: ['alarmas-de-intrusion', 'deteccion-de-incendio', 'videovigilancia', 'control-de-acceso', 'conectividad-y-redes'],
    address: 'Trujillo, La Libertad — Perú',
    featured: true,
  },
  {
    id: 'piura',
    name: 'Piura',
    region: 'Piura',
    coords: [-5.1945, -80.6328],
    role: 'operativa',
    summary: 'Proyectos industriales y comerciales en el norte del país.',
    services: ['videovigilancia', 'control-de-acceso', 'conectividad-y-redes'],
  },
  {
    id: 'chiclayo',
    name: 'Chiclayo',
    region: 'Lambayeque',
    coords: [-6.7714, -79.8408],
    role: 'operativa',
    summary: 'Instalación y mantenimiento de sistemas de seguridad electrónica.',
    services: ['alarmas-de-intrusion', 'videovigilancia', 'control-de-acceso'],
  },
  {
    id: 'jaen',
    name: 'Jaén',
    region: 'Cajamarca',
    coords: [-5.7073, -78.8073],
    role: 'operativa',
    summary: 'Soporte técnico especializado para la zona nororiental.',
    services: ['alarmas-de-intrusion', 'deteccion-de-incendio', 'videovigilancia'],
  },
  {
    id: 'chimbote',
    name: 'Chimbote',
    region: 'Áncash',
    coords: [-9.0745, -78.5936],
    role: 'operativa',
    summary: 'Soluciones para pesca, industria y comercio.',
    services: ['videovigilancia', 'control-de-acceso', 'conectividad-y-redes'],
  },
  {
    id: 'lima',
    name: 'Lima',
    region: 'Lima',
    coords: [-12.0464, -77.0428],
    role: 'operativa',
    summary: 'Proyectos corporativos, retail y edificios multifamiliares.',
    services: ['alarmas-de-intrusion', 'deteccion-de-incendio', 'videovigilancia', 'control-de-acceso', 'conectividad-y-redes'],
  },
  {
    id: 'arequipa',
    name: 'Arequipa',
    region: 'Arequipa',
    coords: [-16.409, -71.5375],
    role: 'operativa',
    summary: 'Integración de sistemas en el sur del Perú.',
    services: ['deteccion-de-incendio', 'videovigilancia', 'conectividad-y-redes'],
  },
];

/** Configuración del mapa — se recalcula automáticamente con las ciudades. */
export const mapConfig = {
  /** Centro de respaldo si el encuadre automático fallara */
  center: [-9.5, -77.6] as [number, number],
  zoom: 6,
  minZoom: 4,
  maxZoom: 13,
  /** Relleno (px) al encuadrar todos los marcadores */
  padding: [48, 48] as [number, number],
  tiles: {
    // OpenStreetMap estándar; el componente aplica un filtro oscuro acorde a la marca
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
};

export const hq = cities.find((city) => city.role === 'hq')!;
export const cityCount = cities.length;
/** Conteo con dos dígitos, para usar en cifras grandes del sitio */
export const cityCountLabel = String(cityCount).padStart(2, '0');
export const regions = [...new Set(cities.map((city) => city.region))];
