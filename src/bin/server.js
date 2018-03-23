require('dotenv').config({path: process.env.DOTENV_PATH})

const express = require('express')
const database = require('../database')
const receiptController = require('../controllers/receipt')
const redirectHTTPMiddleware = require('../helpers/redirect-http')

const app = express()

const allRoutesExceptHealthCheck = /^\/(?!_health_check(\/|$)).*$/i
app.use(allRoutesExceptHealthCheck, redirectHTTPMiddleware)

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
    console.log(`Server ready and listening on port ${process.env.PORT}`)
  })

module.exports = app
