const formatDate = require('../../src/lib/date')

describe('Date Lib', () => {
  test('formatDate should return \'DD/MM/YYYY - HH:mm:SS\' for a valid input', () => {
    expect(formatDate('2018-03-02T10:12:25.000Z')).toBe('02/03/2018 - 07:12')
  })

  test('formatDate should return UNIX epoch `-10800` when given an invalid date', () => {
    expect(formatDate(0)).toBe('')
  })

  test('formatDate should return \'\' when given an invalid date', () => {
    expect(formatDate(new Error('Oooops!'))).toBe('')
    expect(formatDate()).toBe('')
    expect(formatDate('')).toBe('')
    expect(formatDate('abcd')).toBe('')
  })
})
