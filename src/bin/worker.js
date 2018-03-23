console.log('Begin worker service preparation')
require('dotenv').config({path: process.env.DOTENV_PATH})
console.log('Dotenv required')

console.log('Begin requirements')
const express = require('express')
console.log('Express required')
const database = require('../database')
console.log('Database required')
const {
  processReceipt,
  ReceiptsQueue,
} = require('../services/worker')
console.log('Worker required')
const log4js = require('log4js')
console.log('Log4js required')

console.log('Define express and logger')
const app = express()

console.log('Define health check route')
app.get('/_health_check', (req, res) => res.send())

console.log('Queue on')
ReceiptsQueue.on('error', (err) => {
  console.error({
    status: 'failed',
    metadata: {
      error_name: err.name,
      error_stack: err.stack,
      error_message: err.message,
    },
  })
})

console.log('Preparing for database bootstrap...')
database.bootstrap()
  .then(() => console.log('Database bootstraped!'))
  .then(() => app.listen(process.env.PORT))
  .then(() => {
    console.log('Worker is up!')

    ReceiptsQueue.startProcessing(processReceipt, {
      keepMessages: true,
    })
  })

module.exports = app
