# Frontend Development Guide - Bug Bounty Platform

## Tecnologías

- **React**: 18.x
- **TypeScript**: 5.x
- **IBM Carbon Design System**: Para componentes UI
- **React Router**: Para navegación
- **Socket.io-client**: Para WebSocket
- **Axios**: Para llamadas a la API
- **React Query**: Para manejo de estado del servidor
- **Zustand**: Para manejo de estado global
- **React Hook Form**: Para formularios
- **Yup**: Para validación de esquemas

## Estructura del Proyecto

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── vulnerabilities/
│   │   ├── rankings/
│   │   ├── challenges/
│   │   ├── shop/
│   │   ├── contributions/
│   │   └── admin/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── utils/
│   ├── types/
│   ├── constants/
│   ├── styles/
│   └── App.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Configuración Inicial

### Instalación de Dependencias

```bash
npm install
```

### Variables de Entorno

Crear archivo `.env`:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_W3ID_CLIENT_ID=your-w3id-client-id
REACT_APP_ENVIRONMENT=development
```

### Scripts Disponibles

```bash
# Desarrollo
npm start

# Build de producción
npm run build

# Testing
npm test

# Linting
npm run lint

# Type checking
npm run type-check
```

## Componentes Principales

### Layout Components

#### Header
```tsx
import { Header } from '@carbon/react';

const AppHeader = () => {
  return (
    <Header aria-label="Bug Bounty Platform">
      <HeaderName href="/" prefix="IBM">
        Bug Bounty
      </HeaderName>
      <HeaderNavigation aria-label="Main Navigation">
        <HeaderMenuItem href="/dashboard">Dashboard</HeaderMenuItem>
        <HeaderMenuItem href="/vulnerabilities">Vulnerabilidades</HeaderMenuItem>
        <HeaderMenuItem href="/rankings">Rankings</HeaderMenuItem>
        <HeaderMenuItem href="/challenges">Retos</HeaderMenuItem>
        <HeaderMenuItem href="/shop">Tienda</HeaderMenuItem>
        <HeaderMenuItem href="/contributions">Contribuciones</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notifications">
          <Notification />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User Profile">
          <UserAvatar />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
```

#### Sidebar
```tsx
import { SideNav, SideNavItems, SideNavLink } from '@carbon/react';

const AppSidebar = () => {
  return (
    <SideNav aria-label="Side navigation" expanded={true}>
      <SideNavItems>
        <SideNavLink href="/dashboard" renderIcon={Dashboard}>
          Dashboard
        </SideNavLink>
        <SideNavLink href="/vulnerabilities" renderIcon={Security}>
          Vulnerabilidades
        </SideNavLink>
        <SideNavLink href="/rankings" renderIcon={ChartLine}>
          Rankings
        </SideNavLink>
        <SideNavLink href="/challenges" renderIcon={Trophy}>
          Retos
        </SideNavLink>
        <SideNavLink href="/shop" renderIcon={ShoppingCart}>
          Tienda
        </SideNavLink>
        <SideNavLink href="/contributions" renderIcon={Document}>
          Contribuciones
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};
```

### Authentication Components

#### Login Form
```tsx
import { useForm } from 'react-hook-form';
import { Button, TextInput, Form } from '@carbon/react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="w3id"
        labelText="W3ID"
        {...register('w3id', { required: 'W3ID es requerido' })}
        invalid={!!errors.w3id}
        invalidText={errors.w3id?.message}
      />
      <TextInput
        id="email"
        labelText="Email"
        type="email"
        {...register('email', { 
          required: 'Email es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido'
          }
        })}
        invalid={!!errors.email}
        invalidText={errors.email?.message}
      />
      <TextInput
        id="name"
        labelText="Nombre"
        {...register('name', { required: 'Nombre es requerido' })}
        invalid={!!errors.name}
        invalidText={errors.name?.message}
      />
      <Button type="submit" kind="primary">
        Iniciar Sesión
      </Button>
    </Form>
  );
};
```

### Dashboard Components

#### Stats Cards
```tsx
import { Tile, NumberInput } from '@carbon/react';

