const { merge, pathOr } = require('ramda')
const formatMoney = require('./money')
const formatPhone = require('./phone')
const formatDate = require('./date')
const formatPaymentMethod = require('./payment-method')
const formatCaptureMethod = require('./capture-method')
const formatAccountType = require('./account-type')
const formatCardBrand = require('./card-brand')
const pickDescriptor = require('./descriptor')
const formatBankCode = require('./bank-code')
const formatDocumentNumber = require('./document-number')

const formatReceipt = (receipt = {}, bankInstitutions) => {
  const receiptValues = pathOr(receipt, ['dataValues'], receipt)

  const amount = formatMoney(pathOr(null, ['amount'], receiptValues))
  const refundAmount = formatMoney(pathOr(null, ['refund_amount'], receiptValues))
  const captureMethod = formatCaptureMethod(pathOr(null, ['capture_method'], receiptValues))
  const cardBrand = pathOr('', ['card_brand'], receiptValues)
  const capitalizedCardBrand = formatCardBrand(cardBrand)
  const loweredCardBrand = cardBrand.toLowerCase()
  const refundDate = formatDate(pathOr('', ['refund_date'], receiptValues))
  const paymentDate = formatDate(pathOr('', ['payment_date'], receiptValues))
  const paymentMethod = pathOr('', ['payment_method'], receiptValues)
  const formatedPaymentMethod = formatPaymentMethod(paymentMethod)
  const phoneNumber = formatPhone(pathOr('', ['phone_number'], receiptValues))
  const buyerAccountType = formatAccountType(pathOr('', ['buyer_account_type'], receiptValues))
  const buyerBankCode = pathOr('', ['buyer_bank_code'], receiptValues)
  const buyerDocumentNumber = formatDocumentNumber(pathOr('', ['buyer_document_number'], receiptValues))
  const bankInstitutionsData = pathOr([{}], ['data'], bankInstitutions)

  const formattedReceipt = merge(receiptValues, {
    amount,
    refund_amount: refundAmount,
    capture_method: captureMethod,
    card_brand: cardBrand,
    capitalized_card_brand: capitalizedCardBrand,
    lowered_card_brand: loweredCardBrand,
    descriptor: pickDescriptor(receiptValues),
    refund_date: refundDate,
    payment_date: paymentDate,
    payment_method: paymentMethod,
    formated_payment_method: formatedPaymentMethod,
    phone_number: phoneNumber,
    buyer_account_type: buyerAccountType,
    buyer_bank_code: formatBankCode(
      buyerBankCode.toString(),
      bankInstitutionsData
    ),
    buyer_document_number: buyerDocumentNumber,
  })

  return { ...formattedReceipt }
}

module.exports = formatReceipt
