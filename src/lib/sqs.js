const getConfig = require('../config/sqs')
const {
  SQS,
  Credentials,
} = require('aws-sdk')

const {
  endpoint,
  region,
  accessKeyId,
  secretAccessKey,
  sessionToken,
} = getConfig()

const credentials = new Credentials({
  accessKeyId,
  secretAccessKey,
  sessionToken,
})

const sqs = new SQS({
  region,
  endpoint,
  credentials,
})

module.exports = sqs
