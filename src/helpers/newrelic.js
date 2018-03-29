const requireDeps = () => {
  if (process.env.NODE_ENV === 'production' && process.env.NEWRELIC_KEY) {
    // eslint-disable-next-line global-require
    require('newrelic')
  }
}

module.exports = {
  requireDeps,
}

