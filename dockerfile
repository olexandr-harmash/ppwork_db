# syntax=docker/dockerfile:1

FROM node:18-alpine as base

WORKDIR /app

COPY package*.json ./

COPY . .

FROM base as test
RUN npm test

FROM base as production

RUN npm install

RUN npm install -g pm2

EXPOSE 3000
EXPOSE 9200

CMD npm run start