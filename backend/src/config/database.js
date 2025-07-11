const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Crear directorio de datos si no existe
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ruta de la base de datos SQLite
const dbPath = path.join(dataDir, 'bug-bounty.db');

// Crear conexión a la base de datos
const db = new Database(dbPath);

// Habilitar foreign keys
db.pragma('foreign_keys = ON');

// Crear tablas si no existen
const createTables = () => {
  // Tabla de usuarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      w3id TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      avatar TEXT,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      bluePoints INTEGER DEFAULT 0,
      achievements TEXT DEFAULT '[]',
      clanId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de clanes
  db.exec(`
    CREATE TABLE IF NOT EXISTS clans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      leaderId INTEGER NOT NULL,
      members TEXT DEFAULT '[]',
      totalXp INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (leaderId) REFERENCES users (id)
    )
  `);

  // Tabla de vulnerabilidades
  db.exec(`
    CREATE TABLE IF NOT EXISTS vulnerabilities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      severity TEXT NOT NULL CHECK (severity IN ('Critical', 'High', 'Medium', 'Low')),
      status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Resolved', 'In Progress')),
      reportedBy INTEGER,
      resolvedBy INTEGER,
      points INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (reportedBy) REFERENCES users (id),
      FOREIGN KEY (resolvedBy) REFERENCES users (id)
    )
  `);

  // Tabla de retos
  db.exec(`
    CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL CHECK (type IN ('Individual', 'Team')),
      betPoints INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Cancelled')),
      participants TEXT DEFAULT '[]',
      winnerId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (winnerId) REFERENCES users (id)
    )
  `);

  // Tabla de items de la tienda
  db.exec(`
    CREATE TABLE IF NOT EXISTS shop_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL CHECK (type IN ('Avatar', 'Badge', 'Theme', 'Effect')),
      price INTEGER NOT NULL,
      image TEXT,
      rarity TEXT DEFAULT 'Common' CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary')),
      available BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de compras de usuarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      itemId INTEGER NOT NULL,
      purchasedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id),
      FOREIGN KEY (itemId) REFERENCES shop_items (id)
    )
  `);

  // Tabla de contribuciones
  db.exec(`
    CREATE TABLE IF NOT EXISTS contributions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('Documentation', 'Bug Report', 'Tutorial')),
      status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
      points INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  // Tabla de actividades del usuario
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      metadata TEXT DEFAULT '{}',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  console.log('✅ Tablas de base de datos creadas/verificadas');
};

// Inicializar la base de datos
createTables();

// Función para cerrar la conexión
const closeDatabase = () => {
  db.close();
};

module.exports = {
  db,
  closeDatabase
}; 