// Avatares locales para equipos y miembros
const localAvatars = [
  '/avatars/cat_avatar.webp',
  '/avatars/lucy_avatar.webp',
  '/avatars/rebecca_avatar.webp',
  '/avatars/poro_avatar.webp',
  '/avatars/teemo.webp',
  '/avatars/ado.webp',
  '/avatars/cat.gif',
  '/avatars/toga.gif',
  '/avatars/panda.gif',
  '/avatars/david_avatar.webp',
  '/avatars/david_avatar2.webp',
  '/avatars/poro_avatar2.webp',
  '/avatars/rebeca_avatar.webp',
  '/avatars/avatargif.gif',
  '/avatars/img_example.jpg',
];

// Mock global de equipos para Rankings y Team
export const mockTeams = [
  {
    id: 1,
    name: 'CyberWolves',
    avatar: localAvatars[0], // cat_avatar.webp
    points: 5000,
    badges: [
      { src: '/badges/badge1.png', name: 'Insignia 1', desc: 'Por ganar el torneo de primavera.' },
      { src: '/badges/badge2.png', name: 'Insignia 2', desc: 'Por 1000 puntos acumulados.' },
    ],
    members: [
      { id: 1, name: 'Líder Alpha', avatar: localAvatars[1], isLeader: true },
      { id: 2, name: 'Hacker Beta', avatar: localAvatars[2], isLeader: false },
      { id: 3, name: 'Coder Gamma', avatar: localAvatars[3], isLeader: false },
      { id: 4, name: 'Security Delta', avatar: localAvatars[4], isLeader: false },
    ],
  },
  {
    id: 2,
    name: 'ShadowCats',
    avatar: localAvatars[5], // ado.webp
    points: 4500,
    badges: [
      { src: '/badges/badge1.png', name: 'Insignia 1', desc: 'Por ganar el torneo de primavera.' },
    ],
    members: [
      { id: 1, name: 'Shadow Master', avatar: localAvatars[6], isLeader: true },
      { id: 2, name: 'Stealth Agent', avatar: localAvatars[7], isLeader: false },
      { id: 3, name: 'Ninja Coder', avatar: localAvatars[8], isLeader: false },
    ],
  },
  {
    id: 3,
    name: 'DarkHackers',
    avatar: localAvatars[9], // david_avatar.webp
    points: 4000,
    badges: [
      { src: '/badges/badge3.png', name: 'Insignia 3', desc: 'Por participación destacada.' },
    ],
    members: [
      { id: 1, name: 'Dark Lord', avatar: localAvatars[10], isLeader: true },
      { id: 2, name: 'Void Walker', avatar: localAvatars[11], isLeader: false },
      { id: 3, name: 'Shadow Coder', avatar: localAvatars[12], isLeader: false },
    ],
  },
  {
    id: 4,
    name: 'EliteTeam',
    avatar: localAvatars[13], // avatargif.gif
    points: 3500,
    badges: [
      { src: '/badges/badge2.png', name: 'Insignia 2', desc: 'Por 1000 puntos acumulados.' },
      { src: '/badges/badge3.png', name: 'Insignia 3', desc: 'Por participación destacada.' },
    ],
    members: [
      { id: 1, name: 'Elite Leader', avatar: localAvatars[14], isLeader: true },
      { id: 2, name: 'Pro Hacker', avatar: localAvatars[0], isLeader: false },
      { id: 3, name: 'Code Master', avatar: localAvatars[1], isLeader: false },
      { id: 4, name: 'Security Pro', avatar: localAvatars[2], isLeader: false },
      { id: 5, name: 'Bug Hunter', avatar: localAvatars[3], isLeader: false },
    ],
  },
  {
    id: 5,
    name: 'TechNinjas',
    avatar: localAvatars[4], // teemo.webp
    points: 3000,
    badges: [
      { src: '/badges/badge1.png', name: 'Insignia 1', desc: 'Por ganar el torneo de primavera.' },
      { src: '/badges/badge2.png', name: 'Insignia 2', desc: 'Por 1000 puntos acumulados.' },
      { src: '/badges/badge3.png', name: 'Insignia 3', desc: 'Por participación destacada.' },
    ],
    members: [
      { id: 1, name: 'Ninja Master', avatar: localAvatars[5], isLeader: true },
      { id: 2, name: 'Tech Warrior', avatar: localAvatars[6], isLeader: false },
      { id: 3, name: 'Code Ninja', avatar: localAvatars[7], isLeader: false },
      { id: 4, name: 'Digital Assassin', avatar: localAvatars[8], isLeader: false },
    ],
  },
]; 