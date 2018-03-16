const sqs = require('../lib/sqs')
const database = require('../database')
const { prop } = require('ramda')
const { Queue } = require('sqs-quooler')
const getConfig = require('../config/queues')

const {
  endpoint,
  concurrency,
} = prop('receipts', getConfig())

const ReceiptsQueue = new Queue({
  sqs,
  endpoint,
  concurrency,
})

const processReceipt = (item, sqsMessage) => {
  console.log()
  console.log('Processing new item')
  console.log(item)

  database.Receipt.create(item)
    .then((receipt) => {
      console.log(`Inserted receipt #${receipt.id} for transaction #${receipt.transaction_id}`)

      return ReceiptsQueue.remove(sqsMessage)
    })
    .then(() => console.log('Removed entry from queue'))
    .catch((err) => {
      console.error('Error inserting entry')
      console.error(item)

      throw err
    })
}

module.exports = {
  ReceiptsQueue,
  processReceipt,
}
