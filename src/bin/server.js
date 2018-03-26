require('dotenv').config()

const express = require('express')
const database = require('../database')
const receiptController = require('../controllers/receipt')
const redirectHTTPMiddleware = require('../helpers/redirect-http')
const log4js = require('log4js')

const app = express()
const logger = log4js.getLogger('SERVER')
logger.level = 'ALL'

const allRoutesExceptHealthCheck = /^\/(?!_health_check(\/|$)).*$/i

app.use(allRoutesExceptHealthCheck, redirectHTTPMiddleware)

app.use(log4js.connectLogger(logger, { level: 'auto' }))

app.disable('x-powered-by')

app.set('view engine', 'ejs')

app.get(
  '/api/receipt/:receipt_id',
  receiptController.show
)

app.get(
  '/receipt/:receipt_id',
  receiptController.render
)

app.get(
  '/_health_check',
  (req, res) => res.send()
)

database.bootstrap()
  .then(() => app.listen(process.env.PORT))
  .then(() => {
    logger.info(`Server ready and listening on port ${process.env.PORT}`)
  })

module.exports = app
