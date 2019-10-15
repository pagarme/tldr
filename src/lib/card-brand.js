const capitalize = ([first, ...rest]) => first.toUpperCase()
  + rest.join('').toLowerCase()

const formatCardBrand = (cardBrand = '') => (
  cardBrand
    ? capitalize(cardBrand)
    : ''
)

module.exports = formatCardBrand
