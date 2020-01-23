const formatAccountType = (accountType) => {
  switch (accountType) {
    case 'conta_corrente': return 'Conta Corrente'
    case 'conta_poupanca': return 'Conta Poupança'
    case 'conta_corrente_conjunta': return 'Conta Corrente Conjunta'
    case 'conta_poupanca_conjunta': return 'Conta Poupança Conjunta'
    default: return 'Desconhecido'
  }
}

module.exports = formatAccountType
