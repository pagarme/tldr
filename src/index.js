const database = require('./database')

database.bootstrap()
  .then(() => {
    console.log('Database started successfully!')
  })

