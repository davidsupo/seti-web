export interface Service {
  slug: string;
  order: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  intro: string[];
  capabilities: string[];
  closing: string;
  icon: string;
  image: string;
  imageAlt: string;
  /** Etiquetas cortas para el detalle del servicio */
  specs: { label: string; value: string }[];
}

export const services: Service[] = [
  {
    slug: 'alarmas-de-intrusion',
    order: '01',
    title: 'Sistema de alarmas de intrusión',
    shortTitle: 'Alarmas de intrusión',
    tagline: 'Protección interior, exterior y perimetral',
    summary:
      'Diseño, instalación y soporte de sistemas de detección de intrusión para protección interior, exterior y perimetral.',
    intro: [
      'SETI TECHNOLOGY ejecuta proyectos de sistemas de detección de intrusión para protección interior, exterior y perimetral, abarcando desde el diseño y la asesoría hasta la instalación y soporte técnico.',
      'Implementamos soluciones con paneles de alarma de alta tecnología, sensores de movimiento (PIR), barreras fotoeléctricas, contactos magnéticos, detectores de vibración y sonido, así como sistemas perimetrales avanzados como barreras infrarrojas, microondas, láser y cable sensor enterrado o microfónico.',
    ],
    capabilities: [
      'Paneles de alarma de alta tecnología',
      'Sensores de movimiento (PIR)',
      'Barreras fotoeléctricas y contactos magnéticos',
      'Detectores de vibración y sonido',
      'Barreras infrarrojas, microondas y láser',
      'Cable sensor enterrado o microfónico',
    ],
    closing:
      'Garantizamos una detección oportuna y confiable, integrando los sistemas con otras plataformas de seguridad para una protección integral.',
    icon: 'shield',
    image: '/images/alarmas-intrusion.webp',
    imageAlt: 'Sistema de detección de intrusión con sensor PIR y perímetro protegido',
    specs: [
      { label: 'Cobertura', value: 'Interior · Exterior · Perimetral' },
      { label: 'Integración', value: 'Videovigilancia y control de acceso' },
      { label: 'Servicio', value: 'Diseño, instalación y mantenimiento' },
    ],
  },
  {
    slug: 'deteccion-de-incendio',
    order: '02',
    title: 'Sistema de alarma de detección de incendio',
    shortTitle: 'Detección de incendio',
    tagline: 'Normativa NFPA 72 y NFPA 70',
    summary:
      'Sistemas de detección de incendio diseñados e instalados bajo normativa NFPA 72 y NFPA 70, con dimensionamiento técnico.',
    intro: [
      'SETI TECHNOLOGY ejecuta proyectos de sistemas de detección de incendio, desarrollando soluciones desde el diseño y la asesoría hasta la instalación y soporte técnico, cumpliendo con normativas como NFPA 72 y NFPA 70.',
      'Implementamos sistemas completos que incluyen detectores de humo y temperatura, paneles de control, estaciones manuales y dispositivos de alerta, aplicando buenas prácticas y un correcto dimensionamiento para garantizar su óptimo funcionamiento.',
    ],
    capabilities: [
      'Detectores de humo y temperatura',
      'Paneles de control convencionales y direccionables',
      'Estaciones manuales y dispositivos de alerta',
      'Cálculo y dimensionamiento de la instalación',
      'Cumplimiento NFPA 72 y NFPA 70',
      'Pruebas, protocolos y puesta en operación',
    ],
    closing:
      'Cada proyecto se documenta y se prueba antes de la entrega, para que el sistema responda con certeza cuando más se necesita.',
    icon: 'flame',
    image: '/images/incendio.webp',
    imageAlt: 'Ilustración de un sistema de detección de incendio con panel de control y detectores',
    specs: [
      { label: 'Normativa', value: 'NFPA 72 · NFPA 70' },
      { label: 'Dispositivos', value: 'Humo · Temperatura · Estaciones manuales' },
      { label: 'Entregables', value: 'Diseño, pruebas y puesta en marcha' },
    ],
  },
  {
    slug: 'videovigilancia',
    order: '03',
    title: 'Sistema de videovigilancia',
    shortTitle: 'Videovigilancia',
    tagline: 'CCTV con analítica de video e IA',
    summary:
      'Soluciones de videovigilancia en alianza con fabricantes líderes, con analítica de video, LPR y mapas de calor.',
    intro: [
      'SETI TECHNOLOGY implementa soluciones avanzadas de videovigilancia en alianza con fabricantes líderes a nivel mundial. Diseñamos, instalamos y brindamos soporte integral en todas las etapas del proyecto.',
      'Contamos con experiencia en analítica de video como reconocimiento facial, conteo de personas, control de aforo, LPR, mapas de calor y detección de intrusión, optimizando la seguridad y gestión de nuestros clientes.',
    ],
    capabilities: [
      'Reconocimiento facial',
      'Conteo de personas y control de aforo',
      'Lectura de placas (LPR)',
      'Mapas de calor',
      'Detección de intrusión por video',
      'Soporte integral en todas las etapas del proyecto',
    ],
    closing:
      'La analítica convierte el video en información operativa: no solo se graba lo que ocurre, también se anticipa.',
    icon: 'camera',
    image: '/images/videovigilancia.webp',
    imageAlt: 'Cámara domo de videovigilancia frente a una sala de monitoreo',
    specs: [
      { label: 'Analítica', value: 'Facial · Aforo · LPR · Heatmaps' },
      { label: 'Alcance', value: 'Diseño, instalación y soporte' },
      { label: 'Operación', value: 'Monitoreo remoto y centralizado' },
    ],
  },
  {
    slug: 'control-de-acceso',
    order: '04',
    title: 'Sistema de control de acceso',
    shortTitle: 'Control de acceso',
    tagline: 'Acceso peatonal y vehicular',
    summary:
      'Control de acceso peatonal y vehicular con biometría facial y de huella, reconocimiento de placas y gestión de personal.',
    intro: [
      'SETI TECHNOLOGY desarrolla e implementa proyectos de control de acceso, abarcando desde el diseño y la asesoría hasta la instalación y soporte técnico.',
      'Implementamos soluciones de acceso peatonal y vehicular con reconocimiento de placas, control de asistencia y gestión de personal. Integramos tecnologías biométricas (facial y huella) y plataformas que se conectan con videovigilancia, alarmas y automatización, garantizando seguridad y eficiencia en cada proyecto.',
    ],
    capabilities: [
      'Acceso peatonal y vehicular',
      'Reconocimiento de placas',
      'Control de asistencia y gestión de personal',
      'Biometría facial y de huella',
      'Integración con videovigilancia y alarmas',
      'Automatización de accesos',
    ],
    closing:
      'Un mismo ecosistema para saber quién entra, cuándo y a dónde, sin fricción para las personas.',
    icon: 'fingerprint',
    image: '/images/control-acceso.webp',
    imageAlt: 'Huella digital sobre interfaz con iconos de tarjeta, cámara y lector de acceso',
    specs: [
      { label: 'Biometría', value: 'Facial · Huella' },
      { label: 'Vehicular', value: 'LPR y barreras automatizadas' },
      { label: 'Integración', value: 'CCTV · Alarmas · Automatización' },
    ],
  },
  {
    slug: 'conectividad-y-redes',
    order: '05',
    title: 'Conectividad y redes',
    shortTitle: 'Conectividad y redes',
    tagline: 'Infraestructura confiable y escalable',
    summary:
      'Cableado estructurado UTP y fibra óptica, radioenlaces y soluciones de red para una operación continua.',
    intro: [
      'SETI TECHNOLOGY ejecuta proyectos de conectividad y redes, brindando soluciones integrales desde el diseño y la asesoría hasta la implementación y soporte técnico.',
      'Desarrollamos infraestructuras de comunicaciones confiables y escalables que garantizan alto rendimiento y continuidad operativa. Implementamos sistemas de cableado estructurado UTP y fibra óptica (monomodo y multimodo), radioenlaces y soluciones de redes y seguridad, asegurando una conectividad eficiente y adaptada a las necesidades de cada proyecto.',
    ],
    capabilities: [
      'Cableado estructurado UTP',
      'Fibra óptica monomodo y multimodo',
      'Radioenlaces punto a punto y multipunto',
      'Redes y seguridad perimetral',
      'Diseño de infraestructura escalable',
      'Soporte técnico y continuidad operativa',
    ],
    closing:
      'La base de todo sistema de seguridad es la red: la dimensionamos para que crezca con el proyecto.',
    icon: 'network',
    image: '/images/redes.webp',
    imageAlt: 'Técnico de SETI Technology trabajando en un rack de comunicaciones',
    specs: [
      { label: 'Medios', value: 'UTP · Fibra óptica · Radioenlaces' },
      { label: 'Enfoque', value: 'Rendimiento y continuidad operativa' },
      { label: 'Alcance', value: 'Diseño, implementación y soporte' },
    ],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);

export const serviceNames = (slugs: string[]): string[] =>
  slugs.map((slug) => getService(slug)?.shortTitle ?? slug);
