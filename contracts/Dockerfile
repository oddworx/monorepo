FROM node:14-alpine

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY hardhat.config.js /app/hardhat.config.js

WORKDIR /app

RUN yarn install --non-interactive --frozen-lockfile

ENTRYPOINT ["yarn", "chain"]