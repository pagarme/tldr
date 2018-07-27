const receiptData = {
  transaction_id: 12345,
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
  application_cryptogram: '5EC8B98ABC8F9E7597647CBCB9A75400',
  soft_descriptor: 'Loja 1 2 3',
  statement_descriptor: 'pg* Loja 1 2 3',
}

const mockReceiptDescriptorOne = {
  statement_descriptor: 'pg *The Functional Dre',
  soft_descriptor: 'The Functional Dream',
  seller_name: 'The Functional Dream',
}

const mockReceiptDescriptorTwo = {
  soft_descriptor: 'The Functional Dream',
  seller_name: 'The Functional Dream',
}

const mockReceiptDescriptorThree = {
  seller_name: 'The Functional Dream',
}

const mockReceiptTemplateV1 = {
  transaction_id: 12345,
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
}

const mockReceiptTemplateV2 = {
  ...mockReceiptTemplateV1,
  capture_method: 'emv',
  authorization_code: '4DDP1X',
  aid: '02199520',
  application_cryptogram: '5EC8B98ABC8F9E7597647CBCB9A75400',
  soft_descriptor: 'Loja 1 2 3',
  statement_descriptor: 'pg* Loja 1 2 3',
}

module.exports = {
  receiptData,
  mockReceiptDescriptorOne,
  mockReceiptDescriptorTwo,
  mockReceiptDescriptorThree,
  mockReceiptTemplateV1,
  mockReceiptTemplateV2,
}
