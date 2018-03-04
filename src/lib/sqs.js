const getConfig = require('../config/sqs')
const {
  SQS,
  Credentials,
} = require('aws-sdk')

const {
  endpoint,
  region,
} = getConfig()

const sqs = new SQS({
  region,
  endpoint,
})

module.exports = sqs
