require('dotenv').config();

module.exports = {
  development: {
    username: 'bookstore',
    password: 'bookstore',
    database: 'bookstore',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  migrationStorage: 'json',
  migrationStoragePath: 'sequelizeMeta.json',
  migrationStorageTableName: 'sequelize_meta',

  seederStorage: 'json',
  seederStoragePath: 'sequelizeData.json',
  seederStorageTableName: 'sequelize_data',
};
