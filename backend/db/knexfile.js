const path = require('path');

const dbPath = path.resolve(__dirname, '../../db/database.sqlite3');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
}; 