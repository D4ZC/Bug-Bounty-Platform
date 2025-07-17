import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestToken, createTestUser } from '../setup';

// Mock de la API
vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn(),
    put: vi.fn(),
    get: vi.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  }
}));

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Importar después de los mocks
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';

const mockApi = vi.mocked(api);

// Componente de prueba para usar el contexto
const TestComponent = () => {
  const { user, isLoggedIn, isLoading, login, logout, register } = useAuth();
  
  return (
    <div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="logged-in">{isLoggedIn.toString()}</div>
      <div data-testid="user">{user ? user.nombre : 'null'}</div>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => register({
        nombre: 'Test',
        apellidos: 'User',
        email: 'test@example.com',
        password: 'password'
      })}>Register</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  describe('Initial State', () => {
    it('should start with loading state', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('loading')).toHaveTextContent('true');
    });

    it('should start with not logged in state', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('logged-in')).toHaveTextContent('false');
    });

    it('should start with no user', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user')).toHaveTextContent('null');
    });
  });

  describe('Login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = createTestUser();
      const mockToken = createTestToken();

      mockApi.post.mockResolvedValue({
        data: {
          success: true,
          user: mockUser,
          token: mockToken
        }
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledWith('/auth/login', {
          email: 'test@example.com',
          password: 'password'
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('logged-in')).toHaveTextContent('true');
      });

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('Test');
      });
    });

    it('should handle login failure', async () => {
      mockApi.post.mockRejectedValue(new Error('Invalid credentials'));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledWith('/auth/login', {
          email: 'test@example.com',
          password: 'password'
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('logged-in')).toHaveTextContent('false');
      });
    });
  });

  describe('Logout', () => {
    it('should logout and clear user data', async () => {
      const mockUser = createTestUser();
      const mockToken = createTestToken();

      // First login
      mockApi.post.mockResolvedValue({
        data: {
          success: true,
          user: mockUser,
          token: mockToken
        }
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Login first
      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('logged-in')).toHaveTextContent('true');
      });

      // Then logout
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(screen.getByTestId('logged-in')).toHaveTextContent('false');
      });

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('null');
      });

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authUser');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    });
  });

  describe('Register', () => {
    it('should register successfully with valid data', async () => {
      const mockUser = createTestUser();
      const mockToken = createTestToken();

      mockApi.post.mockResolvedValue({
        data: {
          success: true,
          user: mockUser,
          token: mockToken
        }
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = screen.getByText('Register');
      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledWith('/auth/register', {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password',
          avatar: undefined
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('logged-in')).toHaveTextContent('true');
      });

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('Test');
      });
    });

    it('should handle registration failure', async () => {
      mockApi.post.mockRejectedValue(new Error('Registration failed'));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = screen.getByText('Register');
      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledWith('/auth/register', {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password',
          avatar: undefined
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('logged-in')).toHaveTextContent('false');
      });
    });
  });

  describe('Session Persistence', () => {
    it('should restore session from localStorage on mount', () => {
      const mockUser = createTestUser();
      const mockToken = createTestToken();

      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: mockUser })) // authUser
        .mockReturnValueOnce(mockToken); // authToken

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('logged-in')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('Test');
    });

    it('should handle invalid localStorage data', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('logged-in')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('null');
    });
  });

  describe('Profile Updates', () => {
    it('should update profile successfully', async () => {
      const mockUser = createTestUser();
      const updatedUser = { ...mockUser, nombre: 'Updated' };

      mockApi.put.mockResolvedValue({
        data: {
          success: true,
          user: updatedUser
        }
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // First login
      mockApi.post.mockResolvedValue({
        data: {
          success: true,
          user: mockUser,
          token: createTestToken()
        }
      });

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('logged-in')).toHaveTextContent('true');
      });

      // Update profile
      const { updateProfile } = useAuth();
      await updateProfile({ nombre: 'Updated' });

      await waitFor(() => {
        expect(mockApi.put).toHaveBeenCalledWith('/auth/profile', {
          nombre: 'Updated'
        });
      });
    });
  });
}); 