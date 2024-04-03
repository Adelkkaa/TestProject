FROM node:lts

WORKDIR /app

COPY package*.json /app
COPY yarn.lock /app/yarn.lock

RUN yarn

COPY . /app

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]