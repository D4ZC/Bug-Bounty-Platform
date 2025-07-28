const { connectDB } = require('../config/database');
const User = require('../models/User');
require('dotenv').config();

const initDatabase = async () => {
  try {
    // Conectar a SQLite
    await connectDB();
    
    console.log('Conectado a SQLite');
    
    // Verificar si el usuario Ocampo ya existe
    const existingUser = await User.findOne({ 
      where: { email: 'ocampoale250806@gmail.com' } 
    });
    
    if (existingUser) {
      console.log('Usuario Ocampo ya existe en la base de datos');
      console.log(`ID: ${existingUser.id}`);
      console.log(`Email: ${existingUser.email}`);
      console.log(`Nombre: ${existingUser.firstName} ${existingUser.lastName}`);
      console.log(`Username: ${existingUser.username}`);
      console.log(`Rol: ${existingUser.role}`);
      console.log(`Contraseña hasheada: ${existingUser.password ? 'Sí' : 'No'}`);
    } else {
      // Crear usuario Ocampo
      const ocampoUser = await User.create({
        firstName: 'Ocampo',
        lastName: 'Alejandra',
        email: 'ocampoale250806@gmail.com',
        username: 'ocampo',
        password: '123456',
        role: 'admin',
        points: 1000,
        rank: 1,
        isMVP: true,
        avatar: 'avatar1.png',
        isActive: true,
        emailVerified: true
      });
      
      console.log('Usuario Ocampo creado exitosamente:');
      console.log(`ID: ${ocampoUser.id}`);
      console.log(`Email: ${ocampoUser.email}`);
      console.log(`Nombre: ${ocampoUser.firstName} ${ocampoUser.lastName}`);
      console.log(`Username: ${ocampoUser.username}`);
      console.log(`Rol: ${ocampoUser.role}`);
      console.log(`Contraseña hasheada: ${ocampoUser.password ? 'Sí' : 'No'}`);
    }
    
    // Mostrar estadísticas
    const totalUsers = await User.count();
    console.log(`\nTotal de usuarios en la base de datos: ${totalUsers}`);
    
    const allUsers = await User.findAll({
      attributes: ['firstName', 'lastName', 'email', 'username', 'role']
    });
    console.log('\nUsuarios en la base de datos:');
    allUsers.forEach(user => {
      console.log(`- ${user.firstName} ${user.lastName} (${user.email}) - @${user.username} - ${user.role}`);
    });
    
    console.log('\nBase de datos inicializada correctamente');
    
  } catch (error) {
    console.error('Error inicializando la base de datos:', error);
    process.exit(1);
  }
};

// Ejecutar si este archivo se ejecuta directamente
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase; 