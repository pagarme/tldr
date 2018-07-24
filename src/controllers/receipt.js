const database = require('../database')
const responseHelper = require('../helpers/response')
const formatMoney = require('../lib/money')
const formatPhone = require('../lib/phone')
const formatDate = require('../lib/date')
const formatSellerName = require('../lib/seller-name')
const formatPaymentMethod = require('../lib/payment-method')
const formatCaptureMethod = require('../lib/capture-method')
const formatCardBrand = require('../lib/card-brand')

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

      return receipt
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
      const receiptSellerName = formatSellerName(receipt.seller_name)
      const receiptPaymentMethod = formatPaymentMethod(receipt.payment_method)
      const receiptCaptureMethod = formatCaptureMethod(receipt.capture_method)
      const receiptCardBrand = formatCardBrand(receipt.card_brand)

      return res.render(
        'pages/receipt',
        {
          receipt,
          receiptAmount,
          receiptPhone,
          receiptDate,
          receiptSellerName,
          receiptPaymentMethod,
          receiptCaptureMethod,
          receiptCardBrand,
        }
      )
    })
}

module.exports = {
  show,
  render,
}
