const { propOr } = require('ramda')

const pickDescriptor = (receipt) => {
  const statementDescriptor = propOr('', 'statement_descriptor', receipt)
  const softDescriptor = propOr('', 'soft_descriptor', receipt)
  const sellerName = propOr('', 'seller_name', receipt)

  return statementDescriptor ||
    `pg *${(softDescriptor || sellerName || 'Pagar.me').substring(0, 18)}`
}

module.exports = pickDescriptor
