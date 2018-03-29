#!/bin/bash

DOT_ENV=${DOT_ENV:-".env.cloud"}
NODE_ENV="production"
CMD_ARGS=""
PORT=8888

docker build . -t "tldr:server" --build-arg PORT=8888 --build-arg DOT_ENV=".env" --build-arg NODE_ENV="production" --build-arg CMD_ARGS=""
#docker run tldr:server

docker build . -t "tldr:worker" --build-arg PORT=8889 --build-arg DOT_ENV=".env" --build-arg NODE_ENV="production" --build-arg CMD_ARGS="yarn start-worker"
#docker run tldr:worker
