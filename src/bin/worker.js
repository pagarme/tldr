require('dotenv').config({ path: process.env.DOTENV_PATH })
require('newrelic')
require('dd-trace').init()
const express = require('express')
const database = require('../database')
const {
  processReceipt,
  ReceiptsQueue,
} = require('../services/worker')
const { httpLogger, logger } = require('../helpers/escriba')
const { canFetchFromSQS } = require('../helpers/health-check')

const app = express()

app.use(httpLogger)

app.get('/_health_check', async (req, res) => {
  const isSQSWorking = await canFetchFromSQS(ReceiptsQueue)

  if (isSQSWorking) {
    return res.sendStatus(200)
  }

  return res.sendStatus(500)
})

ReceiptsQueue.on('error', (err) => {
  logger.error('Error on queue', {
    status: 'failed',
    metadata: {
      error_name: err.name,
      error_stack: err.stack,
      error_message: err.message,
    },
  })
})

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection', {
    rejectedPromise: p,
    reason,
  })
  return process.exit(1)
})

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    error,
  })
  return process.exit(1)
})

database.bootstrap()
  .then(() => logger.info('Database bootstraped!'))
  .then(() => app.listen(process.env.PORT))
  .then(() => {
    logger.info('Worker is up!')

    ReceiptsQueue.startProcessing(processReceipt, {
      keepMessages: true,
    })
  })

module.exports = app
