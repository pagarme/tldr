const moment = require('moment-timezone')

const formatDate = paymentDate =>
  moment(paymentDate).tz('America/Sao_Paulo')
    .format('DD/MM/YYYY - HH:mm')

module.exports = formatDate
