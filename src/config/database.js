const {
  getConfig,
} = require('./')

const config = {
  development: {
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: false,
  },
  test: {
    host: 'database',
    dialect: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'Tldr123$',
    logging: false,
  },
  production: {
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: false,
  },
}

module.exports = getConfig(config)
