function formatCNPJ (number = '') {
  return number.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  )
}

function formatCPF (number = '') {
  return number.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  )
}

function documentToString (number = '') {
  const length = number
    ? number.length
    : 0

  if (length > 11) {
    return formatCNPJ(number)
  } else if (length === 11) {
    return formatCPF(number)
  }

  return number
}

const formatDocumentNumber = (documentNumber = '') => {
  const cleanedDocumentNumber = documentNumber.replace(/[^0-9]+/g, '')

  return documentToString(cleanedDocumentNumber)
}

module.exports = formatDocumentNumber
