const escriba = require('escriba')
const log4js = require('log4js')

const log4jsConfig = {
  appenders: {
    out: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d] %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info',
    },
  },
}

log4js.configure(log4jsConfig)

const escribaConfig = {
  loggerEngine: log4js.getLogger('TLDR'),
  service: 'TLDR',
  sensitive: {
    password: {
      paths: ['body.provider.key'],
      pattern: /(ak_test|ak_live).*/g,
      replacer: '*',
    },
  },
  httpConf: {
    propsToLog: {
      request: [
        'id',
        'method',
        'url',
        'body',
        'httpVersion',
        'referrer',
        'referer',
        'user-agent',
      ],
      response: [
        'id',
        'method',
        'url',
        'statusCode',
        'body',
        'httpVersion',
        'referrer',
        'referer',
        'user-agent',
        'latency',
      ],
    },
    envToLog: ['SHELL', 'PATH'],
    skipRules: [
      {
        route: /\/_health_check/,
        method: /.*/,
        onlyBody: false,
      },
    ],
  },
}

module.exports = escriba(escribaConfig)
