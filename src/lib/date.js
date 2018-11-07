const moment = require('moment')

const formatDate = paymentDate =>
  moment(paymentDate).tz('America/Sao_Paulo')
    .format('DD/MM/YYYY - HH:mm')

module.exports = formatDate
