const {
  getConfig,
} = require('./')

let endpoint

if (process.env.APP_ENV === 'live') {
  endpoint = process.env.LIVE_RECEIPTS_QUEUE_URL
} else if (process.env.APP_ENV === 'sandbox') {
  endpoint = process.env.SANDBOX_RECEIPTS_QUEUE_URL
} else {
  endpoint = process.env.RECEIPTS_QUEUE_URL
}

const config = {
  development: {
    receipts: {
      endpoint,
      concurrency: 10,
    },
  },
  test: {
    receipts: {
      endpoint,
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
