const templateVersion = (receipt) => {
  if (receipt.capture_method && receipt.authorization_code) {
    return 'receipt-v2'
  }
  return 'receipt-v1'
}

module.exports = templateVersion
