import React, { useState, useEffect } from 'react';
import TeamsScoreCard from './components/TeamsScoreCard';
import MVPTeamCard from './components/MVPTeamCard';
import GulagCard from './components/GulagCard';
import UserScoreCard from './components/UserScoreCard';
import MVPUserCard from './components/MVPUserCard';
import UserProfileCard from './components/UserProfileCard';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Datos de ejemplo copiados de Eventos
  const [users] = useState([
    { name: 'Rees Josh', score: 600, rank: 1 },
    { name: 'Steve Wah', score: 580, rank: 2 },
    { name: 'Travis Head', score: 530, rank: 3 },
    { name: 'Josh Inglis', score: 470, rank: 4 },
    { name: 'Tim David', score: 410, rank: 5 },
    { name: 'Alice Smith', score: 390, rank: 6 },
    { name: 'Bob Lee', score: 370, rank: 7 },
    { name: 'Charlie Brown', score: 350, rank: 8 },
    { name: 'Diana Prince', score: 340, rank: 9 },
    { name: 'Eve Adams', score: 320, rank: 10 },
    { name: 'Frank Castle', score: 310, rank: 11 },
    { name: 'Grace Hopper', score: 300, rank: 12 },
    { name: 'Hank Pym', score: 290, rank: 13 },
    { name: 'Ivy Lane', score: 280, rank: 14 },
    { name: 'Jack Black', score: 270, rank: 15 },
    { name: 'Karen Page', score: 260, rank: 16 },
    { name: 'Leo Messi', score: 250, rank: 17 },
    { name: 'Mona Lisa', score: 240, rank: 18 },
    { name: 'Nina Simone', score: 230, rank: 19 },
    { name: 'Oscar Wilde', score: 220, rank: 20 },
    { name: 'Paul Allen', score: 210, rank: 21 },
    { name: 'Quinn Fabray', score: 200, rank: 22 },
    { name: 'Rick Grimes', score: 190, rank: 23 },
    { name: 'Sam Fisher', score: 180, rank: 24 },
    { name: 'Tina Fey', score: 170, rank: 25 },
    { name: 'Uma Thurman', score: 160, rank: 26 },
    { name: 'Victor Stone', score: 150, rank: 27 },
    { name: 'Wade Wilson', score: 140, rank: 28 },
    { name: 'Xena Warrior', score: 130, rank: 29 },
    { name: 'Yara Greyjoy', score: 120, rank: 30 },
    { name: 'Zane Malik', score: 110, rank: 31 },
  ]);

  const [teams] = useState([
    { name: 'Piteritos I', score: 2000 },
    { name: 'Piteritos II', score: 1900 },
    { name: 'Piteritos III', score: 1500 },
    { name: 'CyberGuardians', score: 1200 },
    { name: 'BugHunters', score: 1100 },
    { name: 'VulnSquad', score: 900 },
    { name: 'RedTeamers', score: 800 },
    { name: 'BlueDefenders', score: 700 },
    { name: 'WhiteHats', score: 600 },
    { name: 'DarkOps', score: 500 },
  ]);

  const [gulag] = useState([
    { name: 'deivid', score: 50 },
    { name: 'runrun', score: 25 },
    { name: 'excel', score: 20 },
    { name: 'kick ass', score: 20 },
    { name: 'pedrito sola', score: 10 },
  ]);

  const [mvpTeam] = useState('Piteritos I');
  const [mvpUser] = useState({ name: 'D4ZC', img: '', stats: { criticas: 10, altas: 20, medianas: 30, bajas: 9, total: 69 } });
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userName, setUserName] = useState('JuanAM'); // Nombre del usuario de Ajustes
  const navigate = useNavigate();

  // Mostrar modal de bienvenida al cargar el dashboard
  useEffect(() => {
    // Verificar si viene del login (puedes usar localStorage o una prop)
    const fromLogin = localStorage.getItem('fromLogin');
    console.log('Dashboard - fromLogin:', fromLogin);
    if (fromLogin === 'true') {
      console.log('Dashboard - Mostrando modal de bienvenida');
      setShowWelcomeModal(true);
      localStorage.removeItem('fromLogin'); // Limpiar la bandera
      
      // Ocultar el modal después de 3 segundos
      setTimeout(() => {
        setShowWelcomeModal(false);
      }, 3000);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-4 py-8 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-black mb-8">Inicio</h1>
      {/* Recuadros de puntuación y MVPs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <TeamsScoreCard teams={teams} />
        <MVPTeamCard team={mvpTeam} />
        <GulagCard gulag={gulag} />
        <UserScoreCard users={users} />
        <MVPUserCard user={mvpUser} />
        <UserProfileCard user={mvpUser} />
      </div>

      {/* Modal de bienvenida */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-500 rounded-lg shadow-xl p-8 text-center text-white">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">¡Credenciales Verificadas!</h3>
            <p className="text-xl">Bienvenido {userName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 