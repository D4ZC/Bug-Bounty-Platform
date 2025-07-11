const { db } = require('./database');

const seedData = () => {
  console.log('🌱 Poblando base de datos con datos de ejemplo...');

  // Insertar usuarios de ejemplo
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (w3id, email, name, avatar, xp, level, bluePoints, achievements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const users = [
    ['user1@ibm.com', 'user1@ibm.com', 'Alice Johnson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', 1250, 3, 150, JSON.stringify(['first_vulnerability', 'team_player'])],
    ['user2@ibm.com', 'user2@ibm.com', 'Bob Smith', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', 2100, 4, 300, JSON.stringify(['bug_hunter', 'critical_finder'])],
    ['user3@ibm.com', 'user3@ibm.com', 'Carol Davis', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol', 800, 2, 75, JSON.stringify(['newcomer'])],
    ['user4@ibm.com', 'user4@ibm.com', 'David Wilson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', 3500, 6, 500, JSON.stringify(['veteran', 'clan_leader', 'mvp'])],
    ['user5@ibm.com', 'user5@ibm.com', 'Eva Brown', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eva', 1800, 3, 200, JSON.stringify(['documentation_master'])],
  ];

  users.forEach(user => {
    insertUser.run(...user);
  });

  // Insertar clanes de ejemplo
  const insertClan = db.prepare(`
    INSERT OR IGNORE INTO clans (name, description, leaderId, members, totalXp)
    VALUES (?, ?, ?, ?, ?)
  `);

  const clans = [
    ['Security Masters', 'Elite clan de cazadores de bugs', 4, JSON.stringify([1, 2, 4]), 6850],
    ['Code Guardians', 'Protectores del código limpio', 2, JSON.stringify([2, 3, 5]), 4700],
  ];

  clans.forEach(clan => {
    insertClan.run(...clan);
  });

  // Insertar vulnerabilidades de ejemplo
  const insertVulnerability = db.prepare(`
    INSERT OR IGNORE INTO vulnerabilities (title, description, severity, status, reportedBy, resolvedBy, points)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const vulnerabilities = [
    ['SQL Injection en Login', 'Vulnerabilidad de inyección SQL en el formulario de login', 'Critical', 'Resolved', 1, 2, 500],
    ['XSS en Comentarios', 'Cross-site scripting en la sección de comentarios', 'High', 'Open', 2, null, 300],
    ['CSRF en Formularios', 'Falta de protección CSRF en formularios sensibles', 'Medium', 'In Progress', 3, 4, 200],
    ['Path Traversal', 'Vulnerabilidad de path traversal en upload de archivos', 'High', 'Resolved', 4, 1, 400],
    ['Weak Password Policy', 'Política de contraseñas débil', 'Low', 'Open', 5, null, 100],
  ];

  vulnerabilities.forEach(vuln => {
    insertVulnerability.run(...vuln);
  });

  // Insertar items de la tienda
  const insertShopItem = db.prepare(`
    INSERT OR IGNORE INTO shop_items (name, description, type, price, image, rarity)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const shopItems = [
    ['Golden Avatar Frame', 'Marco dorado para tu avatar', 'Avatar', 500, '/images/golden-frame.png', 'Legendary'],
    ['Bug Hunter Badge', 'Insignia de cazador de bugs', 'Badge', 200, '/images/bug-hunter-badge.png', 'Rare'],
    ['Dark Theme', 'Tema oscuro para la plataforma', 'Theme', 150, '/images/dark-theme.png', 'Common'],
    ['Confetti Effect', 'Efecto de confeti al completar logros', 'Effect', 300, '/images/confetti-effect.png', 'Epic'],
    ['Rainbow Avatar', 'Avatar con efectos de arcoíris', 'Avatar', 400, '/images/rainbow-avatar.png', 'Epic'],
    ['Security Expert Badge', 'Insignia de experto en seguridad', 'Badge', 600, '/images/security-expert.png', 'Legendary'],
  ];

  shopItems.forEach(item => {
    insertShopItem.run(...item);
  });

  // Insertar retos de ejemplo
  const insertChallenge = db.prepare(`
    INSERT OR IGNORE INTO challenges (title, description, type, betPoints, status, participants)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const challenges = [
    ['Duelo de Vulnerabilidades', 'Encuentra más vulnerabilidades críticas en 24 horas', 'Individual', 100, 'Active', JSON.stringify([1, 2])],
    ['Batalla de Equipos', 'Equipo vs equipo en búsqueda de bugs', 'Team', 200, 'Active', JSON.stringify([1, 2, 3, 4])],
  ];

  challenges.forEach(challenge => {
    insertChallenge.run(...challenge);
  });

  // Insertar contribuciones de ejemplo
  const insertContribution = db.prepare(`
    INSERT OR IGNORE INTO contributions (userId, title, content, type, status, points)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const contributions = [
    [1, 'Guía de Seguridad Web', 'Completa guía sobre vulnerabilidades web comunes', 'Documentation', 'Approved', 150],
    [2, 'Reporte de Bug en API', 'Descripción detallada de vulnerabilidad encontrada', 'Bug Report', 'Pending', 200],
    [5, 'Tutorial de Pentesting', 'Tutorial paso a paso de pentesting básico', 'Tutorial', 'Approved', 300],
  ];

  contributions.forEach(contribution => {
    insertContribution.run(...contribution);
  });

  // Insertar actividades de ejemplo
  const insertActivity = db.prepare(`
    INSERT OR IGNORE INTO user_activities (userId, type, description, points, metadata)
    VALUES (?, ?, ?, ?, ?)
  `);

  const activities = [
    [1, 'vulnerability_resolved', 'Resolvió vulnerabilidad SQL Injection', 500, JSON.stringify({vulnerabilityId: 1})],
    [2, 'vulnerability_reported', 'Reportó vulnerabilidad XSS', 300, JSON.stringify({vulnerabilityId: 2})],
    [4, 'clan_created', 'Creó clan Security Masters', 100, JSON.stringify({clanId: 1})],
    [5, 'contribution_approved', 'Contribución aprobada: Tutorial de Pentesting', 300, JSON.stringify({contributionId: 3})],
  ];

  activities.forEach(activity => {
    insertActivity.run(...activity);
  });

  console.log('✅ Datos de ejemplo insertados correctamente');
};

module.exports = { seedData }; 