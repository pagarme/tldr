const formatMoney = (n, m = '.', c = ',') => {
  if (!Number.isInteger(n)) {
    return ''
  }

  const f = (n / 100).toFixed(2).toString().replace('.', c)
  let i = f.length - 4
  let j = 0
  let r = ''

  while (i >= 0) {
    j = (j === 4) ? 2 : (j + 1)
    r += (j === 4) ? `${m}${f[i]}` : `${f[i]}`
    i -= 1
  }

  r = r.split('').reverse().join('')
  r += `${f.slice(f.length - 3, f.length)}`

  return r
}

module.exports = formatMoney
