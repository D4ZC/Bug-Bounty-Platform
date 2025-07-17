import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '@/pages/auth/Login';
import { AuthContext } from '@/contexts/AuthContext';
import { createTestUser } from '../setup';

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { from: '/dashboard' } })
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
  })
}));

describe('Login Page', () => {
  const mockLogin = vi.fn();
  const mockRegister = vi.fn();
  const mockLogout = vi.fn();
  const mockUpdateProfile = vi.fn();
  const mockChangePassword = vi.fn();

  const authContextValue = {
    user: null,
    token: null,
    isAuthenticated: false,
    login: mockLogin,
    register: mockRegister,
    logout: mockLogout,
    updateProfile: mockUpdateProfile,
    changePassword: mockChangePassword,
    loading: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={authContextValue}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  describe('Rendering', () => {
    it('should render login form correctly', () => {
      renderLogin();

      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument();
      expect(screen.getByText('¿No tienes cuenta?')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Regístrate aquí' })).toBeInTheDocument();
    });

    it('should render form with proper attributes', () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'tu@email.com');
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('autocomplete', 'off');

      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('placeholder', '••••••••');
      expect(passwordInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('autocomplete', 'off');

      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(submitButton).toBeDisabled(); // Initially disabled
    });

    it('should render theme toggle and language selector', () => {
      renderLogin();

      expect(screen.getByLabelText('Cambiar tema')).toBeInTheDocument();
      expect(screen.getByLabelText('Cambiar idioma')).toBeInTheDocument();
    });

    it('should render loading state when authentication is loading', () => {
      const loadingAuthContext = {
        ...authContextValue,
        loading: true
      };

      render(
        <MemoryRouter>
          <AuthContext.Provider value={loadingAuthContext}>
            <Login />
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should enable submit button when form is valid', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Initially disabled
      expect(submitButton).toBeDisabled();

      // Fill in valid data
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      // Should be enabled
      expect(submitButton).not.toBeDisabled();
    });

    it('should validate email format', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(submitButton).toBeDisabled();

      // Valid email
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      expect(submitButton).not.toBeDisabled();
    });

    it('should validate password length', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Short password
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });

      expect(submitButton).toBeDisabled();

      // Valid password
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(submitButton).not.toBeDisabled();
    });

    it('should show validation errors on blur', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');

      // Trigger blur with invalid data
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.getByText('El email debe tener un formato válido')).toBeInTheDocument();
        expect(screen.getByText('La contraseña debe tener al menos 6 caracteres')).toBeInTheDocument();
      });
    });

    it('should clear validation errors when input becomes valid', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');

      // Trigger validation errors
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.getByText('El email debe tener un formato válido')).toBeInTheDocument();
        expect(screen.getByText('La contraseña debe tener al menos 6 caracteres')).toBeInTheDocument();
      });

      // Fix the inputs
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      await waitFor(() => {
        expect(screen.queryByText('El email debe tener un formato válido')).not.toBeInTheDocument();
        expect(screen.queryByText('La contraseña debe tener al menos 6 caracteres')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call login function with form data', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Fill form
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      // Submit form
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('should not submit form with invalid data', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Fill with invalid data
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });

      // Try to submit
      fireEvent.click(submitButton);

      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('should handle form submission via Enter key', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');

      // Fill form
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      // Press Enter on password field
      fireEvent.keyPress(passwordInput, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('should show loading state during submission', async () => {
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Fill form
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      // Submit form
      fireEvent.click(submitButton);

      // Should show loading state
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalled();
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate to register page when clicking register link', () => {
      renderLogin();

      const registerLink = screen.getByRole('link', { name: 'Regístrate aquí' });
      fireEvent.click(registerLink);

      expect(mockNavigate).toHaveBeenCalledWith('/register');
    });

    it('should navigate to dashboard if already authenticated', () => {
      const authenticatedAuthContext = {
        ...authContextValue,
        isAuthenticated: true,
        user: createTestUser()
      };

      render(
        <MemoryRouter>
          <AuthContext.Provider value={authenticatedAuthContext}>
            <Login />
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('should navigate to intended page after successful login', async () => {
      mockLogin.mockResolvedValue(undefined);

      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Fill and submit form
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });
  });

  describe('Error Handling', () => {
    it('should show error message when login fails', async () => {
      mockLogin.mockRejectedValue(new Error('Credenciales inválidas'));

      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Fill and submit form
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
      });
    });

    it('should clear error message when user starts typing', async () => {
      mockLogin.mockRejectedValue(new Error('Credenciales inválidas'));

      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Submit form to trigger error
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
      });

      // Start typing to clear error
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });

      await waitFor(() => {
        expect(screen.queryByText('Credenciales inválidas')).not.toBeInTheDocument();
      });
    });

    it('should handle network errors gracefully', async () => {
      mockLogin.mockRejectedValue(new Error('Network error'));

      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');
      const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

      // Fill and submit form
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      renderLogin();

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Regístrate aquí' })).toBeInTheDocument();
    });

    it('should support keyboard navigation', () => {
      renderLogin();

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Contraseña');

      // Tab navigation
      emailInput.focus();
      expect(emailInput).toHaveFocus();

      passwordInput.focus();
      expect(passwordInput).toHaveFocus();
    });

    it('should have proper form structure', () => {
      renderLogin();

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('novalidate');
    });
  });

  describe('Internationalization', () => {
    it('should display translated text', () => {
      renderLogin();

      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
      expect(screen.getByText('¿No tienes cuenta?')).toBeInTheDocument();
      expect(screen.getByText('Regístrate aquí')).toBeInTheDocument();
    });
  });

  describe('Theme and Language', () => {
    it('should render theme toggle', () => {
      renderLogin();

      const themeToggle = screen.getByLabelText('Cambiar tema');
      expect(themeToggle).toBeInTheDocument();
      expect(themeToggle).toHaveAttribute('type', 'checkbox');
    });

    it('should render language selector', () => {
      renderLogin();

      const languageSelector = screen.getByLabelText('Cambiar idioma');
      expect(languageSelector).toBeInTheDocument();
    });
  });
}); 