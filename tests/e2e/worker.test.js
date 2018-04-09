const app = require('../../src/bin/worker')
const Promise = require('bluebird')
const request = require('supertest')
const database = require('../../src/database')
const { receiptData } = require('./helper')
const { processReceipt, ReceiptsQueue } = require('../../src/services/worker')

describe('Worker Tests', () => {
  beforeAll(async () => {
    await database.bootstrap()
    await database.Receipt.destroy({ where: {} })
    await ReceiptsQueue.push(receiptData)
    await Promise.delay(500)
  })

  test('GET `/_health_check` should respond with status code `200`', () =>
    request(app)
      .get('/_health_check')
      .then(response => expect(response.statusCode).toBe(200)))

  test('Should read message from queue and store on database', () =>
    database.Receipt.find({
      where: {
        receipt_id: receiptData.receipt_id,
      },
    })
      .then(receipt => expect(receipt).not.toBeNull()))

  test('`ReceiptsQueue` should have an error event listener', () => {
    const eventError = ReceiptsQueue.emit('error', {
      name: 'foo',
      stack: '',
      message: 'bar',
    })
    expect(eventError).toBeTruthy()
  })

  test('Processing with invalid arguments should return an empty object', () =>
    expect(processReceipt({}, {})).rejects.toThrowError('SequelizeValidationError'))

  afterAll(database.sequelize.close)
})
