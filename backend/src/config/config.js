require('dotenv').config();

const config = {
  // Configuración del servidor
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  jwtExpiresIn: '24h',
  
  // Base de datos SQLite (local)
  database: {
    path: './data/bug-bounty.db'
  },
  
  // w3id IBM Configuration (opcional para desarrollo)
  w3id: {
    clientId: process.env.W3ID_CLIENT_ID || 'dev-client-id',
    clientSecret: process.env.W3ID_CLIENT_SECRET || 'dev-client-secret',
    redirectUri: process.env.W3ID_REDIRECT_URI || 'http://localhost:3000/auth/callback'
  },
  
  // Mendscan API (opcional)
  mendscan: {
    apiUrl: process.env.MENDSCAN_API_URL || 'https://api.mendscan.com',
    apiKey: process.env.MENDSCAN_API_KEY || 'dev-api-key'
  },
  
  // Email Configuration (opcional para desarrollo)
  email: {
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: process.env.SMTP_PORT || 587,
    smtpUser: process.env.SMTP_USER || 'dev@example.com',
    smtpPass: process.env.SMTP_PASS || 'dev-password'
  },
  
  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
    uploadPath: process.env.UPLOAD_PATH || './uploads'
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  
  // WebSocket
  wsPort: process.env.WS_PORT || 4001,
  
  // Cron Jobs
  cron: {
    rankingUpdate: process.env.RANKING_UPDATE_CRON || '0 0 */15 * * *',
    mvpUpdate: process.env.MVP_UPDATE_CRON || '0 0 1 * * *'
  },
  
  // Configuración de desarrollo
  development: {
    enableMockAuth: process.env.ENABLE_MOCK_AUTH === 'true' || true,
    enableMockData: process.env.ENABLE_MOCK_DATA === 'true' || true,
    debug: process.env.DEBUG === 'true' || true
  }
};

module.exports = config; 