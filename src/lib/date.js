const moment = require('moment')
const { logger } = require('../helpers/escriba')

const formatDate = (dateToFormat) => {
  if (dateToFormat) {
    try {
      const date = moment(dateToFormat)

      if (date.isValid()) {
        return moment(dateToFormat)
          .tz('America/Sao_Paulo')
          .format('DD/MM/YYYY - HH:mm')
      }

      throw new Error('Invalid date format')
    } catch (err) {
      logger.error(`${err.message} - ${dateToFormat}`)

      return ''
    }
  }

  return ''
}

module.exports = formatDate