const StatsCard = ({ title, value, icon, trend }) => {
  return (
    <Tile>
      <div className="stats-card">
        <div className="stats-icon">{icon}</div>
        <div className="stats-content">
          <h3>{title}</h3>
          <NumberInput
            value={value}
            readOnly
            size="lg"
            className="stats-value"
          />
          {trend && (
            <span className={`stats-trend ${trend > 0 ? 'positive' : 'negative'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
      </div>
    </Tile>
  );
};
```

#### Recent Activity
```tsx
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';

const RecentActivity = ({ activities }) => {
  const headers = [
    { key: 'type', header: 'Tipo' },
    { key: 'description', header: 'Descripción' },
    { key: 'points', header: 'Puntos' },
    { key: 'date', header: 'Fecha' }
  ];

  return (
    <DataTable rows={activities} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};
```

### Vulnerability Components

#### Vulnerability List
```tsx
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Tag } from '@carbon/react';
import { useVulnerabilities } from '../hooks/useVulnerabilities';

const VulnerabilityList = () => {
  const { data: vulnerabilities, isLoading, error } = useVulnerabilities();

  const headers = [
    { key: 'title', header: 'Título' },
    { key: 'severity', header: 'Severidad' },
    { key: 'status', header: 'Estado' },
    { key: 'points', header: 'Puntos' },
    { key: 'assignedTeam', header: 'Equipo Asignado' },
    { key: 'actions', header: 'Acciones' }
  ];

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'red',
      high: 'magenta',
      medium: 'warm-gray',
      low: 'cool-gray'
    };
    return colors[severity] || 'cool-gray';
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <DataTable rows={vulnerabilities} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map(cell => {
                  if (cell.info.header === 'severity') {
                    return (
                      <TableCell key={cell.id}>
                        <Tag type={getSeverityColor(cell.value)}>
                          {cell.value}
                        </Tag>
                      </TableCell>
                    );
                  }
                  return <TableCell key={cell.id}>{cell.value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};
```

#### Vulnerability Detail
```tsx
import { Tile, Button, Tag, TextArea, FileUploader } from '@carbon/react';
import { useVulnerability } from '../hooks/useVulnerability';

const VulnerabilityDetail = ({ id }) => {
  const { data: vulnerability, isLoading, error } = useVulnerability(id);
  const { resolveVulnerability } = useVulnerabilities();

  const handleResolve = async (resolutionData) => {
    try {
      await resolveVulnerability(id, resolutionData);
    } catch (error) {
      console.error('Error resolving vulnerability:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="vulnerability-detail">
      <Tile>
        <h2>{vulnerability.title}</h2>
        <div className="vulnerability-meta">
          <Tag type={getSeverityColor(vulnerability.severity)}>
            {vulnerability.severity}
          </Tag>
          <Tag type={getStatusColor(vulnerability.status)}>
            {vulnerability.status}
          </Tag>
          <span className="points">{vulnerability.points} puntos</span>
        </div>
        <p>{vulnerability.description}</p>
        
        <div className="vulnerability-actions">
          {vulnerability.status === 'open' && (
            <Button onClick={() => setShowResolveModal(true)}>
              Marcar como Resuelta
            </Button>
          )}
        </div>
      </Tile>
    </div>
  );
};
```

### Ranking Components

#### Ranking Table
```tsx
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';
import { useRankings } from '../hooks/useRankings';

const RankingTable = ({ type = 'users' }) => {
  const { data: rankings, isLoading } = useRankings(type);

  const getRankColor = (rank, total) => {
    if (rank === 1) return 'green';
    if (rank <= 10) return 'blue';
    if (rank <= Math.floor(total / 2)) return 'orange';
    return 'black';
  };

  return (
    <DataTable rows={rankings} headers={getHeaders(type)}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow 
                {...getRowProps({ row })}
                className={`rank-${getRankColor(index + 1, rankings.length)}`}
              >
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};
```

### Challenge Components

#### Challenge Card
```tsx
import { Tile, Button, Tag, ProgressBar } from '@carbon/react';
import { useChallenge } from '../hooks/useChallenge';

const ChallengeCard = ({ challenge }) => {
  const { joinChallenge, leaveChallenge } = useChallenges();
  const { user } = useAuth();

  const isParticipant = challenge.participants.some(
    p => p.userId === user.id || p.teamId === user.teamId
  );

  const canJoin = !isParticipant && challenge.status === 'pending';
  const canLeave = isParticipant && challenge.status === 'pending';

  return (
    <Tile className="challenge-card">
      <div className="challenge-header">
        <h3>{challenge.title}</h3>
        <Tag type={getCategoryColor(challenge.category)}>
          {challenge.category}
        </Tag>
      </div>
      
      <p>{challenge.description}</p>
      
      <div className="challenge-details">
        <div className="detail">
          <span>Entrada:</span>
          <span>{challenge.config.entryCost} puntos</span>
        </div>
        <div className="detail">
          <span>Duración:</span>
          <span>{challenge.config.duration} horas</span>
        </div>
        <div className="detail">
          <span>Participantes:</span>
          <span>{challenge.participants.length}/{challenge.config.maxParticipants}</span>
        </div>
      </div>

      {challenge.status === 'active' && (
        <div className="challenge-progress">
          <ProgressBar 
            value={challenge.progress} 
            label="Progreso del reto"
          />
          <span>Tiempo restante: {challenge.timeRemaining}h</span>
        </div>
      )}

      <div className="challenge-actions">
        {canJoin && (
          <Button onClick={() => joinChallenge(challenge.id)}>
            Unirse
          </Button>
        )}
        {canLeave && (
          <Button kind="danger" onClick={() => leaveChallenge(challenge.id)}>
            Salir
          </Button>
        )}
        <Button kind="ghost" href={`/challenges/${challenge.id}`}>
          Ver Detalles
        </Button>
      </div>
    </Tile>
  );
};
```

### Shop Components

#### Shop Item Card
```tsx
import { Tile, Button, Tag } from '@carbon/react';
import { useShop } from '../hooks/useShop';

const ShopItemCard = ({ item }) => {
  const { purchaseItem } = useShop();
  const { user } = useAuth();

  const canAfford = user.points >= item.price.points;
  const isMvpItem = item.category === 'mvp';
  const hasMvpAccess = user.isCurrentMvp || user.team?.isCurrentMvp;

  const handlePurchase = async () => {
    try {
      await purchaseItem(item.id);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <Tile className="shop-item-card">
      <div className="item-image">
        <img src={item.assets.image} alt={item.name} />
        {isMvpItem && <Tag type="purple">MVP</Tag>}
      </div>
      
      <div className="item-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        
        <div className="item-price">
          {item.price.bluePoints > 0 ? (
            <span className="blue-points">{item.price.bluePoints} Blue Points</span>
          ) : (
            <span className="points">{item.price.points} puntos</span>
          )}
        </div>

        <div className="item-actions">
          {isMvpItem && !hasMvpAccess ? (
            <Button disabled>Acceso MVP Requerido</Button>
          ) : !canAfford ? (
            <Button disabled>Puntos Insuficientes</Button>
          ) : (
            <Button onClick={handlePurchase}>
              Comprar
            </Button>
          )}
        </div>
      </div>
    </Tile>
  );
};
```

## Hooks Personalizados

### useAuth
```tsx
import { create } from 'zustand';
import { api } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (userData) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...userData } });
    }
  }
}));
```

### useWebSocket
```tsx
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export const useWebSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      socketRef.current = io(process.env.REACT_APP_WS_URL!, {
        auth: { token }
      });

      socketRef.current.on('connect', () => {
        console.log('WebSocket connected');
      });

      socketRef.current.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [isAuthenticated, token]);

  const emit = (event: string, data?: any) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const off = (event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event);
    }
  };

  return { emit, on, off, connected: !!socketRef.current?.connected };
};
```

## Servicios

### API Service
```tsx
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };
```

### Vulnerability Service
```tsx
import { api } from './api';

export const vulnerabilityService = {
  getAll: (params?: any) => 
    api.get('/vulnerabilities', { params }),

  getById: (id: string) => 
    api.get(`/vulnerabilities/${id}`),

  create: (data: CreateVulnerabilityData) => 
    api.post('/vulnerabilities', data),

  resolve: (id: string, data: ResolveVulnerabilityData) => 
    api.put(`/vulnerabilities/${id}/resolve`, data),

  addComment: (id: string, data: { content: string }) => 
    api.post(`/vulnerabilities/${id}/comments`, data),

  uploadAttachment: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/vulnerabilities/${id}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};
```

## Estilos

### Variables CSS
```css
:root {
  /* Colores de IBM Carbon */
  --cds-interactive-01: #0f62fe;
  --cds-interactive-02: #393939;
  --cds-interactive-03: #0f62fe;
  --cds-interactive-04: #0f62fe;
  
  /* Colores de ranking */
  --rank-green: #24a148;
  --rank-blue: #0043ce;
  --rank-orange: #ff832b;
  --rank-black: #525252;
  
  /* Colores de severidad */
  --severity-critical: #da1e28;
  --severity-high: #ff832b;
  --severity-medium: #f1c21b;
  --severity-low: #24a148;
  
  /* Espaciado */
  --spacing-01: 0.125rem;
  --spacing-02: 0.25rem;
  --spacing-03: 0.5rem;
  --spacing-04: 0.75rem;
  --spacing-05: 1rem;
  --spacing-06: 1.5rem;
  --spacing-07: 2rem;
  --spacing-08: 2.5rem;
  --spacing-09: 3rem;
  --spacing-10: 4rem;
  --spacing-11: 5rem;
  --spacing-12: 6rem;
  --spacing-13: 10rem;
}
```

### Componentes de Estilo
```css
/* Stats Card */
.stats-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-05);
}

.stats-icon {
  font-size: 2rem;
  color: var(--cds-interactive-01);
}

.stats-content h3 {
  margin: 0;
  font-size: 0.875rem;
  color: var(--cds-text-secondary);
}

.stats-value {
  font-size: 2rem;
  font-weight: 400;
  margin: var(--spacing-02) 0;
}

.stats-trend {
  font-size: 0.875rem;
  font-weight: 400;
}

.stats-trend.positive {
  color: var(--rank-green);
}

.stats-trend.negative {
  color: var(--severity-critical);
}

/* Ranking Colors */
.rank-green {
  background-color: var(--rank-green);
  color: white;
}

.rank-blue {
  background-color: var(--rank-blue);
  color: white;
}

.rank-orange {
  background-color: var(--rank-orange);
  color: white;
}

.rank-black {
  background-color: var(--rank-black);
  color: white;
}

/* Challenge Card */
.challenge-card {
  border: 1px solid var(--cds-ui-03);
  border-radius: 4px;
  padding: var(--spacing-05);
  transition: box-shadow 0.2s ease;
}

.challenge-card:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.challenge-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-04);
}

.challenge-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-04);
  margin: var(--spacing-05) 0;
}

.detail {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.challenge-progress {
  margin: var(--spacing-05) 0;
}

.challenge-actions {
  display: flex;
  gap: var(--spacing-03);
  margin-top: var(--spacing-05);
}

/* Shop Item Card */
.shop-item-card {
  border: 1px solid var(--cds-ui-03);
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.shop-item-card:hover {
  transform: translateY(-2px);
}

.item-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  padding: var(--spacing-05);
}

.item-price {
  font-size: 1.25rem;
  font-weight: 600;
  margin: var(--spacing-04) 0;
}

.blue-points {
  color: var(--cds-interactive-01);
}

.points {
  color: var(--cds-text-primary);
}

.item-actions {
  margin-top: var(--spacing-05);
}
```

## Testing

### Component Testing
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../components/auth/LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText('W3ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('W3ID es requerido')).toBeInTheDocument();
    expect(await screen.findByText('Email es requerido')).toBeInTheDocument();
    expect(await screen.findByText('Nombre es requerido')).toBeInTheDocument();
  });
});
```

### Hook Testing
```tsx
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with no user', () => {
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should login user', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login({
        w3id: 'test-w3id',
        email: 'test@example.com',
        name: 'Test User'
      });
    });
    
    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

