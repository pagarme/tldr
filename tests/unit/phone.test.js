const formatPhone = require('../../src/lib/phone')

describe('Phone Lib', () => {
  test('formatPhone should return \'(21) 98765-4321\' when given \'21987654321\'', () => {
    expect(formatPhone('21987654321')).toBe('(21) 98765-4321')
  })

  test('formatPhone should return \'(21) 3021-4567\' when given \'2130214567\'', () => {
    expect(formatPhone('2130214567')).toBe('(21) 3021-4567')
  })

  test('formatPhone should return the input when given an invalid phone', () => {
    expect(formatPhone('1234')).toBe('1234')
  })
})
