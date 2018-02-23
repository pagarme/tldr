FROM node:9.4-alpine

RUN mkdir /tldr

COPY package.json /tldr
COPY yarn.lock /tldr

WORKDIR /tldr

RUN yarn install

COPY app /tldr

EXPOSE 8888

