const axios = require('axios')

const database = require('../database')
const responseHelper = require('../helpers/response')
const templateVersion = require('../lib/template-version')
const { logger } = require('../helpers/escriba')
const { formatReceipt } = require('../lib/formatters')

const getLastReceipt = (receiptId, loggerId) => {
  logger.info('Retrieving receipt', {
    receiptId,
    id: loggerId,
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
  const loggerId = req.id

  return getLastReceipt(receiptId, loggerId)
    .then((receipt) => {
      if (!receipt) {
        logger.error('Receipt not found in database', {
          receiptId,
          id: loggerId,
        })

        return null
      }

      return receipt
    })
    .then((receipt) => {
      const statusCode = receipt ? 200 : 404

      logger.info('Retrieved receipt', {
        receiptId,
        receipt,
        id: loggerId,
      })

      return responseHelper.sendData(req, res, statusCode, receipt)
    })
    .catch((err) => {
      logger.error('Error while retrieving receipt', {
        receiptId,
        err,
        id: loggerId,
      })
    })
}

const render = async (req, res) => {
  const receiptId = req.params.receipt_id
  const loggerId = req.id

  try {
    let bankInstitutionsData = []
    const receipt = await getLastReceipt(receiptId)
    const receiptData = await receipt.dataValues

    if (!receiptData) {
      return res.render(
        'pages/404',
        {
          receiptId,
        }
      )
    }

    if (receipt.template_type === 'payment_link_app_transaction_refunded') {
      bankInstitutionsData = await axios.get('https://api.openbank.stone.com.br/api/v1/institutions')
    }

    const formatedReceipt = formatReceipt(receipt, bankInstitutionsData)
    const templateType = formatedReceipt.template_type || 'stone_mais'
    const fileName = templateType === 'stone_mais'
      ? templateVersion(receipt)
      : 'receipt'
    const filePath = `pages/${templateType}/${fileName}`

    return res.render(
      filePath,
      {
        receipt: formatedReceipt,
      }
    )
  } catch (err) {
    logger.error('Error while rendering receipt', {
      receiptId,
      err,
      id: loggerId,
    })

    return res.render(
      'pages/404',
      {
        receiptId,
      }
    )
  }
}

module.exports = {
  show,
  render,
}
