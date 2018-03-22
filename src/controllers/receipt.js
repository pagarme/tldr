const { omit } = require('ramda')
const database = require('../database')
const responseHelper = require('../helpers/response')

const show = (req, res) => {
  const receiptId = req.params.receipt_id

  return database.Receipt.findOne({
    where: {
      receipt_id: receiptId,
    },
  })
    .then((receipt) => {
      if (!receipt) {
        return null
      }

      return database.Receipt.responseObjectBuilder(receipt)
    })
    .then((receipt) => {
      const statusCode = receipt ? 200 : 404

      return responseHelper.sendData(req, res, statusCode, receipt)
    })
}

const render = (req, res) => {
  const receiptId = req.params.receipt_id

  return database.Receipt.findOne({
    where: {
      receipt_id: receiptId,
    },
  })
    .then((receipt) => {
      if (!receipt) {
        return res.render(
          'pages/404',
          {
            receiptId,
          }
        )
      }

      const receiptData = omit(
        ['id'],
        database.Receipt.responseObjectBuilder(receipt)
      )

      return res.render(
        'pages/receipt',
        {
          receipt: receiptData,
        }
      )
    })
}

module.exports = {
  show,
  render,
}
