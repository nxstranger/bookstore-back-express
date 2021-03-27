FROM node:14-alpine

WORKDIR /usr/src/

COPY package.json yarn.lock ./

RUN yarn install

RUN apk update \
    && apk add postgresql-dev

COPY ./entrypoint.sh .

COPY . .

ENTRYPOINT ["./entrypoint.sh"]
