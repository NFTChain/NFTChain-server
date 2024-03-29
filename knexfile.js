require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_DEV,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
      tableName: 'db_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
