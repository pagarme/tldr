const capitalize = str => (
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
)

const formatCardBrand = (cardBrand = '') => (
  cardBrand
    ? capitalize(cardBrand)
    : ''
)

module.exports = formatCardBrand
