const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

// Crear conexión a la base de datos
const dbPath = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Inicializar la base de datos
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Crear tabla de usuarios
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          username TEXT NOT NULL,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          role TEXT DEFAULT 'member',
          points INTEGER DEFAULT 0,
          rank INTEGER DEFAULT 999,
          isMVP BOOLEAN DEFAULT 0,
          isGulagParticipant BOOLEAN DEFAULT 0,
          teamId TEXT,
          avatar TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err);
          reject(err);
          return;
        }

        // Insertar usuario Alex Turner si no existe
        const alexEmail = 'alex.turner@email.com';
        db.get('SELECT id FROM users WHERE email = ?', [alexEmail], (err, row) => {
          if (err) {
            console.error('Error checking Alex Turner:', err);
            reject(err);
            return;
          }

          if (!row) {
            // Hash de la contraseña 1234
            bcrypt.hash('1234', 10, (err, hashedPassword) => {
              if (err) {
                console.error('Error hashing password:', err);
                reject(err);
                return;
              }

              // Insertar Alex Turner
              db.run(`
                INSERT INTO users (
                  email, password, username, firstName, lastName, 
                  role, points, rank, isMVP, isGulagParticipant, teamId
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `, [
                alexEmail,
                hashedPassword,
                'alex_turner',
                'Alex',
                'Turner',
                'member',
                100, // puntos mock
                1,   // rank mock
                0,   // isMVP
                0,   // isGulagParticipant
                'Consulting' // equipo mock
              ], (err) => {
                if (err) {
                  console.error('Error inserting Alex Turner:', err);
                  reject(err);
                } else {
                  console.log('✅ Alex Turner creado en la base de datos');
                  resolve();
                }
              });
            });
          } else {
            console.log('✅ Alex Turner ya existe en la base de datos');
            resolve();
          }
        });
      });
    });
  });
};

// Función para obtener usuario por email
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Función para crear nuevo usuario
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { email, password, username, firstName, lastName } = userData;
    
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
        return;
      }

      db.run(`
        INSERT INTO users (
          email, password, username, firstName, lastName, 
          role, points, rank, isMVP, isGulagParticipant
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        email,
        hashedPassword,
        username,
        firstName,
        lastName,
        'member',
        0,   // puntos iniciales
        999, // rank inicial (al final)
        0,   // isMVP
        0    // isGulagParticipant
      ], function(err) {
        if (err) {
          reject(err);
        } else {
          // Obtener el usuario creado
          db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });
        }
      });
    });
  });
};

// Función para obtener usuario por ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Función para obtener todos los usuarios (para rankings)
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users ORDER BY points DESC, rank ASC', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  db,
  initDatabase,
  getUserByEmail,
  createUser,
  getUserById,
  getAllUsers
}; 