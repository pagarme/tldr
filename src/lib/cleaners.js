const { replace } = require('ramda')

const removeNaN = (val = '') => replace(/[^0-9]/g, '', val)

module.exports = removeNaN
