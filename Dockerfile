FROM node:16.20.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5100

CMD ["npm", "start"]