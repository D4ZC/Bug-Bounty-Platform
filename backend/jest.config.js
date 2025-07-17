module.exports = {
  // Configuración del entorno de pruebas
  testEnvironment: 'node',
  
  // Directorios de pruebas
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/__tests__/**/*.js'
  ],
  
  // Archivos de configuración
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Directorios a ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/.git/',
    '/.idea/'
  ],
  
  // Configuración de cobertura
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js',
    '!src/app.js', // Archivo principal de la app
    '!src/server.js', // Archivo del servidor
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/tests/**'
  ],
  
  // Reportes de cobertura
  coverageReporters: [
    'text',
    'text-summary',
    'json',
    'html',
    'lcov'
  ],
  
  // Umbrales de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Directorio de cobertura
  coverageDirectory: 'coverage',
  
  // Configuración de transformaciones
  transform: {},
  
  // Configuración de módulos
  moduleFileExtensions: ['js', 'json'],
  
  // Configuración de timeouts
  testTimeout: 10000,
  
  // Configuración de verbose
  verbose: true,
  
  // Configuración de forceExit
  forceExit: true,
  
  // Configuración de clearMocks
  clearMocks: true,
  
  // Configuración de restoreMocks
  restoreMocks: true,
  
  // Configuración de resetMocks
  resetMocks: true,
  
  // Configuración de detectOpenHandles
  detectOpenHandles: true,
  
  // Configuración de maxWorkers
  maxWorkers: 1,
  
  // Configuración de bail
  bail: false,
  
  // Configuración de notify
  notify: false,
  
  // Configuración de collectCoverageOnlyFrom
  collectCoverageOnlyFrom: {
    'src/models/': true,
    'src/routes/': true,
    'src/services/': true,
    'src/utils/': true,
    'src/middleware/': true
  },
  
  // Configuración de coveragePathIgnorePatterns
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/coverage/',
    '/.git/',
    '/.idea/',
    'setup.js',
    'jest.config.js'
  ],
  
  // Configuración de testResultsProcessor
  testResultsProcessor: 'jest-sonar-reporter',
  
  // Configuración de reporters
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true
      }
    ]
  ],
  
  // Configuración de globals
  globals: {
    NODE_ENV: 'test'
  },
  
  // Configuración de projects (para diferentes tipos de tests)
  projects: [
    {
      displayName: 'unit',
      testMatch: [
        '<rootDir>/tests/**/*.test.js',
        '!<rootDir>/tests/integration/**',
        '!<rootDir>/tests/e2e/**'
      ]
    },
    {
      displayName: 'integration',
      testMatch: [
        '<rootDir>/tests/integration/**/*.test.js'
      ]
    },
    {
      displayName: 'e2e',
      testMatch: [
        '<rootDir>/tests/e2e/**/*.test.js'
      ]
    }
  ],
  
  // Configuración de watchPlugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  
  // Configuración de snapshotSerializers
  snapshotSerializers: [],
  
  // Configuración de testSequencer
  testSequencer: '<rootDir>/tests/sequencer.js',
  
  // Configuración de workerIdleMemoryLimit
  workerIdleMemoryLimit: '512MB',
  
  // Configuración de maxConcurrency
  maxConcurrency: 1,
  
  // Configuración de injectGlobals
  injectGlobals: true,
  
  // Configuración de extensionsToTreatAsEsm
  extensionsToTreatAsEsm: [],
  
  // Configuración de preset
  preset: null,
  
  // Configuración de roots
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  
  // Configuración de moduleDirectories
  moduleDirectories: ['node_modules', 'src'],
  
  // Configuración de moduleNameMapping
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  
  // Configuración de testEnvironmentOptions
  testEnvironmentOptions: {
    url: 'http://localhost:3001'
  },
  
  // Configuración de setupFiles
  setupFiles: ['<rootDir>/tests/setup.js'],
  
  // Configuración de globalSetup
  globalSetup: '<rootDir>/tests/globalSetup.js',
  
  // Configuración de globalTeardown
  globalTeardown: '<rootDir>/tests/globalTeardown.js',
  
  // Configuración de testRunner
  testRunner: 'jest-circus/runner',
  
  // Configuración de cache
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // Configuración de clearCache
  clearCache: false,
  
  // Configuración de findRelatedTests
  findRelatedTests: false,
  
  // Configuración de json
  json: false,
  
  // Configuración de lastCommit
  lastCommit: false,
  
  // Configuración de listTests
  listTests: false,
  
  // Configuración de logHeapUsage
  logHeapUsage: false,
  
  // Configuración de noStackTrace
  noStackTrace: false,
  
  // Configuración de onlyChanged
  onlyChanged: false,
  
  // Configuración de onlyFailures
  onlyFailures: false,
  
  // Configuración de passWithNoTests
  passWithNoTests: true,
  
  // Configuración de runInBand
  runInBand: false,
  
  // Configuración de showConfig
  showConfig: false,
  
  // Configuración de silent
  silent: false,
  
  // Configuración de updateSnapshot
  updateSnapshot: false,
  
  // Configuración de useStderr
  useStderr: false,
  
  // Configuración de watch
  watch: false,
  
  // Configuración de watchAll
  watchAll: false,
  
  // Configuración de watchman
  watchman: true
}; 