import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  roles = []
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Mostrar spinner mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #0a183d, #1a0033, #2d003e)' }}>
        <LoadingSpinner />
      </div>
    );
  }

  // Si no requiere autenticación, mostrar el contenido
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Si requiere autenticación pero el usuario no está autenticado
  if (!isAuthenticated) {
    // Redirigir al login con la ubicación actual como estado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si requiere roles específicos
  if (roles.length > 0 && user) {
    if (!roles.includes(user.role)) {
      // Redirigir a una página de acceso denegado o dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Usuario autenticado y autorizado
  return <>{children}</>;
};

export default ProtectedRoute; 