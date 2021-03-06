const {
  getConfig,
} = require('./')

const config = {
  development: {
    endpoint: process.env.SQS_HOST,
    region: 'yopa-local',
  },
  test: {
    endpoint: 'http://yopa:47195',
    region: 'yopa-local',
  },
  production: {
    endpoint: process.env.SQS_HOST,
    region: 'us-east-1',
  },
}

module.exports = getConfig(config)
