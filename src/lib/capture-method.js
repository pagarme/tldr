const formatCaptureMethod = (captureMethod) => {
  switch (captureMethod) {
    case 'emv': return 'ONL-CHIP'
    case 'magstripe': return 'ONL-MAG'
    default: return 'DESCONHECIDO'
  }
}

module.exports = formatCaptureMethod
