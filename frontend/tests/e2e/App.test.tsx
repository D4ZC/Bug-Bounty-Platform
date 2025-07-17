import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { createTestUser, createTestToken } from '../setup';

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null })
  };
});

// Mock de react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'es'
    }
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn()
  }
}));

// Mock de la API
const mockApi = vi.mocked(require('@/services/api').default);

// Mock de socket.io-client
vi.mock('socket.io-client', () => ({
  default: vi.fn(() => ({
    on: vi.fn(),
    emit: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn(),
    connected: true
  }))
}));

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App E2E Tests', () => {
  const mockUser = createTestUser();
  const mockToken = createTestToken(mockUser);

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderApp = () => {
    return render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

  describe('Initial Load', () => {
    it('should redirect to login when not authenticated', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      renderApp();

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });

    it('should load dashboard when authenticated', async () => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));

      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
    });

    it('should show loading spinner during initialization', () => {
      localStorageMock.getItem.mockReturnValue(null);

      renderApp();

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('Authentication Flow', () => {
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
      const loginForm = screen.getByRole('form');
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

    it('should complete full registration flow', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      renderApp();

      // Navigate to register page
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });

      // Mock successful registration
      mockApi.post.mockResolvedValueOnce({
        data: {
          success: true,
          user: mockUser,
          token: mockToken
        }
      });

      // Simulate registration form submission
      const registerForm = screen.getByRole('form');
      const firstNameInput = screen.getByLabelText('Nombre');
      const lastNameInput = screen.getByLabelText('Apellido');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const confirmPasswordInput = screen.getByLabelText('Confirmar Contraseña');
      const nicknameInput = screen.getByLabelText('Nickname');
      const submitButton = screen.getByRole('button', { name: 'Registrarse' });

      fireEvent.change(firstNameInput, { target: { value: 'Test' } });
      fireEvent.change(lastNameInput, { target: { value: 'User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.change(nicknameInput, { target: { value: 'testuser' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledWith('/auth/register', {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          nickname: 'testuser'
        });
      });

      // Should redirect to dashboard after successful registration
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should handle logout flow', async () => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));

      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      // Mock successful logout
      mockApi.post.mockResolvedValueOnce({
        data: {
          success: true,
          message: 'Sesión cerrada exitosamente'
        }
      });

      // Open user menu and click logout
      const userMenuButton = screen.getByLabelText('Menú de usuario');
      fireEvent.click(userMenuButton);

      const logoutButton = screen.getByText('Cerrar Sesión');
      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledWith('/auth/logout');
      });

      // Should redirect to login after logout
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));
    });

    it('should navigate between main pages', async () => {
      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      // Navigate to Challenges
      const challengesLink = screen.getByText('Retos');
      fireEvent.click(challengesLink);

      await waitFor(() => {
        expect(screen.getByText('Retos')).toBeInTheDocument();
      });

      // Navigate to Vulnerabilities
      const vulnerabilitiesLink = screen.getByText('Vulnerabilidades');
      fireEvent.click(vulnerabilitiesLink);

      await waitFor(() => {
        expect(screen.getByText('Vulnerabilidades')).toBeInTheDocument();
      });

      // Navigate to Teams
      const teamsLink = screen.getByText('Equipos');
      fireEvent.click(teamsLink);

      await waitFor(() => {
        expect(screen.getByText('Equipos')).toBeInTheDocument();
      });

      // Navigate to Chat
      const chatLink = screen.getByText('Chat');
      fireEvent.click(chatLink);

      await waitFor(() => {
        expect(screen.getByText('Chat')).toBeInTheDocument();
      });

      // Navigate to Profile
      const profileLink = screen.getByText('Perfil');
      fireEvent.click(profileLink);

      await waitFor(() => {
        expect(screen.getByText('Perfil')).toBeInTheDocument();
      });

      // Navigate to Settings
      const settingsLink = screen.getByText('Configuración');
      fireEvent.click(settingsLink);

      await waitFor(() => {
        expect(screen.getByText('Configuración')).toBeInTheDocument();
      });
    });

    it('should show admin navigation for admin users', async () => {
      const adminUser = { ...mockUser, role: 'admin' };
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(adminUser));

      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      // Should show admin links
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Logs')).toBeInTheDocument();
    });

    it('should not show admin navigation for regular users', async () => {
      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      // Should not show admin links
      expect(screen.queryByText('Admin')).not.toBeInTheDocument();
      expect(screen.queryByText('Logs')).not.toBeInTheDocument();
    });
  });

  describe('Dashboard', () => {
    beforeEach(() => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));
    });

    it('should load dashboard with user stats', async () => {
      // Mock API responses
      mockApi.get
        .mockResolvedValueOnce({
          data: {
            success: true,
            stats: {
              totalPoints: 1000,
              rank: 'Experto',
              rankIcon: '🥇',
              vulnerabilitiesReported: 15,
              challengesCompleted: 8
            }
          }
        })
        .mockResolvedValueOnce({
          data: {
            success: true,
            teams: []
          }
        })
        .mockResolvedValueOnce({
          data: {
            success: true,
            challenges: []
          }
        });

      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      // Should display user stats
      await waitFor(() => {
        expect(screen.getByText('1000')).toBeInTheDocument();
        expect(screen.getByText('Experto')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
      });
    });

    it('should load dashboard with team stats', async () => {
      const mockTeams = [
        {
          _id: '1',
          name: 'Test Team',
          points: 500,
          members: [mockUser._id]
        }
      ];

      mockApi.get
        .mockResolvedValueOnce({
          data: {
            success: true,
            stats: {
              totalPoints: 1000,
              rank: 'Experto',
              rankIcon: '🥇',
              vulnerabilitiesReported: 15,
              challengesCompleted: 8
            }
          }
        })
        .mockResolvedValueOnce({
          data: {
            success: true,
            teams: mockTeams
          }
        })
        .mockResolvedValueOnce({
          data: {
            success: true,
            challenges: []
          }
        });

      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Test Team')).toBeInTheDocument();
        expect(screen.getByText('500')).toBeInTheDocument();
      });
    });
  });

  describe('Profile Management', () => {
    beforeEach(() => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));
    });

    it('should update user profile', async () => {
      mockApi.put.mockResolvedValueOnce({
        data: {
          success: true,
          user: { ...mockUser, firstName: 'Updated', nickname: 'updatednick' }
        }
      });

      renderApp();

      // Navigate to profile
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      const profileLink = screen.getByText('Perfil');
      fireEvent.click(profileLink);

      await waitFor(() => {
        expect(screen.getByText('Perfil')).toBeInTheDocument();
      });

      // Update profile
      const nicknameInput = screen.getByLabelText('Nickname');
      const saveButton = screen.getByRole('button', { name: 'Guardar Cambios' });

      fireEvent.change(nicknameInput, { target: { value: 'updatednick' } });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockApi.put).toHaveBeenCalledWith('/auth/profile', {
          nickname: 'updatednick'
        });
      });
    });

    it('should change password', async () => {
      mockApi.put.mockResolvedValueOnce({
        data: {
          success: true,
          message: 'Contraseña actualizada correctamente'
        }
      });

      renderApp();

      // Navigate to profile
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      const profileLink = screen.getByText('Perfil');
      fireEvent.click(profileLink);

      await waitFor(() => {
        expect(screen.getByText('Perfil')).toBeInTheDocument();
      });

      // Change password
      const currentPasswordInput = screen.getByLabelText('Contraseña Actual');
      const newPasswordInput = screen.getByLabelText('Nueva Contraseña');
      const confirmPasswordInput = screen.getByLabelText('Confirmar Nueva Contraseña');
      const changePasswordButton = screen.getByRole('button', { name: 'Cambiar Contraseña' });

      fireEvent.change(currentPasswordInput, { target: { value: 'oldpassword' } });
      fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });
      fireEvent.click(changePasswordButton);

      await waitFor(() => {
        expect(mockApi.put).toHaveBeenCalledWith('/auth/password', {
          currentPassword: 'oldpassword',
          newPassword: 'newpassword',
          confirmPassword: 'newpassword'
        });
      });
    });
  });

  describe('Settings', () => {
    beforeEach(() => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));
    });

    it('should update notification preferences', async () => {
      mockApi.put.mockResolvedValueOnce({
        data: {
          success: true,
          user: { ...mockUser, preferences: { notifications: { email: false } } }
        }
      });

      renderApp();

      // Navigate to settings
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      const settingsLink = screen.getByText('Configuración');
      fireEvent.click(settingsLink);

      await waitFor(() => {
        expect(screen.getByText('Configuración')).toBeInTheDocument();
      });

      // Toggle email notifications
      const emailToggle = screen.getByLabelText('Notificaciones por Email');
      fireEvent.click(emailToggle);

      await waitFor(() => {
        expect(mockApi.put).toHaveBeenCalledWith('/auth/profile', {
          preferences: {
            notifications: {
              email: false,
              push: true,
              challenges: true,
              gulag: true
            }
          }
        });
      });
    });

    it('should change theme', async () => {
      mockApi.put.mockResolvedValueOnce({
        data: {
          success: true,
          user: { ...mockUser, preferences: { theme: 'dark' } }
        }
      });

      renderApp();

      // Navigate to settings
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      const settingsLink = screen.getByText('Configuración');
      fireEvent.click(settingsLink);

      await waitFor(() => {
        expect(screen.getByText('Configuración')).toBeInTheDocument();
      });

      // Change theme
      const themeSelect = screen.getByLabelText('Tema');
      fireEvent.change(themeSelect, { target: { value: 'dark' } });

      await waitFor(() => {
        expect(mockApi.put).toHaveBeenCalledWith('/auth/profile', {
          preferences: {
            theme: 'dark'
          }
        });
      });
    });

    it('should change language', async () => {
      mockApi.put.mockResolvedValueOnce({
        data: {
          success: true,
          user: { ...mockUser, preferences: { language: 'en' } }
        }
      });

      renderApp();

      // Navigate to settings
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      const settingsLink = screen.getByText('Configuración');
      fireEvent.click(settingsLink);

      await waitFor(() => {
        expect(screen.getByText('Configuración')).toBeInTheDocument();
      });

      // Change language
      const languageSelect = screen.getByLabelText('Idioma');
      fireEvent.change(languageSelect, { target: { value: 'en' } });

      await waitFor(() => {
        expect(mockApi.put).toHaveBeenCalledWith('/auth/profile', {
          preferences: {
            language: 'en'
          }
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));

      mockApi.get.mockRejectedValueOnce(new Error('Network error'));

      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('Error al cargar datos')).toBeInTheDocument();
      });
    });

    it('should handle authentication errors', async () => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));

      mockApi.get.mockRejectedValueOnce({
        response: {
          status: 401,
          data: { message: 'Token expirado' }
        }
      });

      renderApp();

      // Should redirect to login on auth error
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should show mobile menu on small screens', async () => {
      localStorageMock.getItem
        .mockReturnValueOnce(mockToken)
        .mockReturnValueOnce(JSON.stringify(mockUser));

      // Mock small screen
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });

      renderApp();

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      // Should show mobile menu button
      const mobileMenuButton = screen.getByLabelText('Abrir menú');
      expect(mobileMenuButton).toBeInTheDocument();

      // Open mobile menu
      fireEvent.click(mobileMenuButton);

      await waitFor(() => {
        expect(screen.getByText('Retos')).toBeInTheDocument();
        expect(screen.getByText('Vulnerabilidades')).toBeInTheDocument();
      });
    });
  });
}); 