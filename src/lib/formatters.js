const { replace } = require('ramda')

const removeNaN = replace(/[^0-9]/g, '')

module.exports = removeNaN
