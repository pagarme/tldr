const formatAccountType = require('../../src/lib/account-type')

describe('Account Type Lib', () => {
  test('formatAccountType should return \'Conta Corrente\' when account_type is \'conta_corrente\'', () => {
    expect(formatAccountType('conta_corrente')).toBe('Conta Corrente')
  })

  test('formatAccountType should return \'Conta Poupança\' when account_type is \'conta_poupanca\'', () => {
    expect(formatAccountType('conta_poupanca')).toBe('Conta Poupança')
  })

  test('formatAccountType should return \'Conta Corrente Conjunta\' when account_type is \'conta_corrente_conjunta\'', () => {
    expect(formatAccountType('conta_corrente_conjunta')).toBe('Conta Corrente Conjunta')
  })

  test('formatAccountType should return \'Conta Poupança Conjunta\' when account_type is \'conta_corrente_conjunta\'', () => {
    expect(formatAccountType('conta_poupanca_conjunta')).toBe('Conta Poupança Conjunta')
  })

  test('formatAccountType should return \'Desconhecido\' when account_type is invalid', () => {
    expect.assertions(3)
    expect(formatAccountType()).toBe('Desconhecido')
    expect(formatAccountType('')).toBe('Desconhecido')
    expect(formatAccountType('unknown')).toBe('Desconhecido')
  })
})
