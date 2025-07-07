const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  // Información básica
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  
  // Tipo de reto
  type: {
    type: String,
    enum: ['individual', 'team'],
    required: true
  },
  
  // Categoría y severidad
  category: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    required: true
  },
  
  // Participantes
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    betAmount: {
      type: Number,
      required: true,
      min: 0
    },
    currentPoints: {
      type: Number,
      default: 0
    },
    vulnerabilitiesSolved: {
      type: Number,
      default: 0
    },
    isWinner: {
      type: Boolean,
      default: false
    }
  }],
  
  // Estado del reto
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Configuración del reto
  config: {
    entryCost: {
      type: Number,
      required: true,
      min: 0
    },
    duration: {
      type: Number, // en horas
      required: true,
      min: 1
    },
    maxParticipants: {
      type: Number,
      default: 2,
      min: 2,
      max: 10
    },
    minVulnerabilities: {
      type: Number,
      default: 1,
      min: 1
    },
    targetSeverity: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      required: true
    }
  },
  
  // Fechas importantes
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
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
challengeSchema.index({ status: 1, startDate: 1 });
challengeSchema.index({ type: 1, status: 1 });
challengeSchema.index({ 'participants.userId': 1 });
challengeSchema.index({ 'participants.teamId': 1 });

// Virtuals
challengeSchema.virtual('totalPot').get(function() {
  return this.participants.reduce((total, participant) => {
    return total + participant.betAmount;
  }, 0);
});

challengeSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

challengeSchema.virtual('isActive').get(function() {
  const now = new Date();
  return this.status === 'active' && now >= this.startDate && now <= this.endDate;
});

challengeSchema.virtual('timeRemaining').get(function() {
  if (this.status !== 'active') return 0;
  
  const now = new Date();
  const remaining = this.endDate - now;
  return Math.max(0, Math.floor(remaining / (1000 * 60 * 60))); // en horas
});

challengeSchema.virtual('progress').get(function() {
  if (this.status !== 'active') return 0;
  
  const now = new Date();
  const total = this.endDate - this.startDate;
  const elapsed = now - this.startDate;
  
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
});

// Métodos de instancia
challengeSchema.methods.addParticipant = function(userId, teamId, betAmount) {
  if (this.participants.length >= this.config.maxParticipants) {
    throw new Error('El reto ha alcanzado su límite máximo de participantes');
  }
  
  if (this.status !== 'pending') {
    throw new Error('No se pueden agregar participantes a un reto que ya no está pendiente');
  }
  
  // Verificar que el usuario/equipo no esté ya participando
  const existingParticipant = this.participants.find(p => 
    (userId && p.userId && p.userId.toString() === userId.toString()) ||
    (teamId && p.teamId && p.teamId.toString() === teamId.toString())
  );
  
  if (existingParticipant) {
    throw new Error('El usuario/equipo ya está participando en este reto');
  }
  
  this.participants.push({
    userId,
    teamId,
    betAmount,
    joinedAt: new Date()
  });
  
  return this.save();
};

challengeSchema.methods.start = function() {
  if (this.participants.length < 2) {
    throw new Error('Se necesitan al menos 2 participantes para iniciar el reto');
  }
  
  this.status = 'active';
  this.startDate = new Date();
  this.endDate = new Date(Date.now() + (this.config.duration * 60 * 60 * 1000));
  
  return this.save();
};

challengeSchema.methods.updateParticipantProgress = function(userId, teamId, points, vulnerabilitiesSolved) {
  const participant = this.participants.find(p => 
    (userId && p.userId && p.userId.toString() === userId.toString()) ||
    (teamId && p.teamId && p.teamId.toString() === teamId.toString())
  );
  
  if (!participant) {
    throw new Error('Participante no encontrado');
  }
  
  participant.currentPoints = points;
  participant.vulnerabilitiesSolved = vulnerabilitiesSolved;
  
  return this.save();
};

challengeSchema.methods.complete = function() {
  if (this.status !== 'active') {
    throw new Error('Solo se pueden completar retos activos');
  }
  
  // Determinar ganador
  let winner = null;
  let maxPoints = -1;
  
  for (const participant of this.participants) {
    if (participant.currentPoints > maxPoints) {
      maxPoints = participant.currentPoints;
      winner = participant;
    }
  }
  
  if (winner) {
    winner.isWinner = true;
  }
  
  this.status = 'completed';
  
  return this.save();
};

challengeSchema.methods.cancel = function() {
  if (this.status === 'completed') {
    throw new Error('No se puede cancelar un reto completado');
  }
  
  this.status = 'cancelled';
  return this.save();
};

// Métodos estáticos
challengeSchema.statics.getActiveChallenges = function() {
  return this.find({ status: 'active' })
    .populate('participants.userId', 'name avatar')
    .populate('participants.teamId', 'name')
    .sort({ startDate: -1 });
};

challengeSchema.statics.getPendingChallenges = function() {
  return this.find({ status: 'pending' })
    .populate('participants.userId', 'name avatar')
    .populate('participants.teamId', 'name')
    .sort({ createdAt: -1 });
};

challengeSchema.statics.getUserChallenges = function(userId) {
  return this.find({
    'participants.userId': userId
  })
    .populate('participants.userId', 'name avatar')
    .populate('participants.teamId', 'name')
    .sort({ createdAt: -1 });
};

challengeSchema.statics.getTeamChallenges = function(teamId) {
  return this.find({
    'participants.teamId': teamId
  })
    .populate('participants.userId', 'name avatar')
    .populate('participants.teamId', 'name')
    .sort({ createdAt: -1 });
};

// Middleware pre-save
challengeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Calcular costo de entrada basado en categoría si no está definido
  if (!this.config.entryCost) {
    const costMap = {
      critical: 500,
      high: 300,
      medium: 200,
      low: 100
    };
    this.config.entryCost = costMap[this.category] || 100;
  }
  
  next();
});

module.exports = mongoose.model('Challenge', challengeSchema); 