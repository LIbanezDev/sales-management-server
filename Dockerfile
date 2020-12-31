FROM node:12

COPY . /opt/sales-management

WORKDIR /opt/sales-management

RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

CMD npm run start:dev