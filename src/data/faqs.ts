export interface Faq {
  question: string;
  answer: string;
  category?: string;
}

export const faqs: Faq[] = [
  {
    question: '¿Atienden proyectos fuera de Trujillo?',
    answer:
      'Sí. Contamos con puntos operativos en Piura, Chiclayo, Jaén, Trujillo, Chimbote, Lima y Arequipa. Para plazas sin punto operativo evaluamos el proyecto y coordinamos una brigada de instalación.',
    category: 'Cobertura',
  },
  {
    question: '¿Cómo empieza un proyecto con SETI TECHNOLOGY?',
    answer:
      'Con una visita técnica sin costo. Levantamos el riesgo, definimos el alcance y entregamos una propuesta con memoria de cálculo, planos referenciales y presupuesto detallado por partidas.',
    category: 'Proceso',
  },
  {
    question: '¿Trabajan con equipos de marcas específicas?',
    answer:
      'Trabajamos con fabricantes líderes y seleccionamos la tecnología según el riesgo, el presupuesto y la compatibilidad con lo que el cliente ya tiene instalado. También integramos equipos existentes cuando es viable.',
    category: 'Tecnología',
  },
  {
    question: '¿Qué garantía ofrecen?',
    answer:
      'La garantía cubre equipos según el fabricante y la mano de obra de instalación. Además ofrecemos contratos de mantenimiento preventivo y correctivo con tiempos de atención acordados.',
    category: 'Garantía',
  },
  {
    question: '¿Puedo monitorear mis cámaras desde el celular?',
    answer:
      'Sí. Configuramos acceso remoto seguro a la plataforma de videovigilancia, con perfiles de usuario y notificaciones. También podemos integrar el monitoreo a una central o a su equipo de seguridad.',
    category: 'Videovigilancia',
  },
  {
    question: '¿Sus sistemas de incendio cumplen normativa?',
    answer:
      'Diseñamos e instalamos bajo NFPA 72 y NFPA 70, con dimensionamiento, protocolos de prueba y documentación de puesta en operación. La normativa local aplicable se revisa en cada proyecto.',
    category: 'Incendio',
  },
  {
    question: '¿Ofrecen mantenimiento después de la instalación?',
    answer:
      'Sí. Contamos con planes de mantenimiento preventivo programado, atención correctiva, reposición de componentes y soporte técnico remoto o en sitio.',
    category: 'Soporte',
  },
  {
    question: '¿Cuánto demora una instalación?',
    answer:
      'Depende del alcance. Un sistema residencial o de local comercial puede tomar de 1 a 3 días; un proyecto industrial o corporativo se ejecuta por etapas según cronograma, con hitos de avance y pruebas parciales.',
    category: 'Proceso',
  },
];
