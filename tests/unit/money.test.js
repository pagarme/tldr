const formatMoney = require('../../src/lib/money')

describe('Money Lib', () => {
  test('formatMoney should return a string when given a correct input', () => {
    expect.assertions(9)
    expect(formatMoney(1)).toBe('0,01')
    expect(formatMoney(12)).toBe('0,12')
    expect(formatMoney(123)).toBe('1,23')
    expect(formatMoney(1234)).toBe('12,34')
    expect(formatMoney(12345, '.', '.')).toBe('123.45')
    expect(formatMoney(123456, '.')).toBe('1.234,56')
    expect(formatMoney(1234567, ',', ',')).toBe('12,345,67')
    expect(formatMoney(12345678, ',', '.')).toBe('123,456.78')
    expect(formatMoney(123456789, '-', 'x')).toBe('1-234-567x89')
  })

  test('formatMoney should return `\'\'` when given `NaN`', () => {
    expect.assertions(3)
    expect(formatMoney('invalid')).toBe('')
    expect(formatMoney('123abc')).toBe('')
    expect(formatMoney('')).toBe('')
  })
})
