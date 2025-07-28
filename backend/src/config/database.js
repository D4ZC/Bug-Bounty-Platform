const { Sequelize } = require('sequelize');
const path = require('path');

// Configurar Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false, // Desactivar logs SQL
  define: {
    timestamps: true,
    underscored: true
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite conectado correctamente');
    
    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos');
    
  } catch (error) {
    console.error('Error conectando a SQLite:', error);
    process.exit(1);
  }
};

module.exports = sequelize;
module.exports.connectDB = connectDB; 