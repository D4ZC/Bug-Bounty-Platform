// Constantes de la aplicación
export const APP_NAME = 'Bug Bounty Platform';
export const APP_VERSION = '1.0.0';

// Constantes de severidad
export const SEVERITY_LEVELS = {
  CRITIC: 'Critic',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

export const SEVERITY_COLORS = {
  [SEVERITY_LEVELS.CRITIC]: 'text-red-600 bg-red-100',
  [SEVERITY_LEVELS.HIGH]: 'text-orange-600 bg-orange-100',
  [SEVERITY_LEVELS.MEDIUM]: 'text-yellow-600 bg-yellow-100',
  [SEVERITY_LEVELS.LOW]: 'text-green-600 bg-green-100',
} as const;

// Constantes de estado
export const STATUS_LEVELS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
} as const;

export const STATUS_COLORS = {
  [STATUS_LEVELS.OPEN]: 'text-red-600 bg-red-100',
  [STATUS_LEVELS.IN_PROGRESS]: 'text-blue-600 bg-blue-100',
  [STATUS_LEVELS.RESOLVED]: 'text-green-600 bg-green-100',
  [STATUS_LEVELS.CLOSED]: 'text-gray-600 bg-gray-100',
} as const;

// Constantes de dificultad
export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
} as const;

export const DIFFICULTY_COLORS = {
  [DIFFICULTY_LEVELS.EASY]: 'text-green-600 bg-green-100',
  [DIFFICULTY_LEVELS.MEDIUM]: 'text-yellow-600 bg-yellow-100',
  [DIFFICULTY_LEVELS.HARD]: 'text-red-600 bg-red-100',
} as const;

// Constantes de rutas
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  VULNERABILITIES: '/vulnerabilities',
  CHALLENGES: '/challenges',
  SHOP: '/shop',
  CONTRIBUTIONS: '/contributions',
  PROFILE: '/profile',
  TEAM: '/team',
  GULAG: '/gulag',
  MVP: '/mvp',
  DUELS: '/duels',
  SCORE: '/score',
  RULES: '/rules',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
} as const;

// Constantes de API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/update',
    SCORE: '/api/users/score',
  },
  TEAMS: {
    LIST: '/api/teams',
    DETAILS: '/api/teams/:id',
    SCORE: '/api/teams/:id/score',
  },
  VULNERABILITIES: {
    LIST: '/api/vulnerabilities',
    CREATE: '/api/vulnerabilities',
    UPDATE: '/api/vulnerabilities/:id',
    DELETE: '/api/vulnerabilities/:id',
  },
  CONTRIBUTIONS: {
    LIST: '/api/contributions',
    CREATE: '/api/contributions',
    UPDATE: '/api/contributions/:id',
    DELETE: '/api/contributions/:id',
  },
} as const;

// Constantes de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Constantes de tiempo
export const TIME = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 4000,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
} as const;

// Constantes de validación
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  ALLOWED_FILE_TYPES: ['pdf', 'doc', 'docx', 'txt', 'md'],
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const; 