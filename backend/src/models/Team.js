const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  // Información básica
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  
  // Líder del equipo
  leaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Miembros del equipo
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['leader', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Puntuación y estadísticas
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  totalPoints: {
    type: Number,
    default: 0,
    min: 0
  },
  monthlyPoints: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Estadísticas de vulnerabilidades
  vulnerabilitiesSolved: {
    critical: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    low: { type: Number, default: 0 }
  },
  
  // Rankings y posiciones
  currentRank: {
    type: Number,
    default: 0
  },
  previousRank: {
    type: Number,
    default: 0
  },
  rankColor: {
    type: String,
    enum: ['black', 'orange', 'blue', 'green'],
    default: 'black'
  },
  
  // MVP y reconocimientos
  mvpCount: {
    type: Number,
    default: 0
  },
  consecutiveMvpMonths: {
    type: Number,
    default: 0
  },
  isCurrentMvp: {
    type: Boolean,
    default: false
  },
  
  // Personalización del equipo
  cosmetics: {
    background: { type: String, default: null },
    logo: { type: String, default: null },
    banner: { type: String, default: null },
    badges: [{ type: String }],
    namePlate: { type: String, default: null }
  },
  
  // Estado del equipo
  isActive: {
    type: Boolean,
    default: true
  },
  maxMembers: {
    type: Number,
    default: 10,
    min: 1,
    max: 50
  },
  
  // Configuraciones
  settings: {
    allowChallenges: { type: Boolean, default: true },
    allowPublicProfile: { type: Boolean, default: true },
    autoAcceptMembers: { type: Boolean, default: false }
  },
  
  // Fechas importantes
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para optimizar consultas
teamSchema.index({ points: -1 });
teamSchema.index({ monthlyPoints: -1 });
teamSchema.index({ isCurrentMvp: 1 });
teamSchema.index({ 'members.userId': 1 });

// Virtuals
teamSchema.virtual('memberCount').get(function() {
  return this.members.length;
});

teamSchema.virtual('totalVulnerabilitiesSolved').get(function() {
  const stats = this.vulnerabilitiesSolved;
  return stats.critical + stats.high + stats.medium + stats.low;
});

teamSchema.virtual('averageVulnerabilityPriority').get(function() {
  const stats = this.vulnerabilitiesSolved;
  const total = this.totalVulnerabilitiesSolved;
  if (total === 0) return 0;
  
  const weightedSum = (stats.critical * 4) + (stats.high * 3) + (stats.medium * 2) + stats.low;
  return weightedSum / total;
});

teamSchema.virtual('participationRate').get(function() {
  if (this.memberCount === 0) return 0;
  
  const activeMembers = this.members.filter(member => 
    member.role !== 'leader' && member.joinedAt < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  
  return (activeMembers / this.memberCount) * 100;
});

// Métodos de instancia
teamSchema.methods.addPoints = function(points) {
  this.points += points;
  this.totalPoints += points;
  this.monthlyPoints += points;
  return this.save();
};

teamSchema.methods.removePoints = function(points) {
  this.points = Math.max(0, this.points - points);
  return this.save();
};

teamSchema.methods.updateVulnerabilityStats = function(severity) {
  if (this.vulnerabilitiesSolved[severity] !== undefined) {
    this.vulnerabilitiesSolved[severity]++;
  }
  return this.save();
};

teamSchema.methods.resetMonthlyPoints = function() {
  this.monthlyPoints = 0;
  this.consecutiveMvpMonths = 0;
  this.isCurrentMvp = false;
  return this.save();
};

teamSchema.methods.setMvp = function() {
  this.isCurrentMvp = true;
  this.mvpCount++;
  this.consecutiveMvpMonths++;
  return this.save();
};

teamSchema.methods.addMember = function(userId, role = 'member') {
  if (this.members.length >= this.maxMembers) {
    throw new Error('El equipo ha alcanzado su límite máximo de miembros');
  }
  
  if (this.members.some(member => member.userId.toString() === userId.toString())) {
    throw new Error('El usuario ya es miembro del equipo');
  }
  
  this.members.push({
    userId,
    role,
    joinedAt: new Date()
  });
  
  return this.save();
};

teamSchema.methods.removeMember = function(userId) {
  const memberIndex = this.members.findIndex(
    member => member.userId.toString() === userId.toString()
  );
  
  if (memberIndex === -1) {
    throw new Error('El usuario no es miembro del equipo');
  }
  
  if (this.members[memberIndex].role === 'leader') {
    throw new Error('No se puede eliminar al líder del equipo');
  }
  
  this.members.splice(memberIndex, 1);
  return this.save();
};

teamSchema.methods.changeLeader = function(newLeaderId) {
  const newLeaderMember = this.members.find(
    member => member.userId.toString() === newLeaderId.toString()
  );
  
  if (!newLeaderMember) {
    throw new Error('El usuario no es miembro del equipo');
  }
  
  // Cambiar el líder actual a miembro
  const currentLeader = this.members.find(member => member.role === 'leader');
  if (currentLeader) {
    currentLeader.role = 'member';
  }
  
  // Asignar nuevo líder
  newLeaderMember.role = 'leader';
  this.leaderId = newLeaderId;
  
  return this.save();
};

// Métodos estáticos
teamSchema.statics.getTopTeams = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ points: -1 })
    .limit(limit)
    .populate('leaderId', 'name avatar');
};

teamSchema.statics.getMvpTeams = function() {
  return this.find({ isCurrentMvp: true })
    .populate('leaderId', 'name avatar');
};

teamSchema.statics.getTeamsByMember = function(userId) {
  return this.find({
    'members.userId': userId,
    isActive: true
  }).populate('leaderId', 'name avatar');
};

// Middleware pre-save
teamSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Team', teamSchema); 