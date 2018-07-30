const database = require('../database')
const responseHelper = require('../helpers/response')
const formatMoney = require('../lib/money')
const formatPhone = require('../lib/phone')
const formatDate = require('../lib/date')
const formatPaymentMethod = require('../lib/payment-method')
const formatCaptureMethod = require('../lib/capture-method')
const formatCardBrand = require('../lib/card-brand')
const pickDescriptor = require('../lib/descriptor')
const templateVersion = require('../lib/template-version')

const getLastReceipt = receiptId =>
  database.Receipt.findOne({
    where: {
      receipt_id: receiptId,
    },
    order: database.sequelize.literal('event_date DESC'),
  })

const show = (req, res) => {
  const receiptId = req.params.receipt_id

  return getLastReceipt(receiptId)
    .then((receipt) => {
      if (!receipt) {
        return null
      }

      const receiptData = receipt

      receiptData.soft_descriptor = receipt.statement_descriptor
      receiptData.statement_descriptor = null

      return receiptData
    })
    .then((receipt) => {
      const statusCode = receipt ? 200 : 404

      return responseHelper.sendData(req, res, statusCode, receipt)
    })
}

const render = (req, res) => {
  const receiptId = req.params.receipt_id

  return getLastReceipt(receiptId)
    .then((receipt) => {
      if (!receipt) {
        return res.render(
          'pages/404',
          {
            receiptId,
          }
        )
      }

      const receiptAmount = formatMoney(receipt.amount)
      const receiptPhone = formatPhone(receipt.phone_number)
      const receiptDate = formatDate(receipt.payment_date)
      const receiptPaymentMethod = formatPaymentMethod(receipt.payment_method)
      const receiptCaptureMethod = formatCaptureMethod(receipt.capture_method)
      const receiptCardBrand = formatCardBrand(receipt.card_brand)
      const receiptDescriptor = pickDescriptor(receipt)
      const receiptLowerCardBrand = receipt.card_brand.toLowerCase()

      const receiptVersion = templateVersion(receipt)

      return res.render(
        `pages/${receiptVersion}`,
        {
          receipt,
          receiptAmount,
          receiptPhone,
          receiptDate,
          receiptPaymentMethod,
          receiptCaptureMethod,
          receiptCardBrand,
          receiptDescriptor,
          receiptLowerCardBrand,
        }
      )
    })
}

module.exports = {
  show,
  render,
}
