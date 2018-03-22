const database = require('../database')
const responseHelper = require('../helpers/response')

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

      return res.render(
        'pages/receipt',
        {
          receipt,
        }
      )
    })
}

module.exports = {
  show,
  render,
}
