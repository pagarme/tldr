const app = require('../../src/bin/server')
const request = require('supertest')
const database = require('../../src/database')
const { receiptData } = require('./helper')

describe('API Tests', () => {
  beforeAll(async () => {
    await database.bootstrap()
    await database.Receipt.truncate()
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
            card_brand: 'VISA',
            installments: 2,
            phone_number: '+552227987654',
            cvm_pin: true,
            payment_method: 'credit_card',
            capture_method: 'emv',
            authorization_code: '4DDP1X',
          },
        })
      }))

  test('GET `/api/receipt/:id` with invalid id should return no data', () => {
    expect.assertions(2)
    return request(app)
      .get('/api/receipt/invalid-receipt-id')
      .then((response) => {
        expect(response.statusCode).toBe(404)
        expect(response.body).toMatchObject({
          data: {},
        })
      })
  })

  test('GET `/receipt/:id` with valid id should render receipt page', () => {
    return request(app)
      .get('/receipt/abc-123')
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('GET `/receipt/:id` with invalid id should render 404 page', () => {
    expect.assertions(2)
    return request(app)
      .get('/receipt/invalid-receipt-id')
      .then((response) => {
        const text = response.text.replace(/\n/g, '')
        const expectedResult = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Comprovante de Compra - Pagar.me</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="/static/images/favicon.png">
  <link href="https://fonts.googleapis.com/css?family=Hind:300,400,500,600,700" rel="stylesheet">
  <link rel="stylesheet" type="text/css" media="screen" href="/static/styles/404.css" />
</head>
<body>
  <div class="logo"></div>
  <h1>Seu recibo não foi encontrado :(</h1>
  <h4>Caso isso tenha sido um engano, tente novamente mais tarde!</h4>
  <h4>Se o problema persistir, entre em contato com seu vendedor.</h4>
  <h5>Código do recibo que você tentou usar<br />invalid-receipt-id</h5>
</body>
</html>  `.replace(/\n/g, '')

        expect(response.statusCode).toBe(200)
        expect(text).toBe(expectedResult)
      })
  })

  afterAll(database.sequelize.close)
})
