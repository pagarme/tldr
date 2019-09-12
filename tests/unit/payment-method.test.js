const formatPaymentMethod = require('../../src/lib/payment-method')

describe('Payment Method Lib', () => {
  test('formatPaymentMethod should return \'Crédito\' when payment_method is \'credit_card\'', () => {
    expect(formatPaymentMethod('credit_card')).toBe('Crédito')
  })

  test('formatPaymentMethod should return \'Débito\' when payment_method is \'debit_card\'', () => {
    expect(formatPaymentMethod('debit_card')).toBe('Débito')
  })

  test('formatPaymentMethod should return \'Boleto\' when payment_method is \'boleto\'', () => {
    expect(formatPaymentMethod('boleto')).toBe('Boleto')
  })

  test('formatPaymentMethod should return \'Desconhecido\' when payment_method is invalid', () => {
    expect(formatPaymentMethod('unknown')).toBe('Desconhecido')
  })
})
