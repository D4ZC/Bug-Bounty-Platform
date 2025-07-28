import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

interface AuthContextType extends AuthState {
  login: (credentials: LoginForm) => Promise<void>;
  register: (credentials: LoginForm) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
        dispatch({ type: 'AUTH_FAILURE', payload: 'Error al cargar sesión' });
      }
    } else {
      dispatch({ type: 'AUTH_FAILURE', payload: '' });
    }
  }, []);

  const login = async (credentials: LoginForm) => {
    dispatch({ type: 'AUTH_START' });

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verificar credenciales simuladas
    if (credentials.email === 'nicole@email.com' && credentials.password === '1234') {
      const user: User = {
        id: '1',
        email: 'nicole@email.com',
        name: 'Nicole Hunt'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'AUTH_FAILURE', payload: 'Credenciales incorrectas' });
      throw new Error('Credenciales incorrectas');
    }
  };

  const register = async (credentials: LoginForm) => {
    dispatch({ type: 'AUTH_START' });

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular registro exitoso (cualquier email/contraseña funciona)
    const user: User = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.email.split('@')[0] // Usar la parte del email como nombre
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'AUTH_SUCCESS', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
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