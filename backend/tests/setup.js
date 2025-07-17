const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let mongoServer;

// Configuración de test
beforeAll(async () => {
  // Iniciar servidor de MongoDB en memoria
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Conectar a la base de datos de test
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  console.log('Test database connected');
});

// Limpiar base de datos después de cada test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

// Cerrar conexión después de todos los tests
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  console.log('Test database disconnected');
});

// Helpers para tests

/**
 * Crear un usuario de prueba
 */
const createTestUser = async (userData = {}) => {
  const User = require('../src/models/User');
  
  const defaultUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'password123',
    nickname: 'testuser',
    role: 'member',
    isActive: true,
    points: 100,
    rango: 'Novato',
    rangoIcon: '🥉',
    preferences: {
      notifications: {
        email: true,
        push: true,
        challenges: true,
        gulag: true
      },
      theme: 'light',
      language: 'es'
    }
  };
  
  const userDataToSave = { ...defaultUser, ...userData };
  
  // Hashear contraseña
  if (userDataToSave.password) {
    userDataToSave.password = await bcrypt.hash(userDataToSave.password, 10);
  }
  
  const user = new User(userDataToSave);
  await user.save();
  
  return user;
};

/**
 * Crear un token JWT para un usuario
 */
const createTestToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};

/**
 * Crear un equipo de prueba
 */
const createTestTeam = async (teamData = {}) => {
  const Team = require('../src/models/Team');
  
  const defaultTeam = {
    name: 'Test Team',
    description: 'A test team for testing purposes',
    leader: null, // Se asignará después
    members: [],
    points: 500,
    isActive: true,
    settings: {
      allowJoinRequests: true,
      requireApproval: false,
      maxMembers: 10
    }
  };
  
  const teamDataToSave = { ...defaultTeam, ...teamData };
  const team = new Team(teamDataToSave);
  await team.save();
  
  return team;
};

/**
 * Crear una vulnerabilidad de prueba
 */
const createTestVulnerability = async (vulnData = {}) => {
  const Vulnerability = require('../src/models/Vulnerability');
  
  const defaultVuln = {
    title: 'Test Vulnerability',
    description: 'A test vulnerability for testing purposes',
    severity: 'medium',
    status: 'open',
    reporter: null, // Se asignará después
    assignedTo: null,
    points: 50,
    category: 'web',
    tags: ['test', 'xss'],
    evidence: 'Test evidence',
    steps: ['Step 1', 'Step 2'],
    impact: 'Test impact',
    recommendations: 'Test recommendations'
  };
  
  const vulnDataToSave = { ...defaultVuln, ...vulnData };
  const vulnerability = new Vulnerability(vulnDataToSave);
  await vulnerability.save();
  
  return vulnerability;
};

/**
 * Crear un reto de prueba
 */
const createTestChallenge = async (challengeData = {}) => {
  const Challenge = require('../src/models/Challenge');
  
  const defaultChallenge = {
    title: 'Test Challenge',
    description: 'A test challenge for testing purposes',
    category: 'web',
    difficulty: 'medium',
    points: 100,
    entryCost: 10,
    prize: 200,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    isActive: true,
    participants: [],
    requirements: ['Requirement 1', 'Requirement 2'],
    rules: ['Rule 1', 'Rule 2']
  };
  
  const challengeDataToSave = { ...defaultChallenge, ...challengeData };
  const challenge = new Challenge(challengeDataToSave);
  await challenge.save();
  
  return challenge;
};

/**
 * Crear un chat de prueba
 */
const createTestChat = async (chatData = {}) => {
  const Chat = require('../src/models/Chat');
  
  const defaultChat = {
    type: 'private',
    participants: [],
    settings: {
      name: 'Test Chat',
      allowFileUploads: true,
      slowMode: {
        enabled: false,
        interval: 5
      }
    },
    messages: [],
    isActive: true
  };
  
  const chatDataToSave = { ...defaultChat, ...chatData };
  const chat = new Chat(chatDataToSave);
  await chat.save();
  
  return chat;
};

/**
 * Crear un log de prueba
 */
const createTestLog = async (logData = {}) => {
  const Log = require('../src/models/Log');
  
  const defaultLog = {
    level: 'info',
    category: 'test',
    action: 'TEST_ACTION',
    message: 'Test log message',
    userId: null,
    ip: '127.0.0.1',
    userAgent: 'Test User Agent',
    metadata: {
      test: true
    }
  };
  
  const logDataToSave = { ...defaultLog, ...logData };
  const log = new Log(logDataToSave);
  await log.save();
  
  return log;
};

/**
 * Helper para hacer requests autenticados
 */
const makeAuthenticatedRequest = (app, method, url, data = {}, user = null) => {
  const request = require('supertest');
  let req = request(app)[method.toLowerCase()](url);
  
  if (user) {
    const token = createTestToken(user);
    req = req.set('Authorization', `Bearer ${token}`);
  }
  
  if (data && Object.keys(data).length > 0) {
    if (method.toLowerCase() === 'get') {
      req = req.query(data);
    } else {
      req = req.send(data);
    }
  }
  
  return req;
};

/**
 * Helper para crear datos de prueba en lote
 */
