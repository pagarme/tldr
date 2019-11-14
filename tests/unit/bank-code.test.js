const formatBankCode = require('../../src/lib/bank-code')

describe('Bank Code Lib', () => {
  test('formatBankCode should return ""', () => {
    const bankCode = '000'
    const bankInstitutions = [{
      number_code: '001',
      name: 'Banco',
    }]

    const result = formatBankCode(bankCode, bankInstitutions)

    expect(result).toBe('')
  })

  test('formatBankCode should return \'000 - Banco\'', () => {
    const bankCode = '000'
    const bankInstitutions = [{
      number_code: '000',
      name: 'Banco',
    }]

    const result = formatBankCode(bankCode, bankInstitutions)

    expect(result).toBe('000 - Banco')
  })
})
