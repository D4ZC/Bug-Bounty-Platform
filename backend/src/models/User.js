const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Información básica
  w3id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  
  // Equipo
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  
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
  bluePoints: {
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
  
  // Personalización
  cosmetics: {
    background: { type: String, default: null },
    avatarFrame: { type: String, default: null },
    animatedAvatar: { type: String, default: null },
    badges: [{ type: String }],
    namePlate: { type: String, default: null }
  },
  
  // Estado del usuario
  isActive: {
    type: Boolean,
    default: true
  },
  isInGulag: {
    type: Boolean,
    default: false
  },
  gulagStartDate: {
    type: Date,
    default: null
  },
  
  // Configuraciones
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    challenges: { type: Boolean, default: true },
    rankings: { type: Boolean, default: true }
  },
  
  // Fechas importantes
  lastLogin: {
    type: Date,
    default: Date.now
  },
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
userSchema.index({ points: -1 });
userSchema.index({ monthlyPoints: -1 });
userSchema.index({ teamId: 1, points: -1 });
userSchema.index({ isCurrentMvp: 1 });
userSchema.index({ isInGulag: 1 });

// Virtuals
userSchema.virtual('totalVulnerabilitiesSolved').get(function() {
  const stats = this.vulnerabilitiesSolved;
  return stats.critical + stats.high + stats.medium + stats.low;
});

userSchema.virtual('averageVulnerabilityPriority').get(function() {
  const stats = this.vulnerabilitiesSolved;
  const total = this.totalVulnerabilitiesSolved;
  if (total === 0) return 0;
  
  const weightedSum = (stats.critical * 4) + (stats.high * 3) + (stats.medium * 2) + stats.low;
  return weightedSum / total;
});

// Métodos de instancia
userSchema.methods.addPoints = function(points, type = 'standard') {
  this.points += points;
  this.totalPoints += points;
  this.monthlyPoints += points;
  
  if (type === 'blue') {
    this.bluePoints += points;
  }
  
  return this.save();
};

userSchema.methods.removePoints = function(points) {
  this.points = Math.max(0, this.points - points);
  return this.save();
};

userSchema.methods.updateVulnerabilityStats = function(severity) {
  if (this.vulnerabilitiesSolved[severity] !== undefined) {
    this.vulnerabilitiesSolved[severity]++;
  }
  return this.save();
};

userSchema.methods.resetMonthlyPoints = function() {
  this.monthlyPoints = 0;
  this.consecutiveMvpMonths = 0;
  this.isCurrentMvp = false;
  return this.save();
};

userSchema.methods.setMvp = function() {
  this.isCurrentMvp = true;
  this.mvpCount++;
  this.consecutiveMvpMonths++;
  return this.save();
};

userSchema.methods.enterGulag = function() {
  this.isInGulag = true;
  this.gulagStartDate = new Date();
  return this.save();
};

userSchema.methods.exitGulag = function() {
  this.isInGulag = false;
  this.gulagStartDate = null;
  return this.save();
};

// Métodos estáticos
userSchema.statics.getTopUsers = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ points: -1 })
    .limit(limit)
    .populate('teamId', 'name');
};

userSchema.statics.getGulagUsers = function() {
  return this.find({ isInGulag: true })
    .sort({ points: 1 })
    .limit(5)
    .populate('teamId', 'name');
};

userSchema.statics.getMvpUsers = function() {
  return this.find({ isCurrentMvp: true })
    .populate('teamId', 'name');
};

// Middleware pre-save
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('User', userSchema); 