import React, { useState } from 'react';
import { Button, Tile, Tag, Tabs, Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import { UserMultiple, Trophy, Help } from '@carbon/icons-react';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  points: number;
  rank: number;
  team?: string;
  vulnerabilitiesSolved: number;
  isMVP: boolean;
}

interface Team {
  id: string;
  name: string;
  logo: string;
  points: number;
  rank: number;
  members: number;
  vulnerabilitiesSolved: number;
  isMVP: boolean;
}

interface HelperOffer {
  id: string;
  title: string;
  description: string;
  helper: {
    name: string;
    username: string;
    avatar: string;
    points: number;
  };
  vulnerabilityId: string;
  vulnerabilityTitle: string;
  status: 'active' | 'accepted' | 'completed';
  createdAt: string;
  compensation: string;
}

const Comunidad: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Datos mockeados
  const users: User[] = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      username: 'alex_sec',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      points: 8500,
      rank: 1,
      team: 'SecurityElite',
      vulnerabilitiesSolved: 45,
      isMVP: true,
    },
    {
      id: '2',
      name: 'Maria Garcia',
      username: 'maria_hacker',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      points: 7200,
      rank: 2,
      team: 'BugHunters',
      vulnerabilitiesSolved: 38,
      isMVP: true,
    },
    {
      id: '3',
      name: 'Carlos Lopez',
      username: 'carlos_pentest',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      points: 6800,
      rank: 3,
      team: 'SecurityElite',
      vulnerabilitiesSolved: 32,
      isMVP: false,
    },
    {
      id: '4',
      name: 'Ana Martinez',
      username: 'ana_cyber',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      points: 6200,
      rank: 4,
      team: 'CyberDefenders',
      vulnerabilitiesSolved: 28,
      isMVP: false,
    },
    {
      id: '5',
      name: 'David Torres',
      username: 'david_sec',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      points: 5800,
      rank: 5,
      team: 'BugHunters',
      vulnerabilitiesSolved: 25,
      isMVP: false,
    },
  ];

  const teams: Team[] = [
    {
      id: '1',
      name: 'SecurityElite',
      logo: 'https://via.placeholder.com/60x60/1F2937/FFFFFF?text=SE',
      points: 15300,
      rank: 1,
      members: 8,
      vulnerabilitiesSolved: 77,
      isMVP: true,
    },
    {
      id: '2',
      name: 'BugHunters',
      logo: 'https://via.placeholder.com/60x60/059669/FFFFFF?text=BH',
      points: 13000,
      rank: 2,
      members: 6,
      vulnerabilitiesSolved: 63,
      isMVP: false,
    },
    {
      id: '3',
      name: 'CyberDefenders',
      logo: 'https://via.placeholder.com/60x60/DC2626/FFFFFF?text=CD',
      points: 11800,
      rank: 3,
      members: 7,
      vulnerabilitiesSolved: 55,
      isMVP: false,
    },
    {
      id: '4',
      name: 'VulnSeekers',
      logo: 'https://via.placeholder.com/60x60/7C3AED/FFFFFF?text=VS',
      points: 10200,
      rank: 4,
      members: 5,
      vulnerabilitiesSolved: 48,
      isMVP: false,
    },
    {
      id: '5',
      name: 'SecureCode',
      logo: 'https://via.placeholder.com/60x60/EA580C/FFFFFF?text=SC',
      points: 8900,
      rank: 5,
      members: 4,
      vulnerabilitiesSolved: 42,
      isMVP: false,
    },
  ];

  const helperOffers: HelperOffer[] = [
    {
      id: '1',
      title: 'Ayuda con SQL Injection complejo',
      description: 'Necesito ayuda para resolver una inyección SQL compleja en una aplicación web. Tengo experiencia pero este caso es particularmente difícil.',
      helper: {
        name: 'Alex Rodriguez',
        username: 'alex_sec',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        points: 8500,
      },
      vulnerabilityId: 'vuln_123',
      vulnerabilityTitle: 'SQL Injection en panel de administración',
      status: 'active',
      createdAt: '2024-01-15',
      compensation: '500 puntos + reconocimiento',
    },
    {
      id: '2',
      title: 'Colaboración en XSS avanzado',
      description: 'Busco colaborar con alguien que tenga experiencia en XSS avanzado para resolver una vulnerabilidad crítica.',
      helper: {
        name: 'Maria Garcia',
        username: 'maria_hacker',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        points: 7200,
      },
      vulnerabilityId: 'vuln_456',
      vulnerabilityTitle: 'XSS Reflejado en búsqueda',
      status: 'active',
      createdAt: '2024-01-14',
      compensation: '300 puntos',
    },
    {
      id: '3',
      title: 'Mentoría en análisis de código',
      description: 'Soy nuevo en bug bounty y necesito mentoría para analizar código fuente y encontrar vulnerabilidades.',
      helper: {
        name: 'Carlos Lopez',
        username: 'carlos_pentest',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        points: 6800,
      },
      vulnerabilityId: 'vuln_789',
      vulnerabilityTitle: 'Análisis de código fuente',
      status: 'accepted',
      createdAt: '2024-01-13',
      compensation: '200 puntos',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'blue';
      case 'accepted': return 'warm-gray';
      case 'completed': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <UserMultiple size={32} className="text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Comunidad</h1>
      </div>

      {/* Tabs */}
      <Tabs selectedIndex={activeTab} onChange={(e) => setActiveTab(e.selectedIndex)}>
        <TabList aria-label="Secciones de la comunidad">
          <Tab>
            <div className="flex items-center gap-2">
              <Trophy size={16} />
              <span>Rankings</span>
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-2">
              <Help size={16} />
              <span>Helpers</span>
            </div>
          </Tab>
        </TabList>

        <TabPanels>
          {/* Tab Rankings */}
          <TabPanel>
            <div className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ranking de Usuarios */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Ranking de Usuarios</h2>
                    <p className="text-gray-600 text-sm">Top 5 usuarios con más puntos</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {users.map((user, index) => (
                        <div key={user.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                            <span className="text-blue-600 font-bold text-lg">#{user.rank}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-500">@{user.username}</p>
                              </div>
                              {user.isMVP && (
                                <Tag type="purple" size="sm">MVP</Tag>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{user.points.toLocaleString()} puntos</span>
                              <span>{user.vulnerabilitiesSolved} vulnerabilidades</span>
                              {user.team && <span>Equipo: {user.team}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ranking de Equipos */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Ranking de Equipos</h2>
                    <p className="text-gray-600 text-sm">Top 5 equipos con más puntos</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {teams.map((team, index) => (
                        <div key={team.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                            <span className="text-green-600 font-bold text-lg">#{team.rank}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <img
                                src={team.logo}
                                alt={team.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <h3 className="font-semibold text-gray-900">{team.name}</h3>
                                <p className="text-sm text-gray-500">{team.members} miembros</p>
                              </div>
                              {team.isMVP && (
                                <Tag type="purple" size="sm">MVP</Tag>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{team.points.toLocaleString()} puntos</span>
                              <span>{team.vulnerabilitiesSolved} vulnerabilidades</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Tab Helpers */}
          <TabPanel>
            <div className="mt-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="bg-orange-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Helpers</h2>
                      <p className="text-gray-600 text-sm">Ofertas de ayuda para vulnerabilidades difíciles</p>
                    </div>
                    <Button kind="primary" size="sm">
                      Crear Oferta
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {helperOffers.map(offer => (
                      <Tile key={offer.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                              <Tag type={getStatusColor(offer.status)} size="sm">
                                {offer.status.toUpperCase()}
                              </Tag>
                            </div>
                            <p className="text-gray-600 mb-4">{offer.description}</p>
                            
                            {/* Información del helper */}
                            <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-lg border border-gray-200">
                              <img
                                src={offer.helper.avatar}
                                alt={offer.helper.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">{offer.helper.name}</h4>
                                <p className="text-sm text-gray-500">@{offer.helper.username} • {offer.helper.points.toLocaleString()} puntos</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Vulnerabilidad: {offer.vulnerabilityTitle}</span>
                              <span>Compensación: {offer.compensation}</span>
                              <span>Fecha: {offer.createdAt}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button kind="primary" size="sm">
                              Contactar
                            </Button>
                            <Button kind="secondary" size="sm">
                              Ver Detalles
                            </Button>
                          </div>
                        </div>
                      </Tile>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Comunidad; 