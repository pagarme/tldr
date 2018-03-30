const formatDate = (n) => {
  if (typeof n === 'object' || (typeof n === 'string' && n.length > 20)) {
    const e = JSON.stringify(n)
    return `${e.slice(9, 11)}/${e.slice(6, 8)}/${e.slice(1, 5)} - ${e.slice(12, 20)}`
  }
  return n
}

module.exports = formatDate
