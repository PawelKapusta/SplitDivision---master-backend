FROM node:18.12.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env ./

RUN npm run build

ENV NODE_ENV=production

EXPOSE 5000

CMD [ "npm", "start" ]