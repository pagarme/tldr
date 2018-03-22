FROM node:8.9-alpine

RUN mkdir /tldr

COPY .env /tldr
COPY package.json /tldr
COPY yarn.lock /tldr
COPY src /tldr

WORKDIR /tldr

RUN yarn install

EXPOSE 8888

