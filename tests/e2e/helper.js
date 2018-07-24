const receiptData = {
  transaction_id: 424242,
  receipt_id: 'abc-123',
  seller_id: 'loja123',
  seller_name: 'Loja 1 2 3',
  transaction_status: 'refunded',
  amount: 987,
  payment_date: '2018-03-02 10:12:25Z',
  event_date: '2018-03-22 15:12:25Z',
  card_holder_name: 'Senny Bings',
  card_number_last_digits: '1234',
  card_brand: 'VISA',
  installments: 2,
  phone_number: '+552227987654',
  cvm_pin: true,
  payment_method: 'credit_card',
  capture_method: 'emv',
  authorization_code: '4DDP1X',
  aid: '02199520',
}

module.exports = {
  receiptData,
}
