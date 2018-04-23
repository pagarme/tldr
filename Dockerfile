# Install npm dependencies
FROM pagarme/docker-nodejs:8.9

ARG NODE_ENV
ARG DOT_ENV

COPY ${DOT_ENV} /tldr/${DOT_ENV}
COPY newrelic.js /tldr
COPY package.json /tldr
COPY scripts/start_server.sh /tldr
COPY scripts/start_worker.sh /tldr
COPY yarn.lock /tldr
COPY src /tldr
COPY views /tldr/views

WORKDIR /tldr

RUN apk --update add --no-cache python make g++
RUN if [ "x$NODE_ENV" == "xproduction" ]; then yarn install --production ; else yarn install ; fi

# Build the application
FROM pagarme/docker-nodejs:8.9

ARG NODE_ENV
ARG DOT_ENV
ENV APP_NAME 'tldr'
ENV PORT 3000

COPY --from=0 /tldr /tldr

WORKDIR /tldr

EXPOSE ${PORT}
