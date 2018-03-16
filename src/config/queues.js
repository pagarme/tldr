const {
  getConfig,
} = require('./')

const config = {
  development: {
    receipts: {
      endpoint: process.env.RECEIPTS_QUEUE_URL,
      concurrency: 10,
    },
  },
  test: {
    receipts: {
      endpoint: process.env.RECEIPTS_QUEUE_URL,
      concurrency: 10,
    },
  },
  production: {
    receipts: {
      endpoint: process.env.RECEIPTS_QUEUE_URL,
      concurrency: 10,
    },
  },
}

module.exports = getConfig(config)
