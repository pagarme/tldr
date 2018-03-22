require('dotenv').config()

const express = require('express')
const database = require('../database')
const {
  processReceipt,
  ReceiptsQueue,
} = require('../services/worker')

const app = express()
app.get('/_health_check', (req, res) => res.send())

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

database.bootstrap()
  .then(() => app.listen(process.env.PORT))
  .then(() => {
    console.log('Worker is up!')

    ReceiptsQueue.startProcessing(processReceipt, {
      keepMessages: true,
    })
  })

module.exports = app
