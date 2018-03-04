const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const Sequelize = require('sequelize')

const fsPromise = Promise.promisifyAll(fs)
const db = {
  Sequelize,
}

const databaseHost = process.env.DATABASE_URL
const databasePort = process.env.DATABASE_PORT
const databaseName = process.env.DATABASE_NAME
const databaseUsername = process.env.DATABASE_USERNAME
const databasePassword = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(
  databaseName,
  databaseUsername,
  databasePassword,
  {
    host: databaseHost,
    port: databasePort,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    logging: false,
  }
)
db.sequelize = sequelize

const readModelFiles = () =>
  fsPromise.readdirAsync(path.join(__dirname, 'models'))
    .filter(file => (file !== 'index.js') && (file.slice(-3) === '.js'))
    .map((file) => {
      const model = sequelize.import(path.join(__dirname, 'models/', file))

      db[model.name] = model

      return model
    })
    .each((model) => {
      if (model.associate) {
        model.associate(db)
      }
    })
    .catch((err) => {
      console.error('Error reading model files')
      throw err
    })

const bootstrap = () =>
  readModelFiles()
    .then(() => db.sequelize.sync({ force: false }))
    .catch((err) => {
      console.error('Error bootstraping application')
      throw err
    })
db.bootstrap = bootstrap

module.exports = db

