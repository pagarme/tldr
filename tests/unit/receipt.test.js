const ejs = require('ejs')
const formatMoney = require('../../src/lib/money')
const formatPhone = require('../../src/lib/phone')
const formatDate = require('../../src/lib/date')
const formatPaymentMethod = require('../../src/lib/payment-method')
const formatCaptureMethod = require('../../src/lib/capture-method')
const formatCardBrand = require('../../src/lib/card-brand')
const { receiptData } = require('./helper')

const TEMPLATE_PATH = './views/pages/receipt-v2.ejs'

describe('Rendered receipt template', () => {
  describe('with a credit card', () => {
    let renderedTemplate

    beforeAll(async () => {
      const receipt = Object.assign({}, receiptData)

      const data = {
        receiptAmount: formatMoney(receipt.amount),
        receiptPhone: formatPhone(receipt.phone_number),
        receiptPaymentMethod: formatPaymentMethod(receipt.payment_method),
        receiptCaptureMethod: formatCaptureMethod(receipt.capture_method),
        receiptCardBrand: formatCardBrand(receipt.card_brand),
        receiptDate: formatDate(receipt.payment_date),
        receiptDescriptor: receipt.statement_descriptor.substring(0, 18),
        receiptLowerCardBrand: receipt.card_brand.toLowerCase(),
        receipt,
      }

      return ejs.renderFile(
        TEMPLATE_PATH,
        data,
        {
          rmWhitespace: true,
        },
        (err, str) => {
          if (err) {
            throw err
          }

          renderedTemplate = str
        }
      )
    })

    test('should have seller name \'Loja 1 2 3\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Loja 1 2 3'))
    })

    test('should have payment date \'2018-03-02 10:12:25\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('02/03/2018 - 07:12'))
    })

    test('should have line \'na fatura do seu cartão como\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('na fatura do seu cartão como'))
    })

    test('should have soft descriptor \'pg* Loja 1 2 3\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('pg* Loja 1 2 3'))
    })

    test('should have amount \'9,87\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('9,87'))
    })

    test('should have installments \'2\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('2'))
    })

    test('should have \'Bandeira\' \'Visa Crédito\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Visa Crédito'))
    })

    test('should have \'Últimos dígitos\' \'4242\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('1234'))
    })

    test('should have \'ID da transação\' \'12345\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('12345'))
    })

    test('should have \'AUT\' \'4DDP1X\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('4DDP1X'))
    })

    test('should have \'Código do lojista\' \'loja123\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('loja123'))
    })

    test('should have \'AC\' \'ONL-CHIP\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('ONL-CHIP'))
    })

    test('should have line \'Transação autorizada mediante uso de senha pessoal', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Transação autorizada mediante uso de senha pessoal'))
    })
  })

  describe('with a debit card', () => {
    let renderedTemplate

    beforeAll(async () => {
      const receipt = Object.assign({}, receiptData)

      receipt.payment_method = 'debit_card'

      const data = {
        receiptAmount: formatMoney(receipt.amount),
        receiptPhone: formatPhone(receipt.phone_number),
        receiptPaymentMethod: formatPaymentMethod(receipt.payment_method),
        receiptCaptureMethod: formatCaptureMethod(receipt.capture_method),
        receiptCardBrand: formatCardBrand(receipt.card_brand),
        receiptDate: formatDate(receipt.payment_date),
        receiptDescriptor: receipt.statement_descriptor.substring(0, 18),
        receiptLowerCardBrand: receipt.card_brand.toLowerCase(),
        receipt,
      }

      return ejs.renderFile(
        TEMPLATE_PATH,
        data,
        {
          rmWhitespace: true,
        },
        (err, str) => {
          if (err) {
            throw err
          }
          renderedTemplate = str
        }
      )
    })

    test('should have seller name \'Loja 1 2 3\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Loja 1 2 3'))
    })

    test('should have payment date \'2018-03-02 10:12:25\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('02/03/2018 - 07:12'))
    })

    test('should have line \'no seu extrato como\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('no seu extrato como'))
    })

    test('should have statement descriptor \'pg* Loja 1 2 3\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('pg* Loja 1 2 3'))
    })

    test('should have amount \'9,87\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('9,87'))
    })

    test('should have \'à vista\' line', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('à vista'))
    })

    test('should not have installments \'2x\'', () => {
      expect(renderedTemplate).not.toEqual(expect.stringContaining('2x'))
    })

    test('should have \'Bandeira\' \'Visa Crédito\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Visa Débito'))
    })

    test('should have \'Últimos dígitos\' \'4242\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('1234'))
    })

    test('should have \'ID da transação\' \'12345\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('12345'))
    })

    test('should have \'AUT\' \'4DDP1X\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('4DDP1X'))
    })

    test('should have \'Código do lojista\' \'loja123\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('loja123'))
    })

    test('should have \'AC\' \'ONL-CHIP\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('ONL-CHIP'))
    })

    test('should have line \'Transação autorizada mediante uso de senha pessoal\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Transação autorizada mediante uso de senha pessoal'))
    })
  })

  describe('without cvm pin', () => {
    let renderedTemplate

    beforeAll(async () => {
      const receipt = Object.assign({}, receiptData)
      receipt.cvm_pin = false

      const data = {
        receiptAmount: formatMoney(receipt.amount),
        receiptPhone: formatPhone(receipt.phone_number),
        receiptPaymentMethod: formatPaymentMethod(receipt.payment_method),
        receiptCaptureMethod: formatCaptureMethod(receipt.capture_method),
        receiptCardBrand: formatCardBrand(receipt.card_brand),
        receiptDate: formatDate(receipt.payment_date),
        receiptDescriptor: receipt.statement_descriptor.substring(0, 18),
        receiptLowerCardBrand: receipt.card_brand.toLowerCase(),
        receipt,
      }

      return ejs.renderFile(
        TEMPLATE_PATH,
        data,
        {
          rmWhitespace: true,
        },
        (err, str) => {
          if (err) {
            throw err
          }
          renderedTemplate = str
        }
      )
    })

    test('should have seller name \'Loja 1 2 3\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Loja 1 2 3'))
    })

    test('should have payment date \'2018-03-02 10:12:25\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('02/03/2018 - 07:12'))
    })

    test('should have line \'na fatura do seu cartão como\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('na fatura do seu cartão como'))
    })

    test('should have statement descriptor \'pg* Loja 1 2 3\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('pg* Loja 1 2 3'))
    })

    test('should have amount \'9,87\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('9,87'))
    })

    test('should have installments \'2\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('2'))
    })

    test('should have \'Bandeira\' \'Visa Crédito\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Visa Crédito'))
    })

    test('should have \'Últimos dígitos\' \'4242\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('1234'))
    })

    test('should have \'ID da transação\' \'12345\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('12345'))
    })

    test('should have \'AUT\' \'4DDP1X\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('4DDP1X'))
    })

    test('should have \'Código do lojista\' \'loja123\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('loja123'))
    })

    test('should have \'AC\' \'ONL-CHIP\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('ONL-CHIP'))
    })

    test('should not have line \'Transação autorizada mediante uso de senha pessoal', () => {
      expect(renderedTemplate).not.toBe(expect.stringContaining('Transação autorizada mediante uso de senha pessoal'))
    })
  })
})
