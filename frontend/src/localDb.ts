import { v4 as uuidv4 } from 'uuid';

// Tipos base
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  points: number;
  streak: number;
  accuracy: number;
  vulnerabilities: string[];
  purchases: string[];
  clans: string[];
  achievements: string[];
  createdAt: string;
}

export interface Clan {
  id: string;
  name: string;
  members: string[];
  createdBy: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  cost: number;
  rarity: 'común' | 'raro' | 'épico' | 'legendario' | 'mítico';
  category: string;
  stock: number;
  featured?: boolean;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  pointsSpent: number;
  totalPrice: number;
  quantity: number;
  date: string;
  product?: {
    name: string;
    category: string;
  };
}

export interface Vulnerability {
  id: string;
  userId: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'accepted' | 'rejected';
  points: number;
  date: string;
}

export interface Achievement {
  id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  date: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team';
  category: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  entryCost: number;
  duration: number; // en horas
  maxParticipants: number;
  currentParticipants: number;
  minVulnerabilities: number;
  targetSeverity: string;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  participants: string[];
  winner?: string;
  prize: number;
  createdBy: string;
}

// Helpers generales
function getDb<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
function setDb<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

// USERS
export function getUsers(): User[] {
  return getDb<User>('users');
}
export function saveUser(user: User) {
  const users = getUsers();
  users.push(user);
  setDb('users', users);
}
export function updateUser(user: User) {
  let users = getUsers();
  users = users.map(u => u.id === user.id ? user : u);
  setDb('users', users);
}
export function findUserByUsername(username: string): User | undefined {
  return getUsers().find(u => u.username === username);
}
export function findUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email === email);
}

// CLANS
export function getClans(): Clan[] {
  return getDb<Clan>('clans');
}
export function saveClan(clan: Clan) {
  const clans = getClans();
  clans.push(clan);
  setDb('clans', clans);
}
export function updateClan(clan: Clan) {
  let clans = getClans();
  clans = clans.map(c => c.id === clan.id ? clan : c);
  setDb('clans', clans);
}
export function findClanByName(name: string): Clan | undefined {
  return getClans().find(c => c.name === name);
}

// CLANS GLOBAL
export function getAllClans(): Clan[] {
  return getDb<Clan>('clans');
}
export function saveClanGlobal(clan: Clan) {
  const clans = getAllClans();
  clans.push(clan);
  setDb('clans', clans);
}
export function updateClanGlobal(clan: Clan) {
  let clans = getAllClans();
  clans = clans.map(c => c.id === clan.id ? clan : c);
  setDb('clans', clans);
}
export function deleteClanGlobal(clanId: string) {
  let clans = getAllClans();
  clans = clans.filter(c => c.id !== clanId);
  setDb('clans', clans);
}
export function findClanById(clanId: string): Clan | undefined {
  return getAllClans().find(c => c.id === clanId);
}

// PRODUCTS
export function getProducts(): Product[] {
  return getDb<Product>('products');
}
export function saveProduct(product: Product) {
  const products = getProducts();
  products.push(product);
  setDb('products', products);
}
export function updateProduct(product: Product) {
  let products = getProducts();
  products = products.map(p => p.id === product.id ? product : p);
  setDb('products', products);
}

// Limpiar y reinicializar productos de la tienda
export function resetAndInitializeShopProducts() {
  setDb('products', []);
  initializeShopProducts();
}

// Inicializar productos de la tienda
export function initializeShopProducts() {
  const existingProducts = getProducts();
  if (existingProducts.length > 0) return; // Ya están inicializados

  const defaultProducts: Product[] = [
    {
      id: newId(),
      name: 'Insignia Bug Hunter',
      description: 'Insignia exclusiva para cazadores de bugs. Demuestra tu experiencia en encontrar vulnerabilidades.',
      images: ['https://img.icons8.com/color/96/bug.png'],
      cost: 500,
      rarity: 'común',
      category: 'insignias',
      stock: 50,
      featured: true,
    },
    {
      id: newId(),
      name: 'Skin Cyber Ninja',
      description: 'Skin épico para tu avatar. Diseño cyberpunk con efectos de neón.',
      images: ['https://img.icons8.com/color/96/ninja.png'],
      cost: 1000,
      rarity: 'épico',
      category: 'skins',
      stock: 25,
      featured: true,
    },
    {
      id: newId(),
      name: 'Título "MVP"',
      description: 'Título exclusivo para jugadores más valiosos. Se muestra en tu perfil.',
      images: ['https://img.icons8.com/color/96/trophy.png'],
      cost: 2000,
      rarity: 'legendario',
      category: 'títulos',
      stock: 10,
      featured: true,
    },
    {
      id: newId(),
      name: 'Camiseta Oficial',
      description: 'Camiseta oficial de la plataforma Bug Bounty. Envío físico incluido.',
      images: ['https://img.icons8.com/color/96/t-shirt.png'],
      cost: 1500,
      rarity: 'raro',
      category: 'físico',
      stock: 30,
      featured: false,
    },
    {
      id: newId(),
      name: 'Sticker Pack',
      description: 'Pack de stickers con diseños de ciberseguridad. Perfecto para tu laptop.',
      images: ['https://img.icons8.com/color/96/sticker.png'],
      cost: 300,
      rarity: 'común',
      category: 'físico',
      stock: 100,
      featured: false,
    },
    {
      id: newId(),
      name: 'Power-Up: Detección X',
      description: 'Aumenta temporalmente tu precisión en retos de vulnerabilidad.',
      images: ['https://img.icons8.com/color/96/lightning-bolt.png'],
      cost: 700,
      rarity: 'raro',
      category: 'power-ups',
      stock: 40,
      featured: false,
    },
    {
      id: newId(),
      name: 'Teclado Mecánico RGB',
      description: 'Teclado físico con retroiluminación RGB para hackers.',
      images: ['https://img.icons8.com/color/96/keyboard.png'],
      cost: 2500,
      rarity: 'legendario',
      category: 'electrónicos',
      stock: 5,
      featured: true,
    },
    {
      id: newId(),
      name: 'Acceso VIP',
      description: 'Acceso exclusivo a retos avanzados y contenido premium.',
      images: ['https://img.icons8.com/color/96/vip.png'],
      cost: 3000,
      rarity: 'mítico',
      category: 'premium',
      stock: 5,
      featured: true,
    },
    {
      id: newId(),
      name: 'Marco Dorado',
      description: 'Marco dorado para tu perfil. Hace que tu avatar se vea más elegante.',
      images: ['https://img.icons8.com/color/96/frame.png'],
      cost: 800,
      rarity: 'raro',
      category: 'cosméticos',
      stock: 40,
      featured: false,
    },
    {
      id: newId(),
      name: 'Efecto de Partículas',
      description: 'Efecto especial de partículas para tu perfil. Muy llamativo.',
      images: ['https://img.icons8.com/color/96/sparkles.png'],
      cost: 1200,
      rarity: 'épico',
      category: 'cosméticos',
      stock: 20,
      featured: false,
    },
  ];

  defaultProducts.forEach(product => saveProduct(product));
}

// PURCHASES
export function getPurchases(): Purchase[] {
  return getDb<Purchase>('purchases');
}
export function savePurchase(purchase: Purchase) {
  const purchases = getPurchases();
  purchases.push(purchase);
  setDb('purchases', purchases);
}
export function getPurchasesByUser(userId: string): Purchase[] {
  return getPurchases().filter(p => p.userId === userId);
}

// VULNERABILITIES
export function getVulnerabilities(): Vulnerability[] {
  return getDb<Vulnerability>('vulnerabilities');
}
export function saveVulnerability(vuln: Vulnerability) {
  const vulns = getVulnerabilities();
  vulns.push(vuln);
  setDb('vulnerabilities', vulns);
}
export function getVulnerabilitiesByUser(userId: string): Vulnerability[] {
  return getVulnerabilities().filter(v => v.userId === userId);
}

// ACHIEVEMENTS
export function getAchievements(): Achievement[] {
  return getDb<Achievement>('achievements');
}
export function saveAchievement(ach: Achievement) {
  const achs = getAchievements();
  achs.push(ach);
  setDb('achievements', achs);
}
export function getAchievementsByUser(userId: string): Achievement[] {
  return getAchievements().filter(a => a.userId === userId);
}

// CHALLENGES
export function getChallenges(): Challenge[] {
  return getDb<Challenge>('challenges');
}
export function saveChallenge(challenge: Challenge) {
  const challenges = getChallenges();
  challenges.push(challenge);
  setDb('challenges', challenges);
}
export function updateChallenge(challenge: Challenge) {
  let challenges = getChallenges();
  challenges = challenges.map(c => c.id === challenge.id ? challenge : c);
  setDb('challenges', challenges);
}
export function getChallengesByUser(userId: string): Challenge[] {
  return getChallenges().filter(c => c.createdBy === userId || c.participants.includes(userId));
}

// GULAG
export interface GulagParticipant {
  id: string;
  name: string;
  avatar: string;
  originalRank: number;
  currentRank: number;
  originalPoints: number;
  currentPoints: number;
  gulagPoints: number;
  vulnerabilitiesSolved: number;
  lastActivity: string;
  status: 'active' | 'eliminated' | 'survived';
  streak: number;
  challengesCompleted: number;
}

export interface GulagChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit: number; // en minutos
  category: string;
  completed: boolean;
  completedAt?: string;
}

export function getGulagParticipants(): GulagParticipant[] {
  return getDb<GulagParticipant>('gulagParticipants');
}
export function saveGulagParticipant(participant: GulagParticipant) {
  const participants = getGulagParticipants();
  participants.push(participant);
  setDb('gulagParticipants', participants);
}
export function updateGulagParticipant(participant: GulagParticipant) {
  let participants = getGulagParticipants();
  participants = participants.map(p => p.id === participant.id ? participant : p);
  setDb('gulagParticipants', participants);
}

