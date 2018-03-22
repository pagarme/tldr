const request = require('supertest')
const app = require('../../src/bin/server')
const database = require('../../src/database')

const receiptData = {
  transaction_id: 424242,
  receipt_id: 'abc-123',
  seller_id: 'loja123',
  seller_name: 'Loja 1 2 3',
  transaction_status: 'refunded',
  amount: 987,
  payment_date: '2018-03-02 10:12:25Z',
  event_date: '2018-03-22 15:12:25Z',
  card_holder_name: 'Senny Bings',
  card_number_last_digits: '1234',
}

describe('API Tests', () => {
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

  test('GET `/api/receipt/:id` with valid id should match `receiptData`', () =>
    request(app)
      .get('/api/receipt/abc-123')
      .then((response) => {
        expect(response.body).toEqual({
          data: {
            transaction_id: 424242,
            receipt_id: 'abc-123',
            seller_id: 'loja123',
            seller_name: 'Loja 1 2 3',
            transaction_status: 'refunded',
            amount: 987,
            payment_date: '2018-03-02T10:12:25.000Z',
            event_date: '2018-03-22T15:12:25.000Z',
            card_holder_name: 'Senny Bings',
            card_number_last_digits: '1234',
          },
        })
      }))

  test('GET `/api/receipt/:id` with invalid id should return no data', () =>
    request(app)
      .get('/api/receipt/invalid-receipt-id')
      .then((response) => {
        expect(response.body).toMatchObject({
          data: {},
        })
      }))

  test('GET `/receipt/:id` with valid id should render receipt page', () =>
    request(app)
      .get('/receipt/abc-123')
      .then((response) => {
        const text = response.text.replace(/\n/g, '')
        const expectedResult = `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Comprovante de Compra - Pagar.me</title>
  </head>

  <body>
    Comprovante:
    <br />
    {&#34;transaction_id&#34;:424242,&#34;receipt_id&#34;:&#34;abc-123&#34;,&#34;seller_id&#34;:&#34;loja123&#34;,&#34;seller_name&#34;:&#34;Loja 1 2 3&#34;,&#34;transaction_status&#34;:&#34;refunded&#34;,&#34;amount&#34;:987,&#34;payment_date&#34;:&#34;2018-03-02T10:12:25.000Z&#34;,&#34;event_date&#34;:&#34;2018-03-22T15:12:25.000Z&#34;,&#34;card_holder_name&#34;:&#34;Senny Bings&#34;,&#34;card_number_last_digits&#34;:&#34;1234&#34;}
  </body>
</html>`.replace(/\n/g, '')

        expect(text).toBe(expectedResult)
      }))

  test('GET `/receipt/:id` with invalid id should render 404 page', () =>
    request(app)
      .get('/receipt/invalid-receipt-id')
      .then((response) => {
        const text = response.text.replace(/\n/g, '')
        const expectedResult = `
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Comprovante de Compra - Pagar.me</title>
  </head>

  <body>
    Comprovante invalid-receipt-id não encontrado :(
  </body>
</html>`.replace(/\n/g, '')

        expect(text).toBe(expectedResult)
      }))

  afterAll(database.sequelize.close)
})
