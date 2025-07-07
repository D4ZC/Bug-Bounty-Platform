// Configuración global para las pruebas
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;

// Configurar timeouts más largos para las pruebas
jest.setTimeout(30000);

// Limpiar la consola antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// Configurar variables globales para las pruebas
global.console = {
  ...console,
  // Silenciar logs durante las pruebas
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}; 