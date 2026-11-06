export interface Benefit {
  title: string;
  description: string;
  icon: string;
  metric?: string;
}

export const benefits: Benefit[] = [
  {
    title: 'Soluciones integrales',
    description:
      'Un solo proveedor para alarmas, incendio, videovigilancia, accesos y redes. Sistemas que dialogan entre sí en lugar de islas tecnológicas.',
    icon: 'layers',
  },
  {
    title: 'Alta confiabilidad',
    description:
      'Equipos de fabricantes líderes, instalación supervisada y protocolos de prueba antes de la puesta en operación.',
    icon: 'shield-check',
  },
  {
    title: 'Optimización de costos',
    description:
      'Dimensionamos cada proyecto según el riesgo real: sin sobredimensionar equipos ni dejar puntos ciegos.',
    icon: 'chart',
  },
  {
    title: 'Soporte especializado',
    description:
      'Ingenieros y técnicos propios, con mantenimiento preventivo programado y asistencia post-venta.',
    icon: 'headset',
  },
];

export interface Differentiator {
  title: string;
  description: string;
}

export const differentiators: Differentiator[] = [
  {
    title: 'Diseño antes que venta',
    description:
      'Primero levantamos el riesgo y calculamos; después proponemos el equipamiento. El proyecto se define en campo, no en un catálogo.',
  },
  {
    title: 'Integración real',
    description:
      'Videovigilancia, control de acceso, alarmas y automatización sobre una misma plataforma y una misma red.',
  },
  {
    title: 'Cobertura nacional',
    description:
      'Siete puntos operativos desde Piura hasta Arequipa, con la misma ingeniería y los mismos estándares.',
  },
];
