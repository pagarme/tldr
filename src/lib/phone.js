const formatPhone = (phoneNumber) => {
  let phone = phoneNumber

  if (phoneNumber[0] === '+') {
    phone = phoneNumber.slice(1, phone.length)
  }

  if (
    phone.length < 12 ||
    phone.length > 13 ||
    !phone.startsWith('55')
  ) {
    return phone
  }

  const trailingDigit = phone.length - 12

  return `+${phone.slice(0, 2)} (${phone.slice(2, 4)}) \
${phone.slice(4, 8 + trailingDigit)}\
-${phone.slice(8 + trailingDigit, phone.length)}`
}

module.exports = formatPhone
