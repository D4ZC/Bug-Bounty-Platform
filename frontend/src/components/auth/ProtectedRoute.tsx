import React from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Navigate } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // DEMO: Siempre deja pasar
  // const { isLoggedIn, isLoading } = useAuth();

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <LoadingSpinner size="lg" />
  //     </div>
  //   );
  // }

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute; 