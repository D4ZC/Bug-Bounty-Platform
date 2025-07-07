const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
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
  
  // Tipo de contribución
  type: {
    type: String,
    enum: ['documentation', 'bug_report'],
    required: true
  },
  
  // Autor
  author: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  },
  
  // Contenido específico por tipo
  content: {
    // Para documentación
    vulnerabilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vulnerability',
      default: null
    },
    vulnerabilityTitle: {
      type: String,
      trim: true,
      default: null
    },
    tools: [{
      type: String,
      trim: true
    }],
    steps: [{
      step: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      }
    }],
    
    // Para reportes de bugs
    application: {
      name: {
        type: String,
        trim: true,
        default: null
      },
      version: {
        type: String,
        trim: true,
        default: null
      },
      url: {
        type: String,
        trim: true,
        default: null
      }
    },
    bugType: {
      type: String,
      enum: ['ui', 'functionality', 'performance', 'security', 'other'],
      default: null
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: null
    },
    reproductionSteps: [{
      step: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      }
    }],
    expectedBehavior: {
      type: String,
      trim: true,
      default: null
    },
    actualBehavior: {
      type: String,
      trim: true,
      default: null
    }
  },
  
  // Archivos adjuntos
  attachments: [{
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Sistema de votación
  votes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    vote: {
      type: String,
      enum: ['up', 'down'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Estado y validación
  status: {
    type: String,
    enum: ['pending', 'validated', 'rejected'],
    default: 'pending'
  },
  validatedAt: {
    type: Date,
    default: null
  },
  validatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Puntuación
  points: {
    type: Number,
    default: 50
  },
  pointsAwarded: {
    type: Boolean,
    default: false
  },
  
  // Comentarios
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Metadatos
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
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
contributionSchema.index({ type: 1, status: 1 });
contributionSchema.index({ 'author.userId': 1 });
contributionSchema.index({ 'author.teamId': 1 });
contributionSchema.index({ createdAt: -1 });
contributionSchema.index({ 'votes.userId': 1 });

// Virtuals
contributionSchema.virtual('upVotes').get(function() {
  return this.votes.filter(vote => vote.vote === 'up').length;
});

contributionSchema.virtual('downVotes').get(function() {
  return this.votes.filter(vote => vote.vote === 'down').length;
});

contributionSchema.virtual('voteScore').get(function() {
  return this.upVotes - this.downVotes;
});

contributionSchema.virtual('isValidated').get(function() {
  return this.status === 'validated';
});

contributionSchema.virtual('validationRate').get(function() {
  const totalVotes = this.votes.length;
  if (totalVotes === 0) return 0;
  return (this.upVotes / totalVotes) * 100;
});

// Métodos de instancia
contributionSchema.methods.addVote = function(userId, vote) {
  // Verificar si el usuario ya votó
  const existingVoteIndex = this.votes.findIndex(
    v => v.userId.toString() === userId.toString()
  );
  
  if (existingVoteIndex !== -1) {
    // Actualizar voto existente
    this.votes[existingVoteIndex].vote = vote;
    this.votes[existingVoteIndex].createdAt = new Date();
  } else {
    // Agregar nuevo voto
    this.votes.push({
      userId,
      vote,
      createdAt: new Date()
    });
  }
  
  return this.save();
};

contributionSchema.methods.validate = function(validatedBy) {
  this.status = 'validated';
  this.validatedAt = new Date();
  this.validatedBy = validatedBy;
  return this.save();
};

contributionSchema.methods.reject = function(validatedBy) {
  this.status = 'rejected';
  this.validatedAt = new Date();
  this.validatedBy = validatedBy;
  return this.save();
};

contributionSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    userId,
    content,
    createdAt: new Date()
  });
  return this.save();
};

contributionSchema.methods.incrementViews = function() {
  this.views++;
  return this.save();
};

// Métodos estáticos
contributionSchema.statics.getByType = function(type, status = null) {
  const query = { type };
  if (status) query.status = status;
  
  return this.find(query)
    .populate('author.userId', 'name avatar')
    .populate('author.teamId', 'name')
    .populate('validatedBy', 'name')
    .sort({ createdAt: -1 });
};

contributionSchema.statics.getByAuthor = function(userId) {
  return this.find({ 'author.userId': userId })
    .populate('author.teamId', 'name')
    .populate('validatedBy', 'name')
    .sort({ createdAt: -1 });
};

contributionSchema.statics.getByTeam = function(teamId) {
  return this.find({ 'author.teamId': teamId })
    .populate('author.userId', 'name avatar')
    .populate('validatedBy', 'name')
    .sort({ createdAt: -1 });
};

contributionSchema.statics.getValidated = function() {
  return this.find({ status: 'validated' })
    .populate('author.userId', 'name avatar')
    .populate('author.teamId', 'name')
    .sort({ validatedAt: -1 });
};

contributionSchema.statics.getTopContributions = function(limit = 10) {
  return this.find({ status: 'validated' })
    .populate('author.userId', 'name avatar')
    .populate('author.teamId', 'name')
    .sort({ voteScore: -1, views: -1 })
    .limit(limit);
};

contributionSchema.statics.getPendingValidation = function() {
  return this.find({ status: 'pending' })
    .populate('author.userId', 'name avatar')
    .populate('author.teamId', 'name')
    .sort({ createdAt: 1 });
};

// Middleware pre-save
contributionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Auto-validar si tiene suficientes votos positivos
  if (this.status === 'pending' && this.votes.length >= 5) {
    const validationRate = this.validationRate;
    if (validationRate >= 70) {
      this.status = 'validated';
      this.validatedAt = new Date();
    } else if (validationRate <= 30) {
      this.status = 'rejected';
      this.validatedAt = new Date();
    }
  }
  
  next();
});

module.exports = mongoose.model('Contribution', contributionSchema); 