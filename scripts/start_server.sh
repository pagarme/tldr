#!/bin/sh

PORT=3000
#run entrypoint for decrypt variables
echo "call entrypoint"
sh -c /entrypoint.sh
#run migrations
echo "call migrations"
/tldr/node_modules/.bin/sequelize db:migrate --config /tldr/config/database.js --migrations-path /tldr/database/migrations/
#run server
echo "call server service"
node /tldr/bin/server.js
