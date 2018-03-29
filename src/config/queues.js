const {
  getConfig,
} = require('./')

const endpoint = process.env.RECEIPTS_QUEUE_URL

const config = {
  development: {
    receipts: {
      endpoint,
      concurrency: 10,
    },
  },
  test: {
    receipts: {
      endpoint: 'http://yopa:47195/queue/receipts',
      concurrency: 10,
    },
  },
  production: {
    receipts: {
      endpoint,
      concurrency: 10,
    },
  },
}

module.exports = getConfig(config)
