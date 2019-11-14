const removeNaN = require('./cleaners')

const formatCNPJ = (number = '') => (
  number.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  )
)

const formatCPF = (number = '') => (
  number.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  )
)

const documentToString = (number = '') => {
  const length = number
    ? number.length
    : 0

  if (length === 14) {
    return formatCNPJ(number)
  } else if (length === 11) {
    return formatCPF(number)
  }

  return number
}

const formatDocumentNumber = (documentNumber = '') => {
  const cleanedDocumentNumber = removeNaN(documentNumber)

  return documentToString(cleanedDocumentNumber)
}

module.exports = formatDocumentNumber
