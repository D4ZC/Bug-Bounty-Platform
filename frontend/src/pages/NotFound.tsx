import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Search, 
  Bug, 
  Shield, 
  Sword,
  RefreshCw,
  BarChart3,
  Trophy,
  Gift,
  User
} from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <AlertTriangle className="w-16 h-16 text-white" />
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-50 blur-xl"
            />
          </div>
        </motion.div>

        {/* Error Number */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            ¡Página no encontrada!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Parece que la página que buscas se ha perdido en el ciberespacio.
            <br />
            O tal vez fue eliminada por un bug hunter muy eficiente.
          </p>
        </motion.div>

        {/* Fun Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-center space-x-4">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bug className="w-8 h-8 text-green-500" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Shield className="w-8 h-8 text-blue-500" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Sword className="w-8 h-8 text-purple-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleGoBack}
            className="btn btn-outline flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver atrás
          </button>
          
          <Link
            to="/"
            className="btn btn-primary flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Ir al inicio
          </Link>
          
          <button
            onClick={handleRefresh}
            className="btn btn-secondary flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recargar
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ¿Buscas algo específico?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/dashboard"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dashboard
                </span>
              </div>
            </Link>
            
            <Link
              to="/challenges"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
                  <Trophy className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Retos
                </span>
              </div>
            </Link>
            
            <Link
              to="/shop"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/40 transition-colors">
                  <Gift className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tienda
                </span>
              </div>
            </Link>
            
            <Link
              to="/profile"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Perfil
                </span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
        >
          <div className="flex items-center justify-center space-x-2 text-blue-700 dark:text-blue-300">
            <Search className="w-4 h-4" />
            <span className="text-sm">
              ¿No encuentras lo que buscas? Usa la barra de navegación para explorar
            </span>
          </div>
        </motion.div>

        {/* Easter Egg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 Tip: Esta página 404 esconde un pequeño easter egg. ¡Encuéntralo!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
