const request = require('supertest')
const app = require('../../src/bin/server')

describe('HTTP Redirection Test', () => {
  let prevEnv

  beforeAll(() => {
    prevEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
  })

  test('GET `/` should respond with status code `302`', () =>
    request(app)
      .get('/')
      .then(response => expect(response.statusCode).toBe(302)))

  test('POST `/` should respond with status code `307`', () =>
    request(app)
      .post('/')
      .then(response => expect(response.statusCode).toBe(307)))

  afterAll(() => {
    process.env.NODE_ENV = prevEnv
  })
})
