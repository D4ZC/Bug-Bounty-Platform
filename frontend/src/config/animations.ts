// Configuración centralizada para animaciones y transiciones
export const ANIMATION_CONFIG = {
  // Duración de transiciones
  durations: {
    fast: 150,
    normal: 200,
    slow: 300,
    slower: 500,
  },

  // Delays para animaciones escalonadas
  delays: {
    none: 0,
    small: 100,
    medium: 200,
    large: 300,
    xlarge: 400,
    xxlarge: 500,
    xxxlarge: 600,
  },

  // Easing functions
  easing: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Tipos de animaciones disponibles
  types: {
    fadeIn: 'fade-in',
    slideInFromTop: 'slide-in-from-top-2',
    slideInFromLeft: 'slide-in-from-left',
    slideInFromRight: 'slide-in-from-right',
    scaleIn: 'scale-in',
  },
} as const;

// Clases CSS predefinidas para animaciones
export const ANIMATION_CLASSES = {
  // Animaciones de entrada
  fadeIn: `animate-in ${ANIMATION_CONFIG.types.fadeIn} duration-${ANIMATION_CONFIG.durations.normal}`,
  slideInFromTop: `animate-in ${ANIMATION_CONFIG.types.slideInFromTop} duration-${ANIMATION_CONFIG.durations.normal}`,
  slideInFromLeft: `animate-in ${ANIMATION_CONFIG.types.slideInFromLeft} duration-${ANIMATION_CONFIG.durations.normal}`,
  
  // Transiciones
  transitionAll: 'transition-all duration-200',
  transitionColors: 'transition-colors duration-200',
  transitionTransform: 'transition-transform duration-200',
  
  // Hover effects
  hoverShadow: 'hover:shadow-lg transition-shadow duration-200',
  hoverScale: 'hover:scale-105 transition-transform duration-200',
} as const;

// Configuración para componentes específicos
export const COMPONENT_ANIMATIONS = {
  // Dashboard cards
  dashboardCard: (delay: keyof typeof ANIMATION_CONFIG.delays = 'none') => 
    `${ANIMATION_CLASSES.slideInFromLeft} delay-${ANIMATION_CONFIG.delays[delay]}`,
  
  // Auth layout
  authLayout: {
    container: `${ANIMATION_CLASSES.fadeIn} duration-${ANIMATION_CONFIG.durations.slower}`,
    title: `${ANIMATION_CLASSES.slideInFromTop} duration-${ANIMATION_CONFIG.durations.slower} delay-${ANIMATION_CONFIG.delays.none}`,
    subtitle: `${ANIMATION_CLASSES.slideInFromTop} duration-${ANIMATION_CONFIG.durations.slower} delay-${ANIMATION_CONFIG.delays.small}`,
    form: `${ANIMATION_CLASSES.slideInFromTop} duration-${ANIMATION_CONFIG.durations.slower} delay-${ANIMATION_CONFIG.delays.medium}`,
  },
  
  // Notifications
  notification: {
    container: `${ANIMATION_CLASSES.slideInFromTop} duration-${ANIMATION_CONFIG.durations.normal}`,
  },
  
  // Sidebar
  sidebar: {
    overlay: `${ANIMATION_CLASSES.fadeIn} duration-${ANIMATION_CONFIG.durations.normal}`,
    menu: `${ANIMATION_CLASSES.slideInFromLeft} duration-${ANIMATION_CONFIG.durations.normal}`,
  },
  
  // User menu
  userMenu: {
    dropdown: `${ANIMATION_CLASSES.slideInFromTop} duration-${ANIMATION_CONFIG.durations.normal}`,
  },
} as const;

// Configuración para estados de loading
export const LOADING_CONFIG = {
  // Duración del skeleton loading
  skeletonDuration: 2000,
  
  // Intervalo de pulso
  pulseInterval: 1000,
  
  // Configuración para diferentes tipos de skeleton
  skeletonTypes: {
    card: {
      lines: 3,
      avatar: true,
      title: true,
    },
    table: {
      rows: 5,
      columns: 2,
    },
    profile: {
      avatar: true,
      info: true,
      stats: true,
    },
  },
} as const;

// Configuración para notificaciones
export const NOTIFICATION_CONFIG = {
  // Duración por defecto
  defaultDuration: 3000,
  
  // Duración por tipo
  durations: {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 3000,
  },
  
  // Posiciones disponibles
  positions: {
    topRight: 'fixed top-4 right-4',
    topLeft: 'fixed top-4 left-4',
    bottomRight: 'fixed bottom-4 right-4',
    bottomLeft: 'fixed bottom-4 left-4',
    topCenter: 'fixed top-4 left-1/2 transform -translate-x-1/2',
  },
  
  // Estilos por tipo
  styles: {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  },
} as const;

// Configuración para transiciones de página
export const PAGE_TRANSITION_CONFIG = {
  // Duración de la transición
  duration: 150,
  
  // Easing function
  easing: 'ease-out',
  
  // Estados de transición
  states: {
    entering: 'opacity-0 transform translate-y-2',
    entered: 'opacity-100 transform translate-y-0',
    exiting: 'opacity-0 transform translate-y-2',
  },
} as const;

// Utilidades para crear animaciones dinámicas
export const createAnimation = (
  type: keyof typeof ANIMATION_CONFIG.types,
  duration: keyof typeof ANIMATION_CONFIG.durations = 'normal',
  delay: keyof typeof ANIMATION_CONFIG.delays = 'none'
) => {
  return `animate-in ${ANIMATION_CONFIG.types[type]} duration-${ANIMATION_CONFIG.durations[duration]} delay-${ANIMATION_CONFIG.delays[delay]}`;
};

export const createTransition = (
  properties: string[] = ['all'],
  duration: keyof typeof ANIMATION_CONFIG.durations = 'normal'
) => {
  const propertyString = properties.join(', ');
  return `transition-${propertyString} duration-${ANIMATION_CONFIG.durations[duration]}`;
};

// Exportar configuración completa
export default {
  ANIMATION_CONFIG,
  ANIMATION_CLASSES,
  COMPONENT_ANIMATIONS,
  LOADING_CONFIG,
  NOTIFICATION_CONFIG,
  PAGE_TRANSITION_CONFIG,
  createAnimation,
  createTransition,
}; 