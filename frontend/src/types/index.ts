// Tipos de usuario
export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  team?: string;
  points: number;
  rank: number;
  isMVP: boolean;
  isGulagParticipant: boolean;
  gulagStatus?: GulagStatus;
  achievements: Achievement[];
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole =
  | 'admin'
  | 'team_leader'
  | 'member'
  | 'mvp'
  | 'gulag_participant';

export interface GulagStatus {
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  challengesCompleted: number;
  totalChallenges: number;
}

// Tipos de equipo
export interface Team {
  _id: string;
  name: string;
  description: string;
  leader: string;
  members: string[];
  points: number;
  rank: number;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de vulnerabilidad
export interface Vulnerability {
  _id: string;
  title: string;
  description: string;
  severity: VulnerabilitySeverity;
  status: VulnerabilityStatus;
  reporter: string;
  team?: string;
  target: string;
  cve?: string;
  cvss?: number;
  mendscanData?: MendscanData;
  attachments: Attachment[];
  comments: Comment[];
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export type VulnerabilitySeverity =
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'info';
export type VulnerabilityStatus =
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'duplicate';

export interface MendscanData {
  scanId: string;
  findings: MendscanFinding[];
  lastScan: Date;
}

export interface MendscanFinding {
  id: string;
  title: string;
  severity: string;
  description: string;
  recommendation: string;
  cve?: string;
  cvss?: number;
}

// Tipos de retos
export interface Challenge {
  _id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  points: number;
  status: ChallengeStatus;
  startDate: Date;
  endDate: Date;
  participants: string[];
  submissions: ChallengeSubmission[];
  maxParticipants?: number;
  requirements: string[];
  rewards: Reward[];
  createdAt: Date;
  updatedAt: Date;
}

export type ChallengeCategory =
  | 'web'
  | 'mobile'
  | 'api'
  | 'network'
  | 'reverse_engineering'
  | 'forensics'
  | 'crypto';
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type ChallengeStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export interface ChallengeSubmission {
  _id: string;
  participant: string;
  solution: string;
  attachments: Attachment[];
  submittedAt: Date;
  status: SubmissionStatus;
  feedback?: string;
  points?: number;
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

// Tipos de tienda
export interface ShopItem {
  _id: string;
  name: string;
  description: string;
  type: ShopItemType;
  price: number;
  image?: string;
  stock: number;
  isActive: boolean;
  requirements?: ShopItemRequirement[];
  createdAt: Date;
  updatedAt: Date;
}

export type ShopItemType = 'badge' | 'title' | 'theme' | 'feature' | 'physical';

export interface ShopItemRequirement {
  type: 'role' | 'points' | 'achievement';
  value: string | number;
}

// Tipos de contribuciones
export interface Contribution {
  _id: string;
  title: string;
  description: string;
  type: ContributionType;
  author: string;
  content: string;
  attachments: Attachment[];
  status: ContributionStatus;
  votes: Vote[];
  comments: Comment[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ContributionType =
  | 'article'
  | 'tool'
  | 'tutorial'
  | 'research'
  | 'writeup';
export type ContributionStatus = 'draft' | 'pending' | 'published' | 'rejected';

// Tipos auxiliares
export interface Attachment {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  _id: string;
  user: string;
  type: 'upvote' | 'downvote';
  createdAt: Date;
}

export interface Achievement {
  _id: string;
  id?: number;
  name: string;
  description: string;
  icon: string;
  unlocked?: boolean;
  reward?: string;
  dateUnlocked?: string | Date;
  unlockedAt?: string | Date;
  // Puedes agregar más campos si el backend los envía
}

export interface Badge {
  _id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  unlockedAt: Date;
}

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Reward {
  type: 'points' | 'badge' | 'title' | 'physical';
  value: string | number;
  description: string;
}

// Tipos de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos de filtros
export interface FilterOptions {
  search?: string;
  category?: string;
  status?: string;
  severity?: string;
  difficulty?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Tipos de WebSocket
export interface SocketEvent {
  type: string;
  data: any;
  timestamp: Date;
}

export interface Notification {
  _id: string;
  type: NotificationType;
  title: string;
  message: string;
  recipient: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType =
  | 'challenge_created'
  | 'challenge_completed'
  | 'vulnerability_found'
  | 'vulnerability_updated'
  | 'mvp_announcement'
  | 'gulag_start'
  | 'gulag_end'
  | 'contribution_published'
  | 'shop_purchase'
  | 'achievement_unlocked'
  | 'badge_earned'
  | 'team_invitation'
  | 'system_announcement';

// Tipos de formularios
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface VulnerabilityForm {
  title: string;
  description: string;
  severity: VulnerabilitySeverity;
  target: string;
  cve?: string;
  cvss?: number;
}

export interface ChallengeForm {
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  points: number;
  startDate: Date;
  endDate: Date;
  maxParticipants?: number;
  requirements: string[];
}

export interface ContributionForm {
  title: string;
  description: string;
  type: ContributionType;
  content: string;
  tags: string[];
}
