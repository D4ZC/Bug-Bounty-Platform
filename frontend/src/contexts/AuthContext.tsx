import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, LoginForm, RegisterForm } from '@/types';
import socketService from '@/services/socket';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: User };

interface AuthContextType extends AuthState {
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  clearError: () => void;
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
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch({ type: 'AUTH_FAILURE', payload: '' });
      return;
    }
    // Simula usuario autenticado si hay token
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && token) {
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
    } else {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Token inválido' });
    }
  }, []);

  const login = async (credentials: LoginForm) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // Simulación de login
      const user = {
        _id: 'simulado',
        email: credentials.email,
        username: credentials.email.split('@')[0],
        firstName: 'Demo',
        lastName: 'User',
        role: 'member' as User['role'],
        points: 0,
        rank: 1,
        isMVP: false,
        isGulagParticipant: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        achievements: [],
        badges: [],
      };
      const token = 'simulated-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Error en el login' });
      throw error;
    }
  };

  const register = async (userData: RegisterForm) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // Simulación de registro
      const user = {
        _id: 'simulado',
        email: userData.email,
        username: userData.username,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        role: 'member' as User['role'],
        points: 0,
        rank: 1,
        isMVP: false,
        isGulagParticipant: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        achievements: [],
        badges: [],
      };
      const token = 'simulated-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Error en el registro' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    socketService.disconnect();
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const updateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'UPDATE_USER', payload: user });
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
    clearError,
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