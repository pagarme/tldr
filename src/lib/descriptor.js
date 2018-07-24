const pickDescriptor = ({
  statement_descriptor: statementDescriptor,
  soft_descriptor: softDescriptor,
  seller_name: sellerName,
}) =>
  statementDescriptor ||
  `pg *${(softDescriptor || sellerName || 'Pagar.me').substring(0, 18)}`

module.exports = pickDescriptor
