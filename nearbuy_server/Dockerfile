FROM node:18-alpine

# ENV NODE_VERSION 18.16.1
ENV NPM_VERSION 9.6.5

ARG port

WORKDIR /app

COPY . .

RUN npm install

EXPOSE $port

CMD [ "npm", "run", "dev" ]