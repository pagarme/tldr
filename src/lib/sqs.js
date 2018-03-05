const AWS = require('aws-sdk')
const getConfig = require('../config/sqs')

const {
  SQS,
  Credentials,
} = AWS

AWS.config.update({
  region: 'us-east-1',
})

const {
  endpoint,
  region,
} = getConfig()

let sqs

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const credentials = new Credentials({
    accessKeyId: 'x',
    secretAccessKey: 'x',
  })

  sqs = new SQS({
    region,
    endpoint,
    credentials,
  })
} else {
  sqs = new SQS({
    region,
    endpoint,
  })
}

module.exports = sqs
