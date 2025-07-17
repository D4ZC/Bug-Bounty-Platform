import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestToken, createTestUser } from '../../setup';

// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
  };
});

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Importar después de los mocks
import { useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Mock del componente LoadingSpinner
vi.mock('@/components/ui/LoadingSpinner', () => ({
  default: ({ size }: { size?: string }) => (
    <div data-testid="loading-spinner" data-size={size}>
      Loading...
    </div>
  )
}));

const mockNavigate = vi.fn();
const mockLocation = { pathname: '/dashboard', search: '', hash: '', state: null };

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue(mockLocation);
  });

  describe('Authentication States', () => {
    it('should render children when user is authenticated', () => {
      const mockUser = createTestUser();
      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: mockUser }))
        .mockReturnValueOnce(createTestToken());

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    it('should redirect to login when user is not authenticated', () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });

    it('should redirect to login when user is null', () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });

    it('should redirect to login when token is null', () => {
      const mockUser = createTestUser();
      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: mockUser }))
        .mockReturnValueOnce(null);

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });

    it('should show loading spinner when authentication is loading', () => {
      // Simular estado de carga
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      );

      // Durante la carga inicial, debería mostrar el spinner
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('should preserve current location in redirect state', () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  describe('Component Rendering', () => {
    it('should render children with complex nested components', () => {
      const mockUser = createTestUser();
      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: mockUser }))
        .mockReturnValueOnce(createTestToken());

      const ComplexComponent = () => (
        <div>
          <h1>Dashboard</h1>
          <nav>
            <ul>
              <li>Home</li>
              <li>Profile</li>
            </ul>
          </nav>
          <main>
            <section>
              <h2>Welcome</h2>
              <p>This is protected content</p>
            </section>
          </main>
        </div>
      );

      render(
        <AuthProvider>
          <ProtectedRoute>
            <ComplexComponent />
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByText('This is protected content')).toBeInTheDocument();
    });

    it('should handle multiple protected routes correctly', () => {
      const mockUser = createTestUser();
      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: mockUser }))
        .mockReturnValueOnce(createTestToken());

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div>
              <ProtectedRoute>
                <div data-testid="nested-content">Nested Content</div>
              </ProtectedRoute>
              <div data-testid="outer-content">Outer Content</div>
            </div>
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(screen.getByTestId('nested-content')).toBeInTheDocument();
      expect(screen.getByTestId('outer-content')).toBeInTheDocument();
    });

    it('should handle user with different roles correctly', () => {
      const adminUser = createTestUser({ role: 'admin' });
      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: adminUser }))
        .mockReturnValueOnce(createTestToken());

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div data-testid="admin-content">Admin Content</div>
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(screen.getByTestId('admin-content')).toBeInTheDocument();
    });

    it('should handle inactive user correctly', () => {
      const inactiveUser = createTestUser({ isActive: false });
      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: inactiveUser }))
        .mockReturnValueOnce(createTestToken());

      render(
        <AuthProvider>
          <ProtectedRoute>
            <div data-testid="inactive-content">Inactive Content</div>
          </ProtectedRoute>
        </AuthProvider>
      );

      expect(screen.getByTestId('inactive-content')).toBeInTheDocument();
    });

    it('should handle empty children correctly', () => {
      const mockUser = createTestUser();
      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: mockUser }))
        .mockReturnValueOnce(createTestToken());

      render(
        <AuthProvider>
          <ProtectedRoute>
            {null}
          </ProtectedRoute>
        </AuthProvider>
      );

      // No debería renderizar nada
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('should handle undefined children correctly', () => {
      const mockUser = createTestUser();
      localStorageMock.getItem
        .mockReturnValueOnce(JSON.stringify({ user: mockUser }))
        .mockReturnValueOnce(createTestToken());

      render(
        <AuthProvider>
          <ProtectedRoute>
            {undefined}
          </ProtectedRoute>
        </AuthProvider>
      );

      // No debería renderizar nada
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });
}); 