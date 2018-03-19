const {
  getConfig,
} = require('./')

let host
let database
let username
let password
let port

if (process.env.APP_ENV === 'live') {
  host = process.env.LIVE_DATABASE_URL
  database = process.env.LIVE_DATABASE_NAME
  username = process.env.LIVE_DATABASE_USERNAME
  password = process.env.LIVE_DATABASE_PASSWORD
  port = process.env.LIVE_DATABASE_PORT
} else if (process.env.APP_ENV === 'sandbox') {
  host = process.env.SANDBOX_DATABASE_URL
  database = process.env.SANDBOX_DATABASE_NAME
  username = process.env.SANDBOX_DATABASE_USERNAME
  password = process.env.SANDBOX_DATABASE_PASSWORD
  port = process.env.SANDBOX_DATABASE_PORT
} else {
  host = process.env.DATABASE_URL
  database = process.env.DATABASE_NAME
  username = process.env.DATABASE_USERNAME
  password = process.env.DATABASE_PASSWORD
  port = process.env.DATABASE_PORT
}

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
