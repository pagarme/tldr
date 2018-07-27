require('dotenv').config({ path: process.env.DOTENV_PATH })
require('newrelic')
const express = require('express')
const minify = require('express-minify-html')
const database = require('../database')
const receiptController = require('../controllers/receipt')
const redirectHTTPMiddleware = require('../helpers/redirect-http')
const log4js = require('log4js')
const logger = require('../helpers/logger')('SERVER')

const app = express()
const allRoutesExceptHealthCheck = /^\/(?!_health_check(\/|$)).*$/i

app.use(allRoutesExceptHealthCheck, redirectHTTPMiddleware)

app.use(log4js.connectLogger(logger, { level: 'auto' }))

app.disable('x-powered-by')

app.use(minify({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true,
    minifyCSS: true,
  },
}))

app.set('view engine', 'ejs')
app.use('/static', express.static('views/pages/static'))

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

if (process.env.NODE_ENV !== 'test') {
  database.bootstrap()
    .then(() => app.listen(process.env.PORT))
    .then(() => {
      logger.info(`Server ready and listening on port ${process.env.PORT}`)
    })
}

module.exports = app
