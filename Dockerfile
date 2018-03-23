
# Install npm dependencies
FROM pagarme/docker-nodejs:8.9

RUN mkdir /tldr
COPY .env.cloud /tldr/.env
COPY package.json /tldr
COPY yarn.lock /tldr
COPY src /tldr
COPY views /tldr/views
COPY scripts/migrate /tldr


WORKDIR /tldr

RUN apk --update add --no-cache python make g++ && \
    yarn install --production

# Build the application
FROM pagarme/docker-nodejs:8.9

ENV APP_NAME 'tldr'
ENV DOTENV_PATH '/tldr/.env'

COPY --from=0 /tldr /tldr

WORKDIR /tldr
COPY . /tldr

EXPOSE 8888

