const request = require('supertest')
const app = require('../../src/bin/server')
const database = require('../../src/database')

describe('API Test', () => {
  const receiptData = {
    transaction_id: 424242,
    receipt_id: 'abc-123',
    seller_id: 'loja123',
    seller_name: 'Loja 1 2 3',
    transaction_status: 'refunded',
    amount: 987,
    payment_date: '2018-03-02 10:12:25Z',
    event_date: '2018-03-22 15:12:25Z',
    card_holder_name: 'Wilk Coelho Maia',
    card_number_last_digits: '1234',
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeAll(async () => {
    await database.bootstrap()
    await database.Receipt.destroy({ where: {} })
    await database.Receipt.create(receiptData)
  })

  test('GET `/_health_check` should respond with status code `200`', () =>
    request(app)
      .get('/_health_check')
      .then(response => expect(response.statusCode).toBe(200)))

  test('GET `/` should respond with status code `404`', () =>
    request(app)
      .get('/')
      .then(response => expect(response.statusCode).toBe(404)))

  test('GET `/receipt/:id` should match `receiptData`', () =>
    request(app)
      .get('/api/receipt/abc-123')
      .then((response) => {
        expect(response.body).toMatchObject({
          data: {
            transaction_id: 424242,
            receipt_id: 'abc-123',
            seller_id: 'loja123',
            seller_name: 'Loja 1 2 3',
            transaction_status: 'refunded',
            amount: 987,
            payment_date: '2018-03-02T10:12:25.000Z',
            event_date: '2018-03-22T15:12:25.000Z',
            card_holder_name: 'Wilk Coelho Maia',
            card_number_last_digits: '1234',
          },
        })
      }))

  afterAll(database.sequelize.close)
})
