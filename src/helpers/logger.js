const log4js = require('log4js')

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'basic',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info',
    },
  },
})

const logger = (app) => {
  const appLogger = log4js.getLogger(app)
  appLogger.level = 'ALL'
  return appLogger
}

module.exports = logger
