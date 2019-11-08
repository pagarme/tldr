const moment = require('moment')

const formatDate = paymentDate =>
  moment(paymentDate).format('DD/MM/YYYY - HH:mm')

module.exports = formatDate
