# Sistema de Tests Completo - Bug Bounty Platform

## 📋 Tabla de Contenidos

1. [Arquitectura del Sistema de Tests](#arquitectura-del-sistema-de-tests)
2. [Configuración](#configuración)
3. [Tipos de Tests](#tipos-de-tests)
4. [Backend Testing](#backend-testing)
5. [Frontend Testing](#frontend-testing)
6. [E2E Testing](#e2e-testing)
7. [Cobertura de Código](#cobertura-de-código)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Comandos de Test](#comandos-de-test)
10. [Debugging](#debugging)
11. [CI/CD Integration](#cicd-integration)

## 🏗️ Arquitectura del Sistema de Tests

### Estructura de Directorios

```
Bug-Bounty-Platform/
├── backend/
│   ├── tests/
│   │   ├── setup.js                 # Configuración global de tests
│   │   ├── models/                  # Tests de modelos
│   │   │   ├── User.test.js
│   │   │   ├── Team.test.js
│   │   │   ├── Vulnerability.test.js
│   │   │   ├── Challenge.test.js
│   │   │   ├── Chat.test.js
│   │   │   └── Log.test.js
│   │   ├── routes/                  # Tests de rutas
│   │   │   ├── auth.test.js
│   │   │   ├── users.test.js
│   │   │   ├── teams.test.js
│   │   │   ├── vulnerabilities.test.js
│   │   │   ├── challenges.test.js
│   │   │   ├── chat.test.js
│   │   │   ├── admin.test.js
│   │   │   └── logs.test.js
│   │   ├── services/                # Tests de servicios
│   │   │   ├── emailService.test.js
│   │   │   ├── chatService.test.js
│   │   │   └── logService.test.js
│   │   ├── integration/             # Tests de integración
│   │   │   ├── auth-flow.test.js
│   │   │   ├── chat-flow.test.js
│   │   │   └── admin-flow.test.js
│   │   └── e2e/                     # Tests end-to-end
│   │       ├── user-journey.test.js
│   │       └── admin-journey.test.js
│   └── jest.config.js               # Configuración de Jest
├── frontend/
│   ├── tests/
│   │   ├── setup.ts                 # Configuración global de tests
│   │   ├── components/              # Tests de componentes
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.test.tsx
│   │   │   ├── ui/
│   │   │   │   └── LoadingSpinner.test.tsx
│   │   │   └── layouts/
│   │   │       ├── AuthLayout.test.tsx
│   │   │       └── MainLayout.test.tsx
│   │   ├── contexts/                # Tests de contextos
│   │   │   ├── AuthContext.test.tsx
│   │   │   ├── LanguageContext.test.tsx
│   │   │   ├── ThemeContext.test.tsx
│   │   │   └── SocketContext.test.tsx
│   │   ├── hooks/                   # Tests de hooks
│   │   │   ├── useWebSocket.test.ts
│   │   │   └── useAuth.test.ts
│   │   ├── pages/                   # Tests de páginas
│   │   │   ├── auth/
│   │   │   │   ├── Login.test.tsx
│   │   │   │   └── Register.test.tsx
│   │   │   ├── Dashboard.test.tsx
│   │   │   ├── Profile.test.tsx
│   │   │   ├── Settings.test.tsx
│   │   │   ├── Chat.test.tsx
│   │   │   └── Admin.test.tsx
│   │   ├── services/                # Tests de servicios
│   │   │   └── api.test.ts
│   │   ├── utils/                   # Tests de utilidades
│   │   │   └── cn.test.ts
│   │   └── e2e/                     # Tests end-to-end
│   │       └── App.test.tsx
│   └── vitest.config.ts             # Configuración de Vitest
└── TESTING_SYSTEM.md                # Esta documentación
```

## ⚙️ Configuración

### Backend (Jest)

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testTimeout: 10000,
  verbose: true
};
```

### Frontend (Vitest)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
});
```

## 🧪 Tipos de Tests

### 1. Unit Tests
- **Propósito**: Probar funciones y métodos individuales
- **Alcance**: Una sola función o clase
- **Velocidad**: Muy rápidos
- **Ejemplo**: Validación de modelos, utilidades, hooks

### 2. Integration Tests
- **Propósito**: Probar interacción entre componentes
- **Alcance**: Múltiples funciones o módulos
- **Velocidad**: Rápidos
- **Ejemplo**: Flujos de autenticación, operaciones CRUD

### 3. E2E Tests
- **Propósito**: Probar flujos completos de usuario
- **Alcance**: Toda la aplicación
- **Velocidad**: Lentos
- **Ejemplo**: Registro → Login → Dashboard → Logout

## 🔧 Backend Testing

### Setup de Tests

```javascript
// tests/setup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
```

### Test de Modelos

```javascript
// tests/models/User.test.js
describe('User Model', () => {
  describe('Schema Validation', () => {
    it('should create a valid user with required fields', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        nickname: 'johndoe'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.firstName).toBe(userData.firstName);
      expect(savedUser.email).toBe(userData.email);
    });

    it('should require firstName', async () => {
      const userData = {
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        nickname: 'johndoe'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('Instance Methods', () => {
    it('should compare password correctly', async () => {
      const user = await createTestUser({ password: 'password123' });
      const isMatch = await user.comparePassword('password123');
      expect(isMatch).toBe(true);
    });

    it('should update points correctly', async () => {
      const user = await createTestUser({ points: 100 });
      await user.updatePoints(50);
      expect(user.points).toBe(150);
    });
  });
});
```

### Test de Rutas

```javascript
// tests/routes/auth.test.js
describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        nickname: 'johndoe'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });
});
```

### Helpers de Test

```javascript
// tests/setup.js
const createTestUser = async (userData = {}) => {
  const defaultUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'password123',
    nickname: 'testuser',
    role: 'member',
    isActive: true,
    points: 100
  };

  const userDataToSave = { ...defaultUser, ...userData };
  
  if (userDataToSave.password) {
    userDataToSave.password = await bcrypt.hash(userDataToSave.password, 10);
  }

  const user = new User(userDataToSave);
  await user.save();
  return user;
};

const createTestToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};
```

## 🎨 Frontend Testing

### Setup de Tests

```typescript
// tests/setup.ts
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock de react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
  Routes: ({ children }: { children: React.ReactNode }) => children,
  Route: ({ children }: { children: React.ReactNode }) => children,
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => 
    `<a href="${to}">${children}</a>`,
  Outlet: () => null
}));

// Mock de react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'es'
    }
  })
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
```

### Test de Componentes

```typescript
// tests/components/auth/ProtectedRoute.test.tsx
describe('ProtectedRoute', () => {
  it('should render children when user is authenticated', () => {
    const user = createTestUser();
    const authContextValue = {
      user,
      token: 'test-token',
      isAuthenticated: true,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      updateProfile: vi.fn(),
      changePassword: vi.fn(),
      loading: false
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={authContextValue}>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    const authContextValue = {
      user: null,
      token: null,
      isAuthenticated: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      updateProfile: vi.fn(),
      changePassword: vi.fn(),
      loading: false
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={authContextValue}>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
```

### Test de Contextos

```typescript
// tests/contexts/AuthContext.test.tsx
describe('AuthContext', () => {
  it('should login successfully', async () => {
    const user = createTestUser();
    const token = createTestToken(user);
    
    mockApi.post.mockResolvedValueOnce({
      data: {
        success: true,
        user,
        token
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(user));
    });
  });
});
```

### Test de Hooks

```typescript
// tests/hooks/useWebSocket.test.ts
describe('useWebSocket Hook', () => {
  it('should initialize socket connection on mount', () => {
    renderHook(() => useWebSocket(mockUser, mockToken));

    expect(mockSocketIO).toHaveBeenCalledWith('ws://localhost:3001', {
      auth: {
        token: mockToken
      },
      transports: ['websocket', 'polling']
    });
    expect(mockSocket.connect).toHaveBeenCalled();
  });

  it('should join chat successfully', () => {
    const { result } = renderHook(() => useWebSocket(mockUser, mockToken));
    const chatId = 'test-chat-id';

    act(() => {
      result.current.joinChat(chatId);
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('join_chat', { chatId });
  });
});
```

## 🌐 E2E Testing

### Test de Flujo Completo

```typescript
// tests/e2e/App.test.tsx
describe('App E2E Tests', () => {
  it('should complete full login flow', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    renderApp();

    // Should redirect to login
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    // Mock successful login
    mockApi.post.mockResolvedValueOnce({
      data: {
        success: true,
        user: mockUser,
        token: mockToken
      }
    });

    // Simulate login form submission
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockApi.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });
    });

    // Should redirect to dashboard after successful login
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
```

## 📊 Cobertura de Código

### Configuración de Cobertura

```javascript
// Backend - jest.config.js
collectCoverage: true,
collectCoverageFrom: [
  'src/**/*.js',
  '!src/**/*.test.js',
  '!src/**/*.spec.js',
  '!src/app.js',
  '!src/server.js',
  '!**/node_modules/**',
  '!**/coverage/**',
  '!**/tests/**'
],
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

```typescript
// Frontend - vitest.config.ts
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  exclude: [
    'node_modules/',
    'tests/',
    '**/*.d.ts',
    '**/*.config.*',
    '**/coverage/**',
    '**/dist/**'
  ],
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### Reportes de Cobertura

- **HTML**: `coverage/index.html` - Reporte visual detallado
- **JSON**: `coverage/coverage-final.json` - Datos para CI/CD
- **LCOV**: `coverage/lcov.info` - Compatible con herramientas externas
- **Text**: Salida en consola con resumen

## ✅ Mejores Prácticas

### 1. Nomenclatura de Tests

```javascript
// ✅ Bueno
describe('User Model', () => {
  describe('Schema Validation', () => {
    it('should create a valid user with required fields', async () => {
      // test
    });

    it('should require firstName', async () => {
      // test
    });
  });
});

// ❌ Malo
describe('User', () => {
  it('test1', async () => {
    // test
  });
});
```

### 2. Estructura AAA (Arrange, Act, Assert)

```javascript
it('should update user points correctly', async () => {
  // Arrange
  const user = await createTestUser({ points: 100 });
  
  // Act
  await user.updatePoints(50);
  
  // Assert
  expect(user.points).toBe(150);
});
```

### 3. Tests Aislados

```javascript
// ✅ Bueno - Cada test es independiente
beforeEach(async () => {
  // Limpiar base de datos antes de cada test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

// ❌ Malo - Tests dependen entre sí
let sharedUser;
beforeAll(async () => {
  sharedUser = await createTestUser();
});
```

### 4. Mocks y Stubs

```javascript
// ✅ Usar mocks para dependencias externas
vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

// ✅ Limpiar mocks después de cada test
afterEach(() => {
  vi.clearAllMocks();
});
```

### 5. Test Data Factories

```javascript
// ✅ Crear factories para datos de test
const createTestUser = (userData = {}) => {
  const defaultUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'password123',
    nickname: 'testuser'
  };
  
  return { ...defaultUser, ...userData };
};

// ✅ Usar en tests
it('should handle admin users', async () => {
  const adminUser = createTestUser({ role: 'admin' });
  // test
});
```

## 🚀 Comandos de Test

### Backend

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage

# Solo tests unitarios
npm run test:unit

# Solo tests de integración
npm run test:integration

# Solo tests E2E
npm run test:e2e

# Tests para CI/CD
npm run test:ci

# Debug de tests
npm run test:debug
```

### Frontend

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage

# UI de tests
npm run test:ui

# Solo tests unitarios
npm run test:unit

# Solo tests de integración
npm run test:integration

# Solo tests E2E
npm run test:e2e

# Tests para CI/CD
npm run test:ci

# Debug de tests
npm run test:debug
```

## 🐛 Debugging

### Backend Debugging

```bash
# Debug con Node.js inspector
npm run test:debug

# Debug específico de un archivo
node --inspect-brk node_modules/.bin/jest --runInBand tests/models/User.test.js

# Debug con console.log
NODE_ENV=test DEBUG=* npm test
```

### Frontend Debugging

```bash
# Debug con Vitest
npm run test:debug

# Debug específico de un archivo
npx vitest --inspect-brk tests/components/Login.test.tsx

# Debug con UI
npm run test:ui
```

### Debugging en VS Code

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/node_modules/.bin/jest",
      "args": ["--runInBand", "--no-cache"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Debug Frontend Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/vitest",
      "args": ["--run", "--inspect-brk"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: backend/package-lock.json
    
    - name: Install dependencies
      run: |
        cd backend
        npm ci
    
    - name: Run tests
      run: |
        cd backend
        npm run test:ci
      env:
        NODE_ENV: test
        MONGODB_URI: mongodb://localhost:27017/test
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: backend/coverage/lcov.info

  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Run tests
      run: |
        cd frontend
        npm run test:ci
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: frontend/coverage/lcov.info
```

### Docker Testing

```dockerfile
# Dockerfile.test
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tests/ ./tests/

# Instalar dependencias
RUN npm ci --only=production
RUN npm install --save-dev jest supertest mongodb-memory-server

# Copiar código fuente
COPY src/ ./src/

# Ejecutar tests
CMD ["npm", "run", "test:ci"]
```

## 📈 Métricas y Reportes

### SonarQube Integration

```javascript
// jest.config.js
module.exports = {
  // ... otras configuraciones
  testResultsProcessor: 'jest-sonar-reporter',
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
  ]
};
```

### Reportes Personalizados

```javascript
// tests/reporters/custom-reporter.js
class CustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log('=== Test Results Summary ===');
    console.log(`Total Tests: ${results.numTotalTests}`);
    console.log(`Passed: ${results.numPassedTests}`);
    console.log(`Failed: ${results.numFailedTests}`);
    console.log(`Coverage: ${results.coverageMap ? 'Available' : 'Not available'}`);
  }
}

module.exports = CustomReporter;
```

## 🔧 Mantenimiento

### Actualización de Tests

1. **Revisión Regular**: Revisar tests semanalmente
2. **Refactoring**: Actualizar tests cuando se refactoriza código
3. **Nuevas Features**: Agregar tests para nuevas funcionalidades
4. **Bug Fixes**: Agregar tests para bugs encontrados

### Performance

1. **Paralelización**: Usar workers para tests independientes
2. **Mocking**: Mockear servicios externos para velocidad
3. **Database**: Usar bases de datos en memoria para tests
4. **Caching**: Cachear dependencias entre runs

### Monitoreo

1. **Coverage Trends**: Monitorear tendencias de cobertura
2. **Test Duration**: Rastrear duración de tests
3. **Flaky Tests**: Identificar y arreglar tests inestables
4. **Performance**: Monitorear performance de tests

## 📚 Recursos Adicionales

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [React Testing Best Practices](https://reactjs.org/docs/testing.html)
- [Node.js Testing Best Practices](https://nodejs.org/en/docs/guides/testing-and-debugging/)

---

Este sistema de tests proporciona una base sólida para mantener la calidad del código y asegurar que la plataforma Bug Bounty funcione correctamente en todos los escenarios. 