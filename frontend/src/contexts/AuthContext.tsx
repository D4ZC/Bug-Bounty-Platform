import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';

// Tipos de rango y sus insignias
const RANKS = [
  { name: 'Bronce', icon: '🥉' },
  { name: 'Plata', icon: '🥈' },
  { name: 'Oro', icon: '🥇' },
  { name: 'Platino', icon: '💎' },
  { name: 'Diamante', icon: '🔷' },
];

export interface AuthUser {
  _id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  nickname: string;
  avatar?: string;
  rango: string;
  rangoIcon: string;
  role?: string;
  preferences?: {
    language: 'es' | 'en';
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      push: boolean;
      challenges: boolean;
      gulag: boolean;
    };
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: Omit<AuthUser, 'rango' | 'rangoIcon' | 'nickname'> & { password: string; avatar?: string }) => Promise<boolean>;
  updateProfile: (data: Partial<AuthUser>) => Promise<boolean>;
  changePassword: (oldPass: string, newPass: string) => Promise<boolean>;
  updateNotificationPreferences: (preferences: AuthUser['preferences']['notifications']) => Promise<boolean>;
  password: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  updateProfile: async () => false,
  changePassword: async () => false,
  updateNotificationPreferences: async () => false,
  password: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState<string | null>(null);

  // Cargar sesión de localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('authUser');
      const token = localStorage.getItem('authToken');
      
      if (stored && token) {
        const parsed = JSON.parse(stored);
        if (parsed.user) {
          setUser(parsed.user);
          setIsLoggedIn(true);
          
          // Configurar token en axios
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar sesión en localStorage
  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn && user) {
        localStorage.setItem('authUser', JSON.stringify({ user }));
      } else if (!isLoggedIn) {
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
      }
    }
  }, [isLoggedIn, user, isLoading]);

  // Login con backend
  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const response: any = await api.post('/auth/login', { email, password: pass });
      
      if (response.data.success) {
        const { user: userData, token } = response.data;
        
        // Configurar token
        localStorage.setItem('authToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(userData);
        setIsLoggedIn(true);
        setPassword(pass);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setPassword(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  };

  // Registro con backend
  const register = async (data: Omit<AuthUser, 'rango' | 'rangoIcon' | 'nickname'> & { password: string; avatar?: string }): Promise<boolean> => {
    try {
      const response: any = await api.post('/auth/register', {
        firstName: data.nombre,
        lastName: data.apellidos,
        email: data.email,
        password: data.password,
        confirmPassword: data.password, // Confirmar contraseña igual
        teamId: '000000000000000000000000', // Dummy ObjectId válido
        avatar: data.avatar
      });
      
      if (response.data.success) {
        const { user: userData, token } = response.data;
        
        // Configurar token
        localStorage.setItem('authToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser(userData);
        setIsLoggedIn(true);
        setPassword(data.password);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  // Actualizar perfil con backend
  const updateProfile = async (data: Partial<AuthUser>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const response: any = await api.put('/auth/profile', data);
      
      if (response.data.success) {
        const updatedUser = { ...user, ...response.data.user };
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  // Cambiar contraseña con backend
  const changePassword = async (oldPass: string, newPass: string): Promise<boolean> => {
    try {
      const response: any = await api.put('/auth/change-password', {
        currentPassword: oldPass,
        newPassword: newPass
      });
      
      if (response.data.success) {
        setPassword(newPass);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    }
  };

  // Actualizar preferencias de notificaciones
  const updateNotificationPreferences = async (notifications: any): Promise<boolean> => {
    if (!user) return false;
    try {
      const response: any = await api.put('/auth/profile', {
        preferences: {
          ...(user.preferences || {}),
          notifications
        }
      });
      if (response.data.success) {
        const updatedUser = {
          ...user,
          preferences: {
            ...(user.preferences || {}),
            notifications
          }
        };
        setUser(updatedUser as AuthUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update notification preferences error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      isLoading, 
      login, 
      logout, 
      register, 
      updateProfile, 
      changePassword,
      updateNotificationPreferences,
      password 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 