const { logger } = require('./escriba')

const fetchItemFromSQS = async (Queue) => {
  const {
    sqs,
    endpoint,
  } = Queue.options

  return sqs.receiveMessage({
    QueueUrl: endpoint,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 0,
  })
    .promise()
}

const canFetchFromSQS = async (Queue) => {
  try {
    await fetchItemFromSQS(Queue)

    return true
  } catch (err) {
    logger.error('Error on queue', err)
    return false
  }
}

module.exports = {
  canFetchFromSQS,
}
