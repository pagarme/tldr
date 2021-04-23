build:
	@docker-compose build
.PHONY: build

stop:
	@docker-compose stop
.PHONY: stop

down:
	@docker-compose down
.PHONY: down

# TEST ENVIRONMENT
test-database:
	@docker-compose up -d test-database
.PHONY: test-database

test-setup-database:
	@docker-compose run --entrypoint="node_modules/.bin/sequelize db:create --config src/config/database.js" test
.PHONY: test-setup-database

test-migrate-database:
	@docker-compose run --entrypoint="node_modules/.bin/sequelize db:migrate --config src/config/database.js --migrations-path src/database/migrations/" test
.PHONY: test-migrate-database

test-migrate-undo-database:
	@docker-compose run --entrypoint="node_modules/.bin/sequelize db:migrate:undo --config src/config/database.js --migrations-path src/database/migrations/"  test
.PHONY: test-migrate-undo-database

test: test-database test-migrate-database yopa
	@docker-compose up test
.PHONY: test

# PRODUCTION ENVIRONMENT
database:
	@docker-compose up -d database
.PHONY: database

setup-database:
	@docker-compose run server node_modules/.bin/sequelize db:create --config src/config/database.js
.PHONY: setup-database

migrate-database:
	@docker-compose run --entrypoint="node_modules/.bin/sequelize db:migrate --config src/config/database.js --migrations-path src/database/migrations/" server
.PHONY: migrate-database

migrate-undo-database:
	@docker-compose run server node_modules/.bin/sequelize db:migrate:undo --config src/config/database.js --migrations-path src/database/migrations/
.PHONY: migrate-undo-database

server: database migrate-database
	@docker-compose up -d server
.PHONY: server

worker:
	@docker-compose up -d worker
.PHONY: worker

all: server worker yopa
.PHONY: all

# COMMON TARGETS
yopa:
	@docker-compose up -d yopa
.PHONY: yopa

lint:
	@docker-compose up lint
.PHONY: lint

# SONAR
sonar:
	sudo sed -i 's/\/home\/circleci\/tldr\//\/usr\/src\//g' coverage/lcov.info
	docker run -ti -v $(shell pwd):/usr/src pagarme/sonar-scanner -Dsonar.branch.name=${BRANCH}
.PHONY: sonar

sonar-check-quality-gate:
	docker run -v $(shell pwd):/usr/src/sonar pagarme/check-sonar-quality-gate
.PHONY: sonar-check-quality-gate
