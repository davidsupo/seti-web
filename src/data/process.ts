export interface ProcessStep {
  order: string;
  title: string;
  summary: string;
  details: string[];
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    order: '01',
    title: 'Ingeniería y diseño de proyectos',
    summary:
      'Levantamiento en sitio, análisis de riesgo y dimensionamiento técnico de cada sistema antes de comprar un solo equipo.',
    details: ['Visita técnica y levantamiento', 'Memoria de cálculo y planos', 'Propuesta técnica-económica'],
    icon: 'ruler',
  },
  {
    order: '02',
    title: 'Implementación de proyectos',
    summary:
      'Ejecutamos la obra con supervisión permanente, protocolos de prueba y entrega documentada.',
    details: [
      'Instalación',
      'Supervisión e integración',
      'Configuración',
      'Protocolos de prueba y puesta en operación',
    ],
    icon: 'tools',
  },
  {
    order: '03',
    title: 'Mantenimiento preventivo y correctivo',
    summary:
      'Cronogramas de mantenimiento que extienden la vida útil de los equipos y evitan fallas inesperadas.',
    details: ['Plan de mantenimiento anual', 'Limpieza y calibración', 'Reposición de componentes'],
    icon: 'wrench',
  },
  {
    order: '04',
    title: 'Soporte técnico y asistencia post-venta',
    summary:
      'Acompañamiento después de la entrega: atención de incidencias, repuestos y soporte remoto.',
    details: ['Mesa de ayuda', 'Soporte remoto y en sitio', 'Garantía y repuestos'],
    icon: 'headset',
  },
];