export function getGulagChallenges(): GulagChallenge[] {
  return getDb<GulagChallenge>('gulagChallenges');
}
export function saveGulagChallenge(challenge: GulagChallenge) {
  const challenges = getGulagChallenges();
  challenges.push(challenge);
  setDb('gulagChallenges', challenges);
}
export function updateGulagChallenge(challenge: GulagChallenge) {
  let challenges = getGulagChallenges();
  challenges = challenges.map(c => c.id === challenge.id ? challenge : c);
  setDb('gulagChallenges', challenges);
}

// MVP
export interface MVPReward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'title' | 'bonus' | 'access';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  userId?: string;
  teamId?: string;
}

export function getMVPRewards(): MVPReward[] {
  return getDb<MVPReward>('mvpRewards');
}
export function saveMVPReward(reward: MVPReward) {
  const rewards = getMVPRewards();
  rewards.push(reward);
  setDb('mvpRewards', rewards);
}
export function updateMVPReward(reward: MVPReward) {
  let rewards = getMVPRewards();
  rewards = rewards.map(r => r.id === reward.id ? reward : r);
  setDb('mvpRewards', rewards);
}

// CONTRIBUTIONS
export interface Contribution {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'code' | 'documentation' | 'bug_report' | 'feature_request' | 'translation' | 'design';
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  date: string;
  approvedAt?: string;
  points?: number;
  reviewer?: string;
  notes?: string;
  tags: string[];
}

export function getContributions(): Contribution[] {
  return getDb<Contribution>('contributions');
}
export function saveContribution(contribution: Contribution) {
  const contributions = getContributions();
  contributions.push(contribution);
  setDb('contributions', contributions);
}
export function updateContribution(contribution: Contribution) {
  let contributions = getContributions();
  contributions = contributions.map(c => c.id === contribution.id ? contribution : c);
  setDb('contributions', contributions);
}
export function getContributionsByUser(userId: string): Contribution[] {
  return getContributions().filter(c => c.userId === userId);
}

// Inicializar clanes globales
export function initializeGlobalClans() {
  const existingClans = getAllClans();
  if (existingClans.length > 0) return; // Ya están inicializados

  // Crear usuarios para los clanes
  const clanUsers = [
    { username: 'CyberWolf', points: 2500, avatar: 'https://robohash.org/cyberwolf?set=set2' },
    { username: 'NeonHunter', points: 1800, avatar: 'https://robohash.org/neonhunter?set=set2' },
    { username: 'PixelNinja', points: 2200, avatar: 'https://robohash.org/pixelninja?set=set2' },
    { username: 'ShadowFox', points: 1600, avatar: 'https://robohash.org/shadowfox?set=set2' },
    { username: 'BlazeMaster', points: 1900, avatar: 'https://robohash.org/blazemaster?set=set2' },
    { username: 'IcePhantom', points: 2100, avatar: 'https://robohash.org/icephantom?set=set2' },
    { username: 'ThunderStrike', points: 1700, avatar: 'https://robohash.org/thunderstrike?set=set2' },
    { username: 'VoidWalker', points: 2400, avatar: 'https://robohash.org/voidwalker?set=set2' },
    { username: 'CrystalGuard', points: 2000, avatar: 'https://robohash.org/crystalguard?set=set2' },
    { username: 'DarkKnight', points: 2300, avatar: 'https://robohash.org/darkknight?set=set2' },
  ];

  // Guardar usuarios en la base de datos
  clanUsers.forEach(userData => {
    const user: User = {
      id: newId(),
      username: userData.username,
      email: `${userData.username.toLowerCase()}@example.com`,
      password: 'hashed_password',
      points: userData.points,
      streak: Math.floor(Math.random() * 30) + 1,
      accuracy: Math.floor(Math.random() * 20) + 80,
      vulnerabilities: [],
      purchases: [],
      clans: [],
      achievements: [],
      createdAt: new Date().toISOString(),
    };
    saveUser(user);
  });

  // Crear clanes con nombres atractivos
  const clans = [
    {
      id: newId(),
      name: 'Cyber Dragons',
      members: clanUsers.slice(0, 3).map(u => u.username),
      createdBy: clanUsers[0].username,
      createdAt: new Date().toISOString(),
    },
    {
      id: newId(),
      name: 'Neon Warriors',
      members: clanUsers.slice(3, 6).map(u => u.username),
      createdBy: clanUsers[3].username,
      createdAt: new Date().toISOString(),
    },
    {
      id: newId(),
      name: 'Shadow Hunters',
      members: clanUsers.slice(6, 9).map(u => u.username),
      createdBy: clanUsers[6].username,
      createdAt: new Date().toISOString(),
    },
  ];

  clans.forEach(clan => saveClanGlobal(clan));
}

// UUID helper
export function newId() {
  return uuidv4();
} 