<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=200" width="127px" height="127px" align="left"/>

# tldr
[![CircleCI](https://circleci.com/gh/pagarme/tldr.svg?style=svg&circle-token=b12aa44b42ee421e75a68c1a6c023e35d34337d2)](https://circleci.com/gh/pagarme/tldr)
[![codecov](https://codecov.io/gh/pagarme/tldr/branch/master/graph/badge.svg?token=yWyqQA73AO)](https://codecov.io/gh/pagarme/tldr)

:scroll: A microservice to store and display sales receipts

## Table of Contents
- [Introduction](#introduction)
- [Technology](#technology)
- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
  - [Running Tests](#running-tests)
- [Available Routes](#available-routes)
- [Useful Links](#useful-links)

## Introduction
*tldr* is Pagar.me's backend for processing, storing and displaying receipts.

## Technology
Stuff we use:
- **[Docker](https://docs.docker.com)** and **[Docker Compose](https://docs.docker.com/compose/)** to create our development and test environments.
- **[CircleCI](https://circleci.com)** for deployment and as general CI.
- **[AWS SQS](https://aws.amazon.com/documentation/sqs/)** as a queue manager to process the receipts.
- **[Postgres](https://www.postgresql.org)** to store our data and **[Sequelize](http://docs.sequelizejs.com)** as a Node.js ORM.
- **[ejs](https://github.com/mde/ejs)** as a templating language.
- **[Jest](https://github.com/facebook/jest)** as a framework for tests.
- **[Yarn](https://yarnpkg.com/en/)** as a package manager.

## Getting Started
To get started, you should install **Docker** and **Docker Compose**.  

Then, clone the repository:
```sh
$ git clone git@github.com:pagarme/tldr
```

You should create an `.env` file (you can use `.env.example` as a reference. Ideally, everything should work out-of-the-box with the example environment variables).  

Now, you should set up your database, but only once. In order to do that, run the following:
```sh
$ make setupdb
```

And you should be ready.

# Running Locally
To run locally, simply do the following command:
```sh
$ make all
```
This will pull and build all images necessary, as well as starting all containers.
By default, the server is located at `localhost:8888`.

# Running Tests
To run our tests, do:
```sh
$ make test
```
And everything will be taken care of, and the tests will be ran.

## Available Routes
Our default routes are:
```sh
GET /api/receipt/:id
```
Where `:id` is the id of the receipt (receipt_id).
This will respond with a `json` object.

Response sample:
```json
{
    "data": {
        "transaction_id": 1234567,
        "receipt_id": "c00l-5tuff",
        "seller_id": "mycoolshop",
        "seller_name": "Cool Shop",
        "transaction_status": "paid",
        "amount": 12000,
        "payment_date": "2018-03-02T10:12:25.000Z",
        "event_date": "2018-03-22T15:12:25.000Z",
        "card_holder_name": "Senny Bings",
        "card_number_last_digits": "7782",
        "card_brand": "visa",
        "installments": 2,
        "phone_number": "+5511987654321"
    }
}
```
Now, the following route will take the information on the previous route, and render it with a template.

```sh
GET /receipt/:id
```

## Useful Links
- **[How to contribute](https://github.com/pagarme/tldr/blob/master/CONTRIBUTING.md)**
- **[Code of Conduct](https://github.com/pagarme/tldr/blob/master/CODE_OF_CONDUCT.md)**
- **[LICENSING](https://github.com/pagarme/tldr/blob/master/LICENSE)**
