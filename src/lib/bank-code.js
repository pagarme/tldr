const formatBankCode = (bankCode, bankInstitutions = []) => {
  const institution = bankInstitutions.find(item => (
    item.number_code === bankCode
  ))

  if (institution) {
    const {
      number_code: numberCode,
      name,
    } = institution

    return `${numberCode} - ${name}`
  }

  return ''
}

module.exports = formatBankCode
