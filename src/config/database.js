require('dotenv').config({path: process.env.DOTENV_PATH})

const {
  getConfig,
} = require('./')

let host
let database
let username
let password
let port

host = process.env.DATABASE_URL
database = process.env.DATABASE_NAME
username = process.env.DATABASE_USERNAME
password = process.env.DATABASE_PASSWORD
port = process.env.DATABASE_PORT

const config = {
  development: {
    host: 'database',
    dialect: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'Tldr123$',
    port: 5432,
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
