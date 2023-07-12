FROM node:18-alpine

ENV NODE_VERSION 18.16.1
ENV YARN_VERSION 1.22.19

ARG port

WORKDIR /app

COPY . .

RUN yarn

EXPOSE $port

CMD [ "yarn", "dev", "--host", "0.0.0.0", "--port", "3000" ]