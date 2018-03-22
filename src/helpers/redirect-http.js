const redirectHttp = (req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const isNotHttps = req.header('X-Forwarded-Proto') !== 'https'

  if (isNotHttps && isProduction) {
    const redirStatusCode = (req.method === 'POST') ? 307 : 302
    const pathUrl = `https://${req.hostname}${req.originalUrl}`

    return res.redirect(redirStatusCode, pathUrl)
  }

  return next()
}

module.exports = redirectHttp
