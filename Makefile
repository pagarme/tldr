build:
	@docker-compose build
.PHONY: build

test-database:
	@docker-compose up -d test-database
.PHONY: test-database

test-migrate:
	@docker-compose run test node_modules/.bin/sequelize db:migrate --config src/config/database.test.json --migrations-path src/database/migrations/
.PHONY: test-migrate

test: test-database test-migrate yopa
	@docker-compose up test
.PHONY: test

yopa:
	@docker-compose up -d yopa
.PHONY: yopa

lint:
	@docker-compose up lint
.PHONY: lint
