const formatCaptureMethod = require('../../src/lib/capture-method')

describe('Capture Method Lib', () => {
  test('formatCaptureMethod should return \'ONL-CHIP\' when capture_method is \'emv\'', () => {
    expect(formatCaptureMethod('emv')).toBe('ONL-CHIP')
  })

  test('formatCaptureMethod should return \'ONL-MAG\' when capture_method is \'magstripe\'', () => {
    expect(formatCaptureMethod('magstripe')).toBe('ONL-MAG')
  })

  test('formatCaptureMethod should return \'DESCONHECIDO\' when capture_method is invalid', () => {
    expect(formatCaptureMethod('unknown')).toBe('DESCONHECIDO')
  })
})
