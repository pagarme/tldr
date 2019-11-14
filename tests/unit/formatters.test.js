const removeNaN = require('../../src/lib/formatters')

describe('Formatters', () => {
  describe('removeNaN', () => {
    test('should return a string', () => {
      expect(removeNaN('aA123')).toBe('123')
      expect(removeNaN('.!aA123!.')).toBe('123')
      expect(removeNaN('!@#')).toBe('')
    })
  })
})
