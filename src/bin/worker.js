require('dotenv').config()

const express = require('express')
const database = require('../database')
const {
  processReceipt,
  ReceiptsQueue,
} = require('../services/worker')
const logger = require('../helpers/logger')('WORKER')

const app = express()

app.get('/_health_check', (req, res) => res.send())

ReceiptsQueue.on('error', (err) => {
  logger.error({
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
    logger.info('Worker is up!')

    ReceiptsQueue.startProcessing(processReceipt, {
      keepMessages: true,
    })
  })

module.exports = app
