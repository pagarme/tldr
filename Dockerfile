
# Install npm dependencies
FROM pagarme/docker-nodejs:8.9

ARG NODE_ENV
ARG DOT_ENV
ARG CMD_ARGS
ARG PORT

RUN mkdir /tldr

COPY ${DOT_ENV} /tldr/.env
COPY package.json /tldr
COPY yarn.lock /tldr
COPY src /tldr
COPY views /tldr/views
COPY scripts/migrate /tldr

WORKDIR /tldr

RUN apk --update add --no-cache python make g++
#RUN if [ "x$NODE_ENV" == "xproduction" ]; then yarn install --production ; else yarn install ; fi
RUN npm install
# Build the application
FROM pagarme/docker-nodejs:8.9

ENV APP_NAME 'tldr'

COPY --from=0 /tldr /tldr

WORKDIR /tldr
COPY . /tldr

EXPOSE ${PORT}

RUN if [ "x$CMD_ARGS" == "x" ]; then export CMD_ARGS="yarn start" ; fi

CMD ["sh", "-c", "${CMD_ARGS}"]
