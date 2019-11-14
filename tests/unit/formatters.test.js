const formatReceipt = require('../../src/lib/formatters')
const removeNaN = require('../../src/lib/cleaners')

describe('Formatters', () => {
  describe('removeNaN', () => {
    test('should return a string', () => {
      expect(removeNaN('aA123')).toBe('123')
      expect(removeNaN('.!aA123!.')).toBe('123')
      expect(removeNaN('!@#')).toBe('')
    })
  })

  describe('formatReceipt', () => {
    test('should return a minimal object', () => {
      const data = {}
      const expectedData = {
        receipt: {
          amount: '',
          buyer_account_type: 'Desconhecido',
          buyer_bank_code: '',
          buyer_document_number: '',
          capture_method: 'DESCONHECIDO',
          capitalized_card_brand: '',
          lowered_card_brand: '',
          card_brand: '',
          descriptor: 'pg *Pagar.me',
          payment_date: '',
          formated_payment_method: 'Desconhecido',
          payment_method: '',
          phone_number: '',
          refund_amount: '',
          refund_date: '',
        },
      }

      expect(formatReceipt(data)).toEqual(expectedData)
    })
    test('should a formated object', () => {
      const data = {
        dataValues: {
          amount: 1290,
          buyer_account_type: 'conta_corrente',
          buyer_bank_code: '100',
          buyer_document_number: '1.2.3.4.5.6.7.8.9.1.2',
          capture_method: 'emv',
          card_brand: 'visa',
          payment_date: '2018-03-02T10:12:25.000Z',
          refund_date: '2018-03-02T10:12:25.000Z',
          phone_number: '+551112345432',
          refund_amount: 2301,
          payment_method: 'credit_card',
          soft_descriptor: 'Descrição da fatura',
          seller_name: 'Vendedor',
        },
      }
      const bankInstitutions = {
        data: [{
          number_code: '100',
          name: 'Banco',
        }],
      }

      const expectedData = {
        receipt: {
          amount: '12,90',
          buyer_account_type: 'Conta Corrente',
          buyer_bank_code: '100 - Banco',
          buyer_document_number: '123.456.789-12',
          capture_method: 'ONL-CHIP',
          card_brand: 'visa',
          capitalized_card_brand: 'Visa',
          lowered_card_brand: 'visa',
          descriptor: 'pg *Descrição da fatur',
          payment_date: '02/03/2018 - 07:12',
          formated_payment_method: 'Crédito',
          payment_method: 'credit_card',
          phone_number: '+55 (11) 1234-5432',
          refund_amount: '23,01',
          refund_date: '02/03/2018 - 07:12',
          seller_name: 'Vendedor',
          soft_descriptor: 'Descrição da fatura',
        },
      }

      expect(formatReceipt(data, bankInstitutions)).toEqual(expectedData)
    })
  })
})
