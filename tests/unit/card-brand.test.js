const formatCardBrand = require('../../src/lib/card-brand')

describe('Card Brand Lib', () => {
  test('formatCardBrand should return \'Visa\' when card_brand is \'visa\'', () => {
    expect(formatCardBrand('visa')).toBe('Visa')
  })

  test('formatCardBrand should return \'Visa\' when card_brand is \'Visa\'', () => {
    expect(formatCardBrand('Visa')).toBe('Visa')
  })

  test('formatCardBrand should return \'Visa\' when card_brand is \'VISA\'', () => {
    expect(formatCardBrand('visa')).toBe('Visa')
  })

  test('formatCardBrand should return \'\' when card_brand is undefined', () => {
    expect(formatCardBrand()).toBe('')
  })
})