const createTestData = async () => {
  // Crear usuarios
  const user1 = await createTestUser({
    email: 'user1@example.com',
    nickname: 'user1',
    role: 'member'
  });
  
  const user2 = await createTestUser({
    email: 'user2@example.com',
    nickname: 'user2',
    role: 'member'
  });
  
  const admin = await createTestUser({
    email: 'admin@example.com',
    nickname: 'admin',
    role: 'admin'
  });
  
  // Crear equipo
  const team = await createTestTeam({
    name: 'Test Team',
    leader: user1._id,
    members: [user2._id]
  });
  
  // Crear vulnerabilidades
  const vuln1 = await createTestVulnerability({
    title: 'XSS Vulnerability',
    severity: 'high',
    reporter: user1._id
  });
  
  const vuln2 = await createTestVulnerability({
    title: 'SQL Injection',
    severity: 'critical',
    reporter: user2._id,
    status: 'resolved'
  });
  
  // Crear retos
  const challenge1 = await createTestChallenge({
    title: 'Web Security Challenge',
    category: 'web',
    participants: [user1._id, user2._id]
  });
  
  const challenge2 = await createTestChallenge({
    title: 'Mobile Security Challenge',
    category: 'mobile',
    isActive: false
  });
  
  // Crear chat
  const chat = await createTestChat({
    type: 'private',
    participants: [
      {
        user: user1._id,
        role: 'member',
        joinedAt: new Date(),
        lastSeen: new Date(),
        isActive: true
      },
      {
        user: user2._id,
        role: 'member',
        joinedAt: new Date(),
        lastSeen: new Date(),
        isActive: true
      }
    ]
  });
  
  return {
    users: { user1, user2, admin },
    team,
    vulnerabilities: { vuln1, vuln2 },
    challenges: { challenge1, challenge2 },
    chat
  };
};

/**
 * Helper para validar respuestas de API
 */
const validateApiResponse = (response, expectedStatus = 200) => {
  expect(response.status).toBe(expectedStatus);
  expect(response.body).toHaveProperty('success');
  
  if (expectedStatus === 200) {
    expect(response.body.success).toBe(true);
  } else {
    expect(response.body.success).toBe(false);
  }
  
  return response.body;
};

/**
 * Helper para validar estructura de usuario
 */
const validateUserStructure = (user) => {
  expect(user).toHaveProperty('_id');
  expect(user).toHaveProperty('firstName');
  expect(user).toHaveProperty('lastName');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('nickname');
  expect(user).toHaveProperty('role');
  expect(user).toHaveProperty('points');
  expect(user).toHaveProperty('rango');
  expect(user).toHaveProperty('isActive');
  expect(user).not.toHaveProperty('password'); // Password no debe estar en respuesta
};

/**
 * Helper para validar estructura de equipo
 */
const validateTeamStructure = (team) => {
  expect(team).toHaveProperty('_id');
  expect(team).toHaveProperty('name');
  expect(team).toHaveProperty('description');
  expect(team).toHaveProperty('leader');
  expect(team).toHaveProperty('members');
  expect(team).toHaveProperty('points');
  expect(team).toHaveProperty('isActive');
};

/**
 * Helper para validar estructura de vulnerabilidad
 */
const validateVulnerabilityStructure = (vulnerability) => {
  expect(vulnerability).toHaveProperty('_id');
  expect(vulnerability).toHaveProperty('title');
  expect(vulnerability).toHaveProperty('description');
  expect(vulnerability).toHaveProperty('severity');
  expect(vulnerability).toHaveProperty('status');
  expect(vulnerability).toHaveProperty('reporter');
  expect(vulnerability).toHaveProperty('points');
  expect(vulnerability).toHaveProperty('category');
};

/**
 * Helper para validar estructura de reto
 */
const validateChallengeStructure = (challenge) => {
  expect(challenge).toHaveProperty('_id');
  expect(challenge).toHaveProperty('title');
  expect(challenge).toHaveProperty('description');
  expect(challenge).toHaveProperty('category');
  expect(challenge).toHaveProperty('difficulty');
  expect(challenge).toHaveProperty('points');
  expect(challenge).toHaveProperty('entryCost');
  expect(challenge).toHaveProperty('prize');
  expect(challenge).toHaveProperty('isActive');
};

/**
 * Helper para validar estructura de chat
 */
const validateChatStructure = (chat) => {
  expect(chat).toHaveProperty('_id');
  expect(chat).toHaveProperty('type');
  expect(chat).toHaveProperty('participants');
  expect(chat).toHaveProperty('settings');
  expect(chat).toHaveProperty('stats');
  expect(chat).toHaveProperty('isActive');
};

/**
 * Helper para validar estructura de log
 */
const validateLogStructure = (log) => {
  expect(log).toHaveProperty('_id');
  expect(log).toHaveProperty('level');
  expect(log).toHaveProperty('category');
  expect(log).toHaveProperty('action');
  expect(log).toHaveProperty('message');
  expect(log).toHaveProperty('timestamp');
};

/**
 * Helper para esperar operaciones asíncronas
 */
const waitForAsync = (ms = 100) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Helper para generar datos aleatorios
 */
const generateRandomData = {
  email: () => `test${Date.now()}@example.com`,
  nickname: () => `user${Date.now()}`,
  title: () => `Test Title ${Date.now()}`,
  description: () => `Test description ${Date.now()}`,
  ip: () => `192.168.1.${Math.floor(Math.random() * 255)}`,
  userAgent: () => 'Mozilla/5.0 (Test Browser)'
};

module.exports = {
  createTestUser,
  createTestToken,
  createTestTeam,
  createTestVulnerability,
  createTestChallenge,
  createTestChat,
  createTestLog,
  makeAuthenticatedRequest,
  createTestData,
  validateApiResponse,
  validateUserStructure,
  validateTeamStructure,
  validateVulnerabilityStructure,
  validateChallengeStructure,
  validateChatStructure,
  validateLogStructure,
  waitForAsync,
  generateRandomData
}; 