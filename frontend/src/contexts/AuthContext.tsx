import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { LoginForm, RegisterForm, User } from '@/types';
import apiService from '@/services/api';
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
    const verifyToken = async() => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch({ type: 'AUTH_FAILURE', payload: '' });
        return;
      }

      try {
        const response = await apiService.get<User>('/auth/me');
        if (response.success && response.data) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: response.data, token },
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
  }, []);

  const login = async(credentials: LoginForm) => {
    dispatch({ type: 'AUTH_START' });

    try {
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
          payload: { user, token },
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
          payload: { user, token },
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
