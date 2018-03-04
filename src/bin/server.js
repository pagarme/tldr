require('dotenv').config()

const express = require('express')
const database = require('../database')

const app = express()

database.bootstrap()
  .then(() => app.listen(process.env.PORT))
  .then(() => {
    console.log(`Server ready and listening on port ${process.env.PORT}`)
  })

