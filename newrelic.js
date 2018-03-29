exports.config = {
  app_name: [process.env.NEWRELIC_APP],
  license_key: process.env.NEWRELIC_KEY,
  logging: {
    level: 'info',
  },
}
