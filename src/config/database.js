require('dotenv').config({ path: process.env.DOTENV_PATH })

const {
  getConfig,
} = require('./')

const host = process.env.DATABASE_URL
const database = process.env.DATABASE_NAME
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const port = process.env.DATABASE_PORT

const config = {
  development: {
    host,
    dialect: 'postgres',
    database,
    username,
    password,
    port,
    logging: false,
  },
  test: {
    host: 'test-database',
    dialect: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'Tldr123$',
    port: 5432,
    logging: false,
  },
  production: {
    host,
    dialect: 'postgres',
    database,
    username,
    password,
    port,
    logging: false,
  },
}

module.exports = getConfig(config)
