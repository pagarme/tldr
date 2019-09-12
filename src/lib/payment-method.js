const formatPaymentMethod = (paymentMethod) => {
  switch (paymentMethod) {
    case 'debit_card': return 'Débito'
    case 'credit_card': return 'Crédito'
    case 'boleto': return 'Boleto'
    default: return 'Desconhecido'
  }
}

module.exports = formatPaymentMethod
