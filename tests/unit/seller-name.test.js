const formatSellerName = require('../../src/lib/seller-name')

describe('Seller Name Lib', () => {
  test('formatSellerName should append `pg *` and truncate the name to 18 characters', () => {
    expect(formatSellerName('The Functional Dream Ltda.')).toBe('pg *The Functional Dre')
  })
})
