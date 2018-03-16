const {
  getConfig,
} = require('./')

const config = {
  development: {
    endpoint: `http://${process.env.SQS_HOST || 'yopa'}:47195`,
    region: 'yopa-local',
    accessKeyId: 'x',
    secretAccessKey: 'x',
    sessionToken: 'x',
  },
  test: {
    endpoint: `http://${process.env.SQS_HOST || 'yopa'}:47195`,
    region: 'yopa-local',
    accessKeyId: 'x',
    secretAccessKey: 'x',
    sessionToken: 'x',
  },
  production: {
    endpoint: 'sqs.us-east-1.amazonaws.com',
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
}

module.exports = getConfig(config)
