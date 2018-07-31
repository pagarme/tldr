const sqs = require('../lib/sqs')
const database = require('../database')
const { prop } = require('ramda')
const { Queue } = require('sqs-quooler')
const getConfig = require('../config/queues')
const { logger } = require('../helpers/escriba')

const {
  endpoint,
  concurrency,
} = prop('receipts', getConfig)

const ReceiptsQueue = new Queue({
  sqs,
  endpoint,
  concurrency,
})

const processReceipt = (item, sqsMessage) => {
  logger.info('Processing new item', {
    item,
  })

  return database.Receipt.create(item)
    .then((receipt) => {
      logger.info('Inserted receipt for transaction', {
        receiptId: receipt.id,
        transactionId: receipt.transaction_id,
      })

      return ReceiptsQueue.remove(sqsMessage)
    })
    .then(() => logger.info('Removed entry from queue'))
    .catch((err) => {
      const error = {
        name: err.name,
        message: err.message,
        stack: err.stack,
      }

      logger.error('Error inserting entry', {
        item,
        error,
      })

      return null
    })
}

module.exports = {
  ReceiptsQueue,
  processReceipt,
}
