FROM node:alpine

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY .env .
COPY consumer.js .

CMD [ "npm", "start" ]