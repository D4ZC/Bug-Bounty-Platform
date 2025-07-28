// Script de inicialización para MongoDB
db = db.getSiblingDB('bug-bounty-platform');

// Crear usuario para la aplicación
db.createUser({
  user: 'bugbounty',
  pwd: 'bugbounty123',
  roles: [
    {
      role: 'readWrite',
      db: 'bug-bounty-platform'
    }
  ]
});

// Crear colecciones iniciales
db.createCollection('users');
db.createCollection('vulnerabilities');
db.createCollection('challenges');
db.createCollection('teams');

print('MongoDB inicializado correctamente');
print('Base de datos: bug-bounty-platform');
print('Usuario: bugbounty');
print('Contraseña: bugbounty123'); 