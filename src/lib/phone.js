const formatPhone = (n) => {
  if (n.length < 10 || n.length > 11) {
    return n
  }
  const m = n.length - 10
  return `(${n.slice(0, 2)}) ${n.slice(2, 6 + m)}-${n.slice(6 + m, n.length)}`
}

module.exports = formatPhone
