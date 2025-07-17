import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SocketProvider } from '@/contexts/SocketContext';

// Components
import App from './App';
import ErrorFallback from './components/ErrorFallback';

// Styles
import './styles/index.css';

// Optimización: Prevenir parpadeo durante la carga
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Renderizar con todos los providers necesarios
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <SocketProvider>
                <App />
              </SocketProvider>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
); 