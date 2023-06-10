FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port that the application will be running on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]