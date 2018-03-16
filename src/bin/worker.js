const database = require('../database')
const {
  processReceipt,
  ReceiptsQueue,
} = require('../services/worker')

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
  .then(() => {
    ReceiptsQueue.startProcessing(processReceipt, {
      keepMessages: true,
    })

    console.log('Worker is up!')
  })

