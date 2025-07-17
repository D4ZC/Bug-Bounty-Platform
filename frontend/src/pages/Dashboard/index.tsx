import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  console.log('Dashboard component is rendering');

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      padding: '20px',
      position: 'relative',
      zIndex: 1
    }}>
      {/* Debug info */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '10px', 
        backgroundColor: 'red', 
        color: 'white',
        borderRadius: '5px'
      }}>
        <p>DEBUG: Dashboard component is rendering</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Dashboard
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            Selecciona una opción para continuar
          </p>
        </div>
        {/* Aquí se eliminan las opciones de Críticas y Comunidad */}
      </div>
    </div>
  );
};

export default Dashboard; 