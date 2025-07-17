import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { LoginForm, RegisterForm, User, Achievement } from '@/types';
import apiService from '@/services/api';
import socketService from '@/services/socket';
import {
  saveUser as saveUserDb,
  findUserByUsername,
  findUserByEmail,
  newId as newUserId,
} from '@/localDb';

export interface FrontendUser extends User {
  avatarUrl?: string;
  redemptions?: Redemption[];
  xp?: number;
  level?: number;
  achievements: Achievement[]; // obligatorio
}

export interface Redemption {
  id: number;
  recompensa: string;
  puntos_gastados: number;
  fecha_canje: string;
}

interface AuthState {
  user: FrontendUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: FrontendUser; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: FrontendUser }
  | { type: 'UPDATE_AVATAR'; payload: string }
  | { type: 'ADD_REDEMPTION'; payload: Redemption }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: Achievement };

interface AuthContextType extends AuthState {
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  updateUser: (user: FrontendUser) => void;
  updateAvatar: (avatarUrl: string) => void;
  addRedemption: (redemption: Redemption) => void;
  clearError: () => void;
  addXP: (xp: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  addActivity: (activity: any) => void;
  getActivityLog: () => Promise<any[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_AVATAR':
      return {
        ...state,
        user: state.user ? { ...state.user, avatarUrl: action.payload } : null,
      };
    case 'ADD_REDEMPTION':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              redemptions: [
                ...(state.user.redemptions || []),
                action.payload,
              ],
            }
          : null,
      };
    case 'ADD_XP':
      return {
        ...state,
        user: state.user
          ? { ...state.user, xp: (state.user.xp || 0) + action.payload }
          : null,
      };
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              achievements: [
                ...(state.user.achievements || []),
                action.payload,
              ],
            }
          : null,
      };
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const verifyToken = async() => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token) {
        dispatch({ type: 'AUTH_FAILURE', payload: '' });
        return;
      }

      try {
        // Mock token verification for development
        if (process.env.NODE_ENV === 'development' || !process.env.VITE_API_URL) {
          if (userData) {
            const user = JSON.parse(userData);
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user, token },
            });
            return;
          } else {
            throw new Error('No user data found');
          }
        }

        // Real token verification
        const response = await apiService.get<User>('/auth/me');
        if (response.success && response.data) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: mapUserToFrontendUser(response.data), token },
          });
          socketService.connect(token);
        } else {
          throw new Error('Token inválido');
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'AUTH_FAILURE', payload: 'Token inválido' });
      }
    };

    verifyToken();

    // Escuchar expiración de sesión
    const handleSessionExpired = () => {
      dispatch({ type: 'AUTH_LOGOUT' });
      // Opcional: mostrar toast de expiración
      // showToast('Tu sesión ha expirado. Por favor inicia sesión de nuevo.', 'error');
    };
    window.addEventListener('session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('session-expired', handleSessionExpired);
    };
  }, []);

  const login = async(credentials: LoginForm) => {
    dispatch({ type: 'AUTH_START' });

    try {
      // Mock authentication for development
      if (process.env.NODE_ENV === 'development' || !process.env.VITE_API_URL) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Buscar usuario en base local
        const user = findUserByEmail(credentials.email) || findUserByUsername(credentials.email);
        if (!user) {
          throw new Error('Usuario o correo no encontrado.');
        }
        if (user.password !== credentials.password) {
          throw new Error('Contraseña incorrecta.');
        }
        // Adaptar a FrontendUser
        const frontendUser = {
          ...user,
          _id: user.id,
          firstName: (user as any).firstName || '',
          lastName: (user as any).lastName || '',
          role: 'admin' as const,
          rank: 999,
          isMVP: false,
          isGulagParticipant: false,
          xp: 0,
          level: 1,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
          achievements: Array.isArray((user as any).achievements) && typeof (user as any).achievements[0] === 'object' ? (user as any).achievements : [],
          badges: [],
          redemptions: [],
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(),
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(frontendUser));
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: frontendUser, token: mockToken },
        });
        return;
      }

      // Real authentication
      const response = await apiService.post<{ user: User; token: string }>(
        '/auth/login',
        credentials,
      );

      if (response.success && response.data) {
        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: mapUserToFrontendUser(user), token },
        });

        socketService.connect(token);
      } else {
        throw new Error(response.message || 'Error en el login');
      }
    } catch (error: any) {
      const errorMessage
        = error.response?.data?.message || error.message || 'Error en el login';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const register = async(userData: RegisterForm) => {
    dispatch({ type: 'AUTH_START' });

    try {
      // Mock registration for development
      if (process.env.NODE_ENV === 'development' || !process.env.VITE_API_URL) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Validar si el usuario ya existe
        if (findUserByUsername(userData.username)) {
          throw new Error('El nombre de usuario ya está en uso.');
        }
        if (findUserByEmail(userData.email)) {
          throw new Error('El correo electrónico ya está en uso.');
        }

        // Crear usuario real en base local
        const newUser = {
          id: newUserId(),
          username: userData.username,
          email: userData.email,
          password: userData.password, // En real, deberías hashear
          points: 0,
          streak: 0,
          accuracy: 0,
          vulnerabilities: [],
          purchases: [],
          clans: [],
          achievements: [],
          createdAt: new Date().toISOString(),
        };
        saveUserDb(newUser);

        // Crear FrontendUser para el contexto
        const frontendUser = {
          ...newUser,
          _id: newUser.id,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          role: 'member' as const,
          rank: 999,
          isMVP: false,
          isGulagParticipant: false,
          xp: 0,
          level: 1,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
          achievements: [],
          badges: [],
          redemptions: [],
          createdAt: new Date(newUser.createdAt),
          updatedAt: new Date(),
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(frontendUser));
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: frontendUser, token: mockToken },
        });
        return;
      }

      // Real registration
      const response = await apiService.post<{ user: User; token: string }>(
        '/auth/register',
        userData,
      );

      if (response.success && response.data) {
        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: mapUserToFrontendUser(user), token },
        });

        socketService.connect(token);
      } else {
        throw new Error(response.message || 'Error en el registro');
      }
    } catch (error: any) {
      const errorMessage
        = error.response?.data?.message
        || error.message
        || 'Error en el registro';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    socketService.disconnect();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const updateUser = (user: FrontendUser) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const updateAvatar = (avatarUrl: string) => {
    if (state.user) {
      const updatedUser = { ...state.user, avatarUrl };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_AVATAR', payload: avatarUrl });
    }
  };

  const addRedemption = async (redemption: Redemption) => {
    if (state.user && state.user._id) {
      try {
        await apiService.addUserRedemption(state.user._id, redemption);
      } catch (e) { /* manejar error si quieres */ }
    }
    if (state.user) {
      const updatedUser = {
        ...state.user,
        redemptions: [...(state.user.redemptions || []), redemption],
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'ADD_REDEMPTION', payload: redemption });
    }
  };

  const addXP = async (xp: number) => {
    if (state.user && state.user._id) {
      const newXP = (state.user.xp || 0) + xp;
      const newLevel = state.user.level || 1; // Aquí puedes poner lógica de subida de nivel
      
      // Solo hacer llamada al backend si no estamos en modo mock
      if (process.env.NODE_ENV !== 'development' && process.env.VITE_API_URL) {
        try {
          await apiService.updateUserXP(state.user._id, newXP, newLevel);
        } catch (e) { /* manejar error si quieres */ }
      }
    }
    dispatch({ type: 'ADD_XP', payload: xp });
  };
  
  const unlockAchievement = async (achievement: Achievement) => {
    if (state.user && state.user._id) {
      const achievements = [...(state.user.achievements || []), achievement];
      
      // Solo hacer llamada al backend si no estamos en modo mock
      if (process.env.NODE_ENV !== 'development' && process.env.VITE_API_URL) {
        try {
          await apiService.updateUserAchievements(state.user._id, achievements);
        } catch (e) { /* manejar error si quieres */ }
      }
    }
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievement });
  };

  const getActivityLog = async (): Promise<any[]> => {
    if (state.user && state.user._id) {
      // Solo hacer llamada al backend si no estamos en modo mock
      if (process.env.NODE_ENV !== 'development' && process.env.VITE_API_URL) {
        try {
          const res = await apiService.getUserActivity(state.user._id);
          return Array.isArray(res.data) ? res.data : [];
        } catch (e) { return []; }
      } else {
        // Mock activity log
        return [
          {
            _id: 'mock-1',
            type: 'vulnerability_resolved',
            description: 'Resolvió vulnerabilidad SQL Injection',
            points: 500,
            createdAt: new Date(),
          },
          {
            _id: 'mock-2',
            type: 'achievement_unlocked',
            description: 'Desbloqueó logro: Primer Bug',
            points: 50,
            createdAt: new Date(),
          }
        ];
      }
    }
    return [];
  };

  const addActivity = async (activity: any) => {
    if (state.user && state.user._id) {
      // Solo hacer llamada al backend si no estamos en modo mock
      if (process.env.NODE_ENV !== 'development' && process.env.VITE_API_URL) {
        try {
          await apiService.addUserActivity(state.user._id, activity);
        } catch (e) { /* manejar error si quieres */ }
      }
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    updateAvatar,
    addRedemption,
    clearError,
    addXP,
    unlockAchievement,
    addActivity,
    getActivityLog,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

function mapUserToFrontendUser(user: User): FrontendUser {
  return {
    ...user,
    achievements: (user as any).achievements || [],
    redemptions: (user as any).redemptions || [],
    xp: (user as any).xp || 0,
    level: (user as any).level || 1,
    avatarUrl: (user as any).avatarUrl || '',
  };
}
