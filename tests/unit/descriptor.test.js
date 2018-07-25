const pickDescriptor = require('../../src/lib/descriptor')
const {
  mockReceiptDescriptorOne,
  mockReceiptDescriptorTwo,
  mockReceiptDescriptorThree,
} = require('./helper')

describe('Descriptor Lib', () => {
  test('pickDescriptor should prioritize the statement_descriptor', () =>
    expect(pickDescriptor(mockReceiptDescriptorOne)).toBe('pg *The Functional Dre'))

  test('pickDescriptor should use the soft_descriptor if it has no statement_descriptor', () =>
    expect(pickDescriptor(mockReceiptDescriptorTwo)).toBe('pg *The Functional Dre'))

  test('pickDescriptor should use the seller_name if it has no soft_descriptor', () =>
    expect(pickDescriptor(mockReceiptDescriptorThree)).toBe('pg *The Functional Dre'))

  test('pickDescriptor should default to \'Não Informado\' if there is no seller_name', () =>
    expect(pickDescriptor({})).toBe('pg *Pagar.me'))
})
