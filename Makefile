build:
	@docker-compose build
.PHONY: build

test:
	@docker-compose up test
.PHONY: test

lint:
	@docker-compose up lint
.PHONY: lint