## Performance

### Code Splitting
```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Vulnerabilities = lazy(() => import('./pages/Vulnerabilities'));
const Rankings = lazy(() => import('./pages/Rankings'));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/rankings" element={<Rankings />} />
      </Routes>
    </Suspense>
  );
};
```

### Memoización
```tsx
import { memo, useMemo, useCallback } from 'react';

const VulnerabilityList = memo(({ vulnerabilities, onResolve }) => {
  const sortedVulnerabilities = useMemo(() => {
    return vulnerabilities.sort((a, b) => b.points - a.points);
  }, [vulnerabilities]);

  const handleResolve = useCallback((id) => {
    onResolve(id);
  }, [onResolve]);

  return (
    <div>
      {sortedVulnerabilities.map(vuln => (
        <VulnerabilityCard 
          key={vuln.id} 
          vulnerability={vuln}
          onResolve={handleResolve}
        />
      ))}
    </div>
  );
});
```

## Accesibilidad

### ARIA Labels
```tsx
const SearchBar = () => {
  return (
    <Search
      labelText="Buscar vulnerabilidades"
      placeholder="Buscar por título, descripción..."
      aria-label="Buscar vulnerabilidades"
    />
  );
};
```

### Keyboard Navigation
```tsx
const VulnerabilityCard = ({ vulnerability, onResolve }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onResolve(vulnerability.id);
    }
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={() => onResolve(vulnerability.id)}
      onKeyPress={handleKeyPress}
      aria-label={`Resolver vulnerabilidad: ${vulnerability.title}`}
    >
      {/* Card content */}
    </div>
  );
};
```

## Internacionalización

### Configuración i18n
```tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'vulnerabilities.title': 'Vulnerabilities',
      'vulnerabilities.resolve': 'Resolve',
      'rankings.title': 'Rankings',
      'challenges.title': 'Challenges'
    }
  },
  es: {
    translation: {
      'vulnerabilities.title': 'Vulnerabilidades',
      'vulnerabilities.resolve': 'Resolver',
      'rankings.title': 'Rankings',
      'challenges.title': 'Retos'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### Uso en Componentes
```tsx
import { useTranslation } from 'react-i18next';

const VulnerabilityList = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('vulnerabilities.title')}</h1>
      <Button>{t('vulnerabilities.resolve')}</Button>
    </div>
  );
};
``` 