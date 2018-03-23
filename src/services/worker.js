const sqs = require('../lib/sqs')
const database = require('../database')
const { prop } = require('ramda')
const { Queue } = require('sqs-quooler')
const getConfig = require('../config/queues')
const logger = require('../helpers/logger')('WORKER')

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
  console.info(`Processing new item:\n${JSON.stringify(item)}`)

  return database.Receipt.create(item)
    .then((receipt) => {
      console.info(`Inserted receipt #${receipt.id} for transaction #${receipt.transaction_id}`)

      return ReceiptsQueue.remove(sqsMessage)
    })
    .then(() => console.info('Removed entry from queue'))
    .catch((err) => {
      console.error(`Error inserting entry: \n${JSON.stringify(item)}`)
      return Promise.reject(new Error(err))
    })
}

module.exports = {
  ReceiptsQueue,
  processReceipt,
}
