const {
  getEnv,
  getConfig,
} = require('../../src/config')

describe('getEnv', () => {
  test('should return `test` when given argument `test`', () => {
    expect(getEnv('test')).toBe('test')
  })

  test('should return `$NODE_ENV` when not given `env`', () => {
    expect(getEnv()).toBe(process.env.NODE_ENV)
  })

  test('should return `development` when `NODE_ENV=\'\'`', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = ''

    expect(getEnv()).toBe('development')

    process.env.NODE_ENV = env
  })
})

describe('getConfig', () => {
  const config = {
    development: {
      env: 'development',
    },
    test: {
      env: 'test',
    },
    production: {
      env: 'production',
    },
  }

  test('should return appropriate config object from the given env', () => {
    expect(getConfig(config, 'development')).toMatchObject({
      env: 'development',
    })
    expect(getConfig(config, 'test')).toMatchObject({
      env: 'test',
    })
    expect(getConfig(config, 'production')).toMatchObject({
      env: 'production',
    })
  })
})
