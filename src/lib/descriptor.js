const { pathOr } = require('ramda')

const pickDescriptor = (receipt) => {
  const statementDescriptor = pathOr('', ['statement_descriptor'], receipt)
  const softDescriptor = pathOr('', ['soft_descriptor'], receipt)
  const sellerName = pathOr('', ['seller_name'], receipt)

  return statementDescriptor ||
    `pg *${(softDescriptor || sellerName || 'Pagar.me').substring(0, 18)}`
}

module.exports = pickDescriptor
