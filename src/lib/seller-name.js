const formatSellerName = sellerName =>
  `pg *${sellerName.substring(0, 18)}`

module.exports = formatSellerName
