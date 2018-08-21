const database = require('../database')
const responseHelper = require('../helpers/response')
const formatMoney = require('../lib/money')
const formatPhone = require('../lib/phone')
const formatDate = require('../lib/date')
const formatPaymentMethod = require('../lib/payment-method')
const formatCaptureMethod = require('../lib/capture-method')
const formatCardBrand = require('../lib/card-brand')
const templateVersion = require('../lib/template-version')
const { logger } = require('../helpers/escriba')

const getLastReceipt = (receiptId) => {
  logger.info('Retrieving receipt', {
    receiptId,
  })

  return database.Receipt.findOne({
    where: {
      receipt_id: receiptId,
    },
    order: database.sequelize.literal('event_date DESC'),
  })
}

const show = (req, res) => {
  const receiptId = req.params.receipt_id

  return getLastReceipt(receiptId)
    .then((receipt) => {
      if (!receipt) {
        logger.error('Receipt not found in database', {
          receiptId,
        })

        return null
      }

      const modifiedReceipt = receipt

      modifiedReceipt.statement_descriptor = `pg ${receipt.statement_descriptor}`.substring(0, 22)

      return modifiedReceipt
    })
    .then((receipt) => {
      const statusCode = receipt ? 200 : 404

      logger.info('Retrieved receipt', {
        receiptId,
        receipt,
      })

      return responseHelper.sendData(req, res, statusCode, receipt)
    })
    .catch((err) => {
      logger.error('Error while retrieving receipt', {
        receiptId,
        err,
      })
      logger.error(err)
    })
}

const render = (req, res) => {
  const receiptId = req.params.receipt_id

  return getLastReceipt(receiptId)
    .then((receipt) => {
      logger.info('Rendering receipt', {
        receiptId,
        receipt,
      })

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
      const receiptDescriptor = `pg ${receipt.statement_descriptor}`.substring(0, 22)
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
    .catch((err) => {
      logger.error('Error while rendering receipt', {
        receiptId,
        err,
      })
    })
}

module.exports = {
  show,
  render,
}
