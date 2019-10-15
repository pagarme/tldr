const ejs = require('ejs')
const { merge } = require('ramda')
const formatMoney = require('../../src/lib/money')
const formatPhone = require('../../src/lib/phone')
const formatDate = require('../../src/lib/date')
const formatPaymentMethod = require('../../src/lib/payment-method')
const formatCaptureMethod = require('../../src/lib/capture-method')
const formatCardBrand = require('../../src/lib/card-brand')
const pickDescriptor = require('../../src/lib/descriptor')
const { formatReceipt } = require('../../src/lib/formatters')
const { receiptData } = require('./helper')

const TEMPLATE_PATH_STONE_MAIS = './views/pages/stone_mais/receipt-v2.ejs'
const TEMPLATE_PATH_LINK_ME = './views/pages/payment_link_app_transaction_created/receipt.ejs'

describe('Rendered receipt template', () => {
  describe('with a credit card', () => {
    let renderedTemplate

    beforeAll(async () => {
      const receipt = Object.assign({}, receiptData)

      const data = formatReceipt(receipt)

      return ejs.renderFile(
        TEMPLATE_PATH_STONE_MAIS,
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

    test('should have payment date \'02/03/2018 - 07:12\'', () => {
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
    test('should have \'AID\' \'02199520\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('02199520'))
    })
    test('should have \'Aplicação\' \'Cirrus\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Cirrus'))
    })
  })

  describe('with a debit card', () => {
    let renderedTemplate

    beforeAll(async () => {
      const data = {
        amount: formatMoney(receiptData.amount),
        phone_number: formatPhone(receiptData.phone_number),
        formated_payment_method: formatPaymentMethod('debit_card'),
        payment_method: 'debit_card',
        capture_method: formatCaptureMethod(receiptData.capture_method),
        card_brand: receiptData.card_brand,
        capitalized_card_brand: formatCardBrand(receiptData.card_brand),
        lowered_card_brand: receiptData.card_brand.toLowerCase(),
        payment_date: formatDate(receiptData.payment_date),
        descriptor: pickDescriptor(receiptData),
      }

      const receipt = {
        ...data,
        receipt: merge(receiptData, data),
      }

      return ejs.renderFile(
        TEMPLATE_PATH_STONE_MAIS,
        receipt,
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

  describe('with a boleto', () => {
    let renderedTemplate

    beforeAll(async () => {
      const data = {
        amount: formatMoney(receiptData.amount),
        formated_payment_method: formatPaymentMethod('boleto'),
        payment_method: 'boleto',
        payment_date: formatDate(receiptData.payment_date),
      }

      const receipt = {
        ...data,
        receipt: merge(receiptData, data),
      }

      return ejs.renderFile(
        TEMPLATE_PATH_LINK_ME,
        receipt,
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

    test('should have amount \'9,87\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('9,87'))
    })

    test('should have \'ID da transação\' \'12345\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('12345'))
    })

    test('should have \'Meio de pagamento\' \'Boleto\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('Boleto'))
    })

    test('should have \'AUT\' \'4DDP1X\'', () => {
      expect(renderedTemplate).toEqual(expect.stringContaining('4DDP1X'))
    })

    test('should not have \'Bandeira\'', () => {
      expect(renderedTemplate).not.toEqual(expect.stringContaining('Bandeira'))
    })

    test('should not have \'Últimos dígitos\'', () => {
      expect(renderedTemplate).not.toEqual(expect.stringContaining('Últimos digitos'))
    })

    test('should not have \'Este pagamento será registrado na fatura do seu cartão como pg\'', () => {
      expect(renderedTemplate).not.toEqual(expect.stringContaining('Este pagamento será registrado na fatura do seu cartão como pg'))
    })
  })

  describe('without cvm pin', () => {
    let renderedTemplate

    beforeAll(async () => {
      const data = {
        amount: formatMoney(receiptData.amount),
        phone_number: formatPhone(receiptData.phone_number),
        formated_payment_method: formatPaymentMethod(receiptData.payment_method),
        payment_method: receiptData.payment_method,
        capture_method: formatCaptureMethod(receiptData.capture_method),
        capitalized_card_brand: formatCardBrand(receiptData.card_brand),
        payment_date: formatDate(receiptData.payment_date),
        descriptor: pickDescriptor(receiptData),
        lowered_card_brand: receiptData.card_brand.toLowerCase(),
      }

      const receipt = {
        ...data,
        receipt: merge(receiptData, data),
      }

      return ejs.renderFile(
        TEMPLATE_PATH_STONE_MAIS,
        receipt,
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
  describe('without aid and application_label', () => {
    let renderedTemplate

    beforeAll(async () => {
      const data = {
        amount: formatMoney(receiptData.amount),
        phone_number: formatPhone(receiptData.phone_number),
        formated_payment_method: formatPaymentMethod(receiptData.payment_method),
        payment_method: receiptData.payment_method,
        capture_method: formatCaptureMethod(receiptData.capture_method),
        capitalized_card_brand: formatCardBrand(receiptData.card_brand),
        payment_date: formatDate(receiptData.payment_date),
        descriptor: pickDescriptor(receiptData),
        lowered_card_brand: receiptData.card_brand.toLowerCase(),
      }

      const receipt = {
        ...data,
        receipt: merge(receiptData, data),
      }

      return ejs.renderFile(
        TEMPLATE_PATH_STONE_MAIS,
        receipt,
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
    test('should not have AID', () => {
      expect(renderedTemplate).not.toBe(expect.stringContaining('02199520'))
    })
    test('should not have Aplicação', () => {
      expect(renderedTemplate).not.toBe(expect.stringContaining('Cirrus'))
    })
  })
})
