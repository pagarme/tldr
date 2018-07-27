const templateVersion = require('../../src/lib/template-version')
const {
  mockReceiptTemplateV1,
  mockReceiptTemplateV2,
} = require('./helper')

describe('Template Versioning Lib', () => {
  test('templateVersion should return \'receipt-v2\' when the receipt has \'capture_method\' and \'authorization_code\'', () => {
    expect(templateVersion(mockReceiptTemplateV2)).toBe('receipt-v2')
  })

  test('templateVersion should return \'receipt-v1\' as the default', () => {
    expect(templateVersion(mockReceiptTemplateV1)).toBe('receipt-v1')
  })
})
