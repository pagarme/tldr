const capitalize = ([first, ...rest]) => first.toUpperCase()
  + rest.join('').toLowerCase()

const formatCardBrand = cardBrand => capitalize(cardBrand)

module.exports = formatCardBrand
