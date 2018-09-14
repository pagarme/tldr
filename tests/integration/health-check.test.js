const { clone } = require('ramda')

const { canFetchFromSQS } = require('../../src/helpers/health-check')
const { ReceiptsQueue } = require('../../src/services/worker')


describe('Healthcheck helper', () => {
  describe('with invalid queue', () => {
    let InvalidQueue

    beforeAll(() => {
      InvalidQueue = clone(ReceiptsQueue)
      InvalidQueue.options.endpoint = ''
    })

    test('\'canFetchFromSQS\' should return \'false\'', async () => {
      expect.assertions(1)
      await expect(canFetchFromSQS(InvalidQueue)).resolves.toBe(false)
    })
  })

  describe('with valid queue', () => {
    test('\'canFetchFromSQS\' should return \'true\'', async () => {
      expect.assertions(1)
      await expect(canFetchFromSQS(ReceiptsQueue)).resolves.toBe(true)
    })
  })
})
