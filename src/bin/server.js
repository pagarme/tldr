require('dotenv').config()

const express = require('express')
const database = require('../database')
const receiptController = require('../controllers/receipt')

const app = express()

app.get(
  '/api/receipt/:receipt_id',
  receiptController.show
)

database.bootstrap()
  .then(() => app.listen(process.env.PORT))
  .then(() => {
    console.log(`Server ready and listening on port ${process.env.PORT}`)
  })

