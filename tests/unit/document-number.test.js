const formatDocumentNumber = require('../../src/lib/document-number')

describe('Money Lib', () => {
  test('formatDocumentNumber should return a string when given a correct input', () => {
    expect.assertions(5)

    expect(formatDocumentNumber('1111111111')).toBe('1111111111')
    expect(formatDocumentNumber('11111111111')).toBe('111.111.111-11')
    expect(formatDocumentNumber('A1.1.1.1.1.1.1.1.1.1.1A')).toBe('111.111.111-11')
    expect(formatDocumentNumber('69266297000138')).toBe('69.266.297/0001-38')
    expect(formatDocumentNumber('A6.9.2.6.6.2.9.7.0.0.0.1.3.8A')).toBe('69.266.297/0001-38')
  })

  test('formatDocumentNumber should return `\'\'` when given a incorrent input', () => {
    expect.assertions(3)

    expect(formatDocumentNumber('!A')).toBe('')
    expect(formatDocumentNumber('')).toBe('')
    expect(formatDocumentNumber()).toBe('')
  })
})
