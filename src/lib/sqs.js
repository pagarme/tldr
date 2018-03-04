const AWS = require('aws-sdk')
const getConfig = require('../config/sqs')

const {
  SQS,
} = AWS

AWS.config.update({
  region: 'us-east-1',
})

const {
  endpoint,
  region,
} = getConfig()

const sqs = new SQS({
  region,
  endpoint,
})

module.exports = sqs
