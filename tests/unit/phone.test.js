const formatPhone = require('../../src/lib/phone')

describe('Phone Lib', () => {
  test('formatPhone should return \'+55 (21) 98765-4321\' when given \'+5521987654321\'', () => {
    expect(formatPhone('+5521987654321')).toBe('+55 (21) 98765-4321')
  })

  test('formatPhone should return \'(21) 3021-4567\' when given \'552130214567\'', () => {
    expect(formatPhone('552130214567')).toBe('+55 (21) 3021-4567')
  })

  test('formatPhone should return the input when given an invalid phone', () => {
    expect(formatPhone('1234')).toBe('1234')
  })
})
