const formatDate = require('../../src/lib/date')

describe('Date Lib', () => {
  test('formatDate should return \'DD/MM/YYYY - HH:mm:SS\' for a valid input', () => {
    expect(formatDate('2018-03-02T10:12:25.000Z')).toBe('02/03/2018 - 10:12:25')
  })

  test('formatDate should return the input when given an invalid date', () => {
    expect(formatDate(124)).toBe(124)
  })
})
