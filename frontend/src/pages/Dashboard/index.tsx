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

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Opción Críticas */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '30px',
            border: '1px solid #ddd',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#fee2e2', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '2rem' }}>⚠️</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                Críticas
              </h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Gestiona las vulnerabilidades que necesitan ser resueltas. 
                Filtra por aplicaciones y niveles de severidad.
              </p>
              <button 
                onClick={() => navigate('/criticas')}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Ir a Críticas
              </button>
            </div>
          </div>

          {/* Opción Comunidad */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            padding: '30px',
            border: '1px solid #ddd',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#dbeafe', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '2rem' }}>👥</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                Comunidad
              </h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Explora rankings de usuarios y equipos. 
                Encuentra ayuda en la sección Helpers.
              </p>
              <button 
                onClick={() => navigate('/comunidad')}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Ir a Comunidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 