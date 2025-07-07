const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  // Información básica
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  
  // Tipo de item
  type: {
    type: String,
    enum: ['background', 'avatar_frame', 'animated_avatar', 'badge', 'name_plate', 'logo', 'banner'],
    required: true
  },
  
  // Categoría y disponibilidad
  category: {
    type: String,
    enum: ['regular', 'mvp', 'seasonal', 'limited'],
    default: 'regular'
  },
  
  // Precio
  price: {
    points: {
      type: Number,
      required: true,
      min: 0
    },
    bluePoints: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  
  // Archivos y recursos
  assets: {
    image: {
      type: String,
      required: true
    },
    preview: {
      type: String,
      default: null
    },
    dimensions: {
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      }
    },
    fileSize: {
      type: Number, // en bytes
      default: 0
    }
  },
  
  // Configuración específica por tipo
  config: {
    // Para backgrounds
    backgroundColor: {
      type: String,
      default: null
    },
    
    // Para badges
    rarity: {
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary'],
      default: 'common'
    },
    
    // Para items estacionales
    season: {
      type: String,
      default: null
    },
    
    // Para items limitados
    maxQuantity: {
      type: Number,
      default: null
    },
    soldQuantity: {
      type: Number,
      default: 0
    }
  },
  
  // Estado del item
  isActive: {
    type: Boolean,
    default: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  
  // Fechas importantes
  availableFrom: {
    type: Date,
    default: Date.now
  },
  availableUntil: {
    type: Date,
    default: null
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
shopItemSchema.index({ type: 1, category: 1 });
shopItemSchema.index({ isActive: 1, isAvailable: 1 });
shopItemSchema.index({ category: 1, 'price.points': 1 });
shopItemSchema.index({ 'config.rarity': 1 });

// Virtuals
shopItemSchema.virtual('isLimited').get(function() {
  return this.config.maxQuantity !== null;
});

shopItemSchema.virtual('remainingQuantity').get(function() {
  if (!this.isLimited) return null;
  return Math.max(0, this.config.maxQuantity - this.config.soldQuantity);
});

shopItemSchema.virtual('isSoldOut').get(function() {
  return this.isLimited && this.remainingQuantity === 0;
});

shopItemSchema.virtual('isExpired').get(function() {
  if (!this.availableUntil) return false;
  return new Date() > this.availableUntil;
});

shopItemSchema.virtual('isAvailableNow').get(function() {
  const now = new Date();
  return this.isActive && 
         this.isAvailable && 
         !this.isSoldOut && 
         !this.isExpired &&
         now >= this.availableFrom &&
         (!this.availableUntil || now <= this.availableUntil);
});

// Métodos de instancia
shopItemSchema.methods.purchase = function(quantity = 1) {
  if (!this.isAvailableNow) {
    throw new Error('El item no está disponible para compra');
  }
  
  if (this.isLimited && this.remainingQuantity < quantity) {
    throw new Error('No hay suficientes unidades disponibles');
  }
  
  if (this.isLimited) {
    this.config.soldQuantity += quantity;
  }
  
  return this.save();
};

shopItemSchema.methods.updateAvailability = function(isAvailable) {
  this.isAvailable = isAvailable;
  return this.save();
};

// Métodos estáticos
shopItemSchema.statics.getAvailableItems = function(type = null, category = null) {
  const query = { isActive: true, isAvailable: true };
  
  if (type) query.type = type;
  if (category) query.category = category;
  
  return this.find(query)
    .sort({ 'price.points': 1, 'price.bluePoints': 1 });
};

shopItemSchema.statics.getMvpItems = function() {
  return this.find({
    category: 'mvp',
    isActive: true,
    isAvailable: true
  }).sort({ 'price.bluePoints': 1 });
};

shopItemSchema.statics.getSeasonalItems = function(season) {
  return this.find({
    category: 'seasonal',
    'config.season': season,
    isActive: true,
    isAvailable: true
  }).sort({ 'price.points': 1 });
};

shopItemSchema.statics.getLimitedItems = function() {
  return this.find({
    'config.maxQuantity': { $ne: null },
    isActive: true,
    isAvailable: true
  }).sort({ 'config.soldQuantity': -1 });
};

// Middleware pre-save
shopItemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Validar dimensiones según el tipo
  if (this.type === 'background' && (this.assets.dimensions.width !== 1920 || this.assets.dimensions.height !== 1080)) {
    throw new Error('Los fondos deben tener dimensiones de 1920x1080 píxeles');
  }
  
  if (this.type === 'avatar_frame' && (this.assets.dimensions.width !== 500 || this.assets.dimensions.height !== 500)) {
    throw new Error('Los marcos de avatar deben tener dimensiones de 500x500 píxeles');
  }
  
  if (this.type === 'animated_avatar' && (this.assets.dimensions.width !== 300 || this.assets.dimensions.height !== 300)) {
    throw new Error('Los avatares animados deben tener dimensiones de 300x300 píxeles');
  }
  
  if (this.type === 'badge' && (this.assets.dimensions.width !== 150 || this.assets.dimensions.height !== 150)) {
    throw new Error('Las insignias deben tener dimensiones de 150x150 píxeles');
  }
  
  if (this.type === 'name_plate' && (this.assets.dimensions.width !== 600 || this.assets.dimensions.height !== 100)) {
    throw new Error('Las placas de nombre deben tener dimensiones de 600x100 píxeles');
  }
  
  next();
});

module.exports = mongoose.model('ShopItem', shopItemSchema); 